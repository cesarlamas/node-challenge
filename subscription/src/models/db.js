const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Subscriptions', {useNewUrlParser: true,  useUnifiedTopology: true });

const subscriptionSchema = mongoose.Schema({
    email : {
        type : String,
        trim : true,
        lowercase : true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
        required: [true, "The email is required"]
    },
    first_name : {
        type : String,
        trim : true,
        lowercase : true
    },
    gender : {
        type : String,
        trim : true,
        lowercase : true,
        enum : ["Female","male"]
    },
    birth_date : {
        type : Date,
        required : [true, "Your date of birth is required"]
    },
    consent : {
        type : Boolean,
        required : [true, "Consent is required"]
    },
    
})