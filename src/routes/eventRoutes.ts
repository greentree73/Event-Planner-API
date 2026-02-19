import { Router } from "express";
import {
  seedData,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
}
from "../controllers/eventController";

const router = Router();

router.post("/seed", seedData);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
