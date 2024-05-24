const property = require('../models/PropertyDetailsModel');
const User = require("../models/userModel");
const sgMail = require('@sendgrid/mail')

const addProperty = async (req, res) => {
    try {
        const {
            propertyType,
            propertyLocation,
            propertyPrice,
            propertyArea,
            noOfBedrooms,
            noOfBathrooms,
            noOfHospitals,
            noOfSchools,
            propertyOwner,
            propertyOwnerPhNumber,
            propertyOwnerEmail,
            propertyImage
        } = req.body;

        // Validate input data (basic validation)
        if (!propertyType || !propertyLocation || !propertyPrice || !propertyArea || !propertyOwner || !propertyOwnerPhNumber || !propertyOwnerEmail || !propertyImage) {
            // console.log(res)
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Log input data
        console.log("Request data: ", req.body);

        const newProperty = new property({
            propertyType,
            propertyLocation,
            propertyPrice,
            propertyArea,
            noOfBedrooms,
            noOfBathrooms,
            noOfHospitals,
            noOfSchools,
            propertyOwner,
            propertyOwnerPhNumber,
            propertyOwnerEmail,
            propertyImage
        });

        // Save the new property
        const propertyData = await newProperty.save();

        // Log saved data
        console.log("Saved property: ", propertyData);
        console.log(res);

        // Respond with success message
        res.status(200).json({
            message: "Property added successfully",
            success: true,
            data: propertyData
        });
    } catch (error) {
        // Log the error
        console.error("Error saving property: ", error);

        // Respond with error message
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const getAllProperties = async (req, res) => {
    try {
        const properties = await property.find();
        res.status(200).json({
            message: "All properties",
            success: true,
            data: properties
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error", success: false });
    }
};

const getUserProperty = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const properties = await property.find({ propertyOwnerEmail: user.email });

        res.status(200).json({
            message: "User properties",
            isSuccess: true,
            data: properties
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error", success: false });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const propertyData = await property.findByIdAndDelete(propertyId);
        res.status(200).json({
            message: "Property deleted successfully",
            success: true,
            data: propertyData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error", success: false });
    }
};

const editProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const propertyData = await property.findByIdAndUpdate(propertyId, req.body, { new: true });
        res.status(200).json({
            message: "Property updated successfully",
            success: true,
            data: propertyData
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error", success: false });
    }
}

const sendEmail = async (req, res) => {
    try {
        const { senderEmail, message } = req.body;
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: senderEmail, // Change to your recipient
            from: 'tanishq.work.16@gmail.com', // Change to your verified sender
            subject: 'Details of the property owner you are interested in',
            text: 'Find the details of the property owner you are interested in',
            html: `<strong>Name: ${message.name}<br/>Email: ${message.email}<br/>Phone Number: ${message.phNumber}</strong>`,
        }
        sgMail
            .send(msg)
            .then(() => {
                res.status(200).json({ message: "Email sent to registered Email ID", success: true });
                // console.log('Email sent to registered Email ID')
            })
            .catch((error) => {
                res.status(500).json({ message: "Internal Server error", success: false });
                console.error(error)
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error", success: false });
    }
}


module.exports = { addProperty, getAllProperties, getUserProperty, deleteProperty, editProperty, sendEmail };