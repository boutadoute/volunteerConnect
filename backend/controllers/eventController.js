import Event from "../models/eventModel.js"



//Get all events 
export const getEvents = async (req, res) => {
  try {
    const Events = await Event.find();
    res.status(200).json(Events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event'});
  }
};
// Create event
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event' });
  }
};
//Update event
export const updateEvent = async (req, res) => {
    const { id:_id } = req.params;
  try {
    const event = await Event.findByIdAndUpdate(_id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete Event
export const deleteEvent = async (req, res) => {
const { id:_id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(_id );
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};