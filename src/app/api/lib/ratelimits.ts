// app/api/_lib/rateLimit.ts
import { RateLimiterMemory } from 'rate-limiter-flexible';

export const rateLimiter = new RateLimiterMemory({
  points: parseInt(process.env.MAX_REQUESTS_PER_MINUTE || "60", 10), // number of requests
  duration: 60,
});
