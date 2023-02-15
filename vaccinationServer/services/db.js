const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ShieldMyChild?directConnection=true',{
    useNewUrlParser:true
})

.then(()=>{
    console.log("connected to MongoDB");
})
.catch(err=> {console.log('failed to connect to MongoDB',err);})

const Admin = mongoose.model('Admins',{

    username:String,
    password:String
})

const Hospital = mongoose.model('Hospitals',{

    hospitalname:String,
    email:String,
    password:String
    
})

const Child = mongoose.model('Childs',{

    username:String,
    parentname:String,
    password:String,
    email:String,
    phonenumber:Number,
    dob:Date,

})

const Booking = mongoose.model('Bookings',{
    username:String,
    childage:Number,
    hospitalname:String,
    vaccinationname:String,

})
module.exports={
    Admin,Hospital,Child,Booking
}