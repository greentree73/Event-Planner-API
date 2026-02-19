import { Request, Response } from "express";
import { Event } from "../models";

export const seedData = async (req: Request, res: Response): Promise<void> => {
  try {
    // Prevent duplicate seed
    const existingEvent = await Event.findOne();
    if (existingEvent) {
      res.json({
        message: "Seed already exists",
      });
      return;
    }

    const events = await Event.create([
      {
        title: "Engineering Sync",
        description: "Weekly engineering team sync-up",
        date: new Date("2026-02-20T10:00:00Z"),
        location: "Room A1",
        category: "Meeting",
        attendees: ["Alice", "Bob"],
      },
      {
        title: "Tech Conference 2026",
        description: "Annual developer conference",
        date: new Date("2026-03-15T09:00:00Z"),
        location: "Convention Center",
        category: "Conference",
        attendees: ["Sarah", "James", "Michael"],
      },
      {
        title: "Personal Goal Review",
        description: "Quarterly personal progress review",
        date: new Date("2026-04-10T14:00:00Z"),
        category: "Personal",
        attendees: ["Vandana"],
      },
      {
        title: "MongoDB Workshop",
        description: "Hands-on MongoDB training session",
        date: new Date("2026-05-05T13:00:00Z"),
        location: "Lab 3",
        category: "Workshop",
        attendees: ["Dave", "Paul"],
      },
      {
        title: "Community Networking Night",
        description: "Meet local developers and founders",
        date: new Date("2026-06-18T17:00:00Z"),
        location: "Tech Hub Downtown",
        category: "Other",
        attendees: [],
      },
      {
        title: "Frontend Bootcamp",
        description: "React + TypeScript fundamentals",
        date: new Date("2026-07-01T11:00:00Z"),
        location: "Room B12",
        category: "Workshop",
        attendees: ["Emily", "Chris"],
      },
      {
        title: "Product Planning Session",
        description: "Quarterly roadmap discussion",
        date: new Date("2026-08-10T13:30:00Z"),
        location: "Conference Room B",
        category: "Meeting",
        attendees: ["Chris", "John"],
      },
    ]);

    res.status(201).json({
      message: "Event seed data created successfully",
      eventsCreated: events.length,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error seeding events",
      error: error.message,
    });
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const filter: any = {};
    // Add category filter only if provided
    if (req.query.category) {
      filter.category = req.query.category;
    }
    // Add date filter only if provided
    if (req.query.date) {
      filter.date = { $gte: new Date(req.query.date as string) };
    }
    const events = await Event.find(filter);
    res.status(200).json({
      count: events.length,
      events,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message,
    });
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.json(event);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ message: "event created successfully", event });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Run schema validation
    });
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "Event deleted successfully", event });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};
