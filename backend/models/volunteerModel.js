import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const volunteerSchema = new Schema({

    name: {
        type : String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        // default: new mongoose.Types.ObjectId('68287e252640e632b867f881')   
    },
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
export default Volunteer;