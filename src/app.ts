import express, { Application } from "express";
import { connectDB } from "./config/db";
import eventRoutes from "./routes/eventRoutes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Event Planner API",
    activity: "Complete one populate controller and one route",
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
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;