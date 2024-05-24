const  mongoose = require('mongoose');

const { Schema } = mongoose;

const PropertyDetailsSchema = new Schema({
    propertyType:{
        type:String,
        required:true
    },
    propertyLocation:{
        type:String,
        required:true
    },
    propertyPrice:{
        type:Number,
        required:true
    },
    propertyArea:{
        type:Number,
        required:true
    },
    noOfBedrooms:{
        type:Number,
        default:0
    },
    noOfBathrooms:{
        type:Number,
        default:0
    },
    noOfHospitals:{
        type:Number,
        default:0
    },
    noOfSchools:{
        type:Number,
        default:0
    },
    propertyOwner:{
        type:String,
        required:true
    },
    propertyOwnerPhNumber:{
        type:Number,
        required:true
    },
    propertyOwnerEmail:{
        type:String,
        required:true
    },
    propertyImage:{
        type:String,
        required:true
    },

});

module.exports=mongoose.model('PropertyDetails',PropertyDetailsSchema)