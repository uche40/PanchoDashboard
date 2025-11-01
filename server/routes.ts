import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // All routes here
  // Dashboard is served from public/dashboard.html via static file serving

  const httpServer = createServer(app);

  return httpServer;
}
