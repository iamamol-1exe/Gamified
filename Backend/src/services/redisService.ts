import { redisClient } from "../config/redis";
import { logger } from "../utils/logger";

export class RedisService {
  private static isConnected(): boolean {
    return redisClient !== null && redisClient.isOpen;
  }

  static async set(
    key: string,
    value: string,
    expireTime?: number
  ): Promise<void> {
    try {
      if (!this.isConnected()) {
        logger.warn("Redis not connected, skipping SET operation");
        return;
      }

      if (expireTime) {
        await redisClient!.setEx(key, expireTime, value);
      } else {
        await redisClient!.set(key, value);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Redis SET error:", errorMessage);

      // Don't throw error in development
      if (process.env.NODE_ENV === "production") {
        throw error;
      }
    }
  }

  static async get(key: string): Promise<string | null> {
    try {
      if (!this.isConnected()) {
        logger.warn("Redis not connected, skipping GET operation");
        return null;
      }

      return await redisClient!.get(key);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Redis GET error:", errorMessage);

      if (process.env.NODE_ENV === "production") {
        throw error;
      }
      return null;
    }
  }

  static async del(key: string): Promise<void> {
    try {
      if (!this.isConnected()) {
        logger.warn("Redis not connected, skipping DELETE operation");
        return;
      }

      await redisClient!.del(key);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Redis DELETE error:", errorMessage);

      if (process.env.NODE_ENV === "production") {
        throw error;
      }
    }
  }

  static async exists(key: string): Promise<boolean> {
    try {
      if (!this.isConnected()) {
        logger.warn("Redis not connected, skipping EXISTS operation");
        return false;
      }

      const result = await redisClient!.exists(key);
      return result === 1;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Redis EXISTS error:", errorMessage);

      if (process.env.NODE_ENV === "production") {
        throw error;
      }
      return false;
    }
  }

  static async setHash(
    key: string,
    field: string,
    value: string
  ): Promise<void> {
    try {
      if (!this.isConnected()) {
        logger.warn("Redis not connected, skipping HSET operation");
        return;
      }

      await redisClient!.hSet(key, field, value);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Redis HSET error:", errorMessage);

      if (process.env.NODE_ENV === "production") {
        throw error;
      }
    }
  }

  static async getHash(
    key: string,
    field: string
  ): Promise<string | undefined> {
    try {
      if (!this.isConnected()) {
        logger.warn("Redis not connected, skipping HGET operation");
        return undefined;
      }

      return await redisClient!.hGet(key, field);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Redis HGET error:", errorMessage);

      if (process.env.NODE_ENV === "production") {
        throw error;
      }
      return undefined;
    }
  }

  static async getAllHash(key: string): Promise<Record<string, string>> {
    try {
      if (!this.isConnected()) {
        logger.warn("Redis not connected, skipping HGETALL operation");
        return {};
      }

      return await redisClient!.hGetAll(key);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Redis HGETALL error:", errorMessage);

      if (process.env.NODE_ENV === "production") {
        throw error;
      }
      return {};
    }
  }

  static async expire(key: string, seconds: number): Promise<void> {
    try {
      if (!this.isConnected()) {
        logger.warn("Redis not connected, skipping EXPIRE operation");
        return;
      }

      await redisClient!.expire(key, seconds);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Redis EXPIRE error:", errorMessage);

      if (process.env.NODE_ENV === "production") {
        throw error;
      }
    }
  }
}
