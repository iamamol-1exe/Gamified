import app from "./app";
import { config } from "./config";
import { connectDatabase } from "./config/database";
import { connectRedis, disconnectRedis } from "./config/redis";
import { logger } from "./utils/logger";

async function startServer(): Promise<void> {
  try {
    logger.info("🚀 Starting server...");

    // Start server first (so health check works)
    const server = app.listen(config.port, () => {
      logger.info(
        `🌟 Server running on port ${config.port} in ${config.nodeEnv} mode`
      );
      logger.info(
        `🔗 Health check available at http://localhost:${config.port}/health`
      );
    });

    // Connect to services in parallel with timeouts
    const serviceConnections = await Promise.allSettled([
      Promise.race([
        connectDatabase(),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error("Database connection timeout")),
            15000
          )
        ),
      ]),
      Promise.race([
        connectRedis(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Redis connection timeout")), 10000)
        ),
      ]),
    ]);

    // Log connection results
    serviceConnections.forEach((result, index) => {
      const serviceName = index === 0 ? "Database" : "Redis";
      if (result.status === "fulfilled") {
        logger.info(`✅ ${serviceName} connected successfully`);
      } else {
        logger.warn(
          `⚠️ ${serviceName} connection failed: ${result.reason.message}`
        );
      }
    });

    logger.info("🎉 Server startup completed");

    // Graceful shutdown
    const gracefulShutdown = async (signal: string): Promise<void> => {
      logger.info(`${signal} received, shutting down gracefully...`);

      server.close(async () => {
        logger.info("HTTP server closed");

        // Close database and redis connections
        await Promise.allSettled([
          disconnectRedis(),
          // Add database disconnect here if needed
        ]);

        logger.info("All connections closed. Process terminated");
        process.exit(0);
      });

      // Force close after 30 seconds
      setTimeout(() => {
        logger.error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 30000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to start server:", errorMessage);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: unknown, promise: Promise<any>) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

startServer();
