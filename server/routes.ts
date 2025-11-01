import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve settings.json as JSON with proper content type
  app.get('/settings.json', (req, res) => {
    const settingsPath = path.resolve(import.meta.dirname, '..', 'public', 'settings.json');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    res.setHeader('Content-Type', 'application/json');
    res.json(settings);
  });

  // Serve app.js as JavaScript file
  app.get('/app.js', (req, res) => {
    const appJsPath = path.resolve(import.meta.dirname, '..', 'client', 'app.js');
    const content = fs.readFileSync(appJsPath, 'utf-8');
    res.setHeader('Content-Type', 'application/javascript');
    res.send(content);
  });

  const httpServer = createServer(app);

  return httpServer;
}
