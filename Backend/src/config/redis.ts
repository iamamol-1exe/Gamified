import { createClient, RedisClientType } from "redis";
import { config } from "./index";
import { logger } from "../utils/logger";

// Create client only if Redis host is configured
let redisClient: RedisClientType | null = null;

if (config.redis.host && config.redis.host.trim() !== "") {
  redisClient = createClient({
    socket: {
      host: config.redis.host,
      port: config.redis.port,
      connectTimeout: 5000, // 5 second timeout
    },
    // Only add password if it exists and is not empty
    ...(config.redis.password &&
      config.redis.password.trim() !== "" && {
        password: config.redis.password,
      }),
    database: config.redis.db,
  });

  redisClient.on("error", (error: Error) => {
    logger.error("Redis connection error:", error);
  });

  redisClient.on("connect", () => {
    logger.info("Redis connected successfully");
  });

  redisClient.on("ready", () => {
    logger.info("Redis ready to use");
  });

  redisClient.on("reconnecting", () => {
    logger.info("Redis reconnecting...");
  });
}

export const connectRedis = async (): Promise<void> => {
  if (!redisClient) {
    logger.info("Redis not configured, skipping connection");
    return;
  }

  try {
    // Add timeout to prevent hanging
    const connectPromise = redisClient.connect();
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(
        () => reject(new Error("Redis connection timeout after 10s")),
        10000
      );
    });

    await Promise.race([connectPromise, timeoutPromise]);
    logger.info("Redis connection established successfully");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to connect to Redis:", errorMessage);

    // Don't kill the server in development
    if (config.nodeEnv === "production") {
      process.exit(1);
    } else {
      logger.warn("Continuing without Redis in development mode");
    }
  }
};

// Export the client
export { redisClient };

// Helper function to check if Redis is available
export const isRedisAvailable = (): boolean => {
  return redisClient !== null && redisClient.isOpen;
};

// Graceful disconnect
export const disconnectRedis = async (): Promise<void> => {
  if (redisClient && redisClient.isOpen) {
    try {
      await redisClient.quit();
      logger.info("Redis disconnected successfully");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Error disconnecting Redis:", errorMessage);
    }
  }
};
