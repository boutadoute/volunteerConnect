import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const volunteerEventsSchema = new Schema({

    volunteer_id : {
        type : mongoose.Schema.Types.objectId,
        ref: "Volunteer",
        required: true
    },
    event_id : {
        type : mongoose.Schema.Types.objectId,
        ref: "Event",
        required: true
    },
});

const VolunteerEvent = mongoose.model('VolunteerEvent', volunteerEventsSchema);
export default VolunteerEvent;