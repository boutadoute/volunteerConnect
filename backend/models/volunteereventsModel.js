import mongoose from 'mongoose';

const volunteerEventSchema = new mongoose.Schema({
  volunteer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true,
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
}, { timestamps: true });

const VolunteerEvent = mongoose.model('VolunteerEvent', volunteerEventSchema);
export default VolunteerEvent;
