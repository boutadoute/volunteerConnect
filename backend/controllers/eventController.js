import Event from "../models/eventModel.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, image } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      image: image || ""
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(400).json({ message: 'Error creating event' });
  }
};

// Update existing event
export const updateEvent = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(_id, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(400).json({ message: 'Error updating event' });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(_id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};


export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Failed to get event by ID", error);
    res.status(500).json({ message: "Server error" });
  }
};
