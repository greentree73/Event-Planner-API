import express, { Application } from "express";
import { connectDB, closeDB } from "./config/db";
import eventRoutes from "./routes/eventRoutes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use("/api/events", eventRoutes);

app.get("/api", (req, res) => {
  res.json({
    message: "Event Planner API",
    routes: {
      "POST /api/events/seed": "Seed the database with sample data",
      "GET /api/events": "Get all events",
      "GET /api/events/:id": "Get event by ID",
      "POST /api/events": "Create a new event",
      "PUT /api/events/:id": "Update an existing event",
      "DELETE /api/events/:id": "Delete an event",
     },
  });
});
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Call closeDB on shutdown
const gracefulShutdown = async () => {
  console.log("\n🛑 Shutting down server...");
  await closeDB();          // call closeDB here
  server.close(() => {
    console.log("💤 Server closed");
    process.exit(0);
  });
};

// Listen for termination signals
process.on("SIGINT", gracefulShutdown);   // Ctrl+C
process.on("SIGTERM", gracefulShutdown);  // Termination signal

export default app;