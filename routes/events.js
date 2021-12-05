const express = require("express");
//const { getAll } = require("../data");
const router = express.Router();
const usersdata = require('../data/users'); 
const eventsdata = require('../data/events')


// 1. to get the events which the user has booked  
router.post("/bookedevents", async(req,res) =>{
    try{

        // retrun only the 
        let  getUserBookings = await eventsdata.getEventByCreatorEmail(req.session.email);
        getUserBookings = getUserBookings.ticket

        res.status(200).render("bookedevents/bookedevents", getUserBookings);
        return;
    } catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 

// 2. TODO: GET ALL THE EVENTS
router.get("/getallevents", async(req,res) =>{
    try{
        const getAllEvents = await eventsdata.getByUsers(req.session.email);

        // TODO: remove bookedevents
        res.status(200).render("bookedevents/bookedevents", getAllEvents);
        return;
    } catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 

// 3.1 to get the page for creating an event
router.get("/create-event", async(req,res) =>{

    try {
        res.status(200).render('create-event/create-event')
        return;
    } catch (e){
        res.status(500).json({message : e});
        return;
    }
});


// 3.2 TODO: TO CREATE AN EVENT
router.post("/create-event", async(req,res) =>{
    
    const createEventRequestBody = req.body;
    
    // cherry: render page?
    if(!createEventRequestBody.title) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event title not found"});
        return;
    }
    if(!createEventRequestBody.category) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event category not found"});
        return;
    }
    // cherry: put creator(email) by default
    if(!createEventRequestBody.date) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event date not found"});
        return;
    }
    // cherry 
    if(!createEventRequestBody.timestart) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event timestart not found"});
        return;
    }
    if(!createEventRequestBody.endtime) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event endtime not found"});
        return;
    }
    if(!createEventRequestBody.address) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event address not found"});
        return;
    }
    if(!createEventRequestBody.city) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event city not found"});
        return;
    }
    if(!createEventRequestBody.state) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event state not found"});
        return;
    }
    if(!createEventRequestBody.ticketcapacity) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event ticketcapacity not found"});
        return;
    }
    if(!createEventRequestBody.price) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event price not found"});
        return;
    }
    if(!createEventRequestBody.description) {
        res.status(400).render('create-event/create-event', { error: e, message:"Event description not found"});
        return;
    }

    // check for string validations
    if(typeof createEventRequestBody.title !== 'string' || createEventRequestBody.title === NaN || createEventRequestBody.title.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event title is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.category !== 'string' || createEventRequestBody.category === NaN || createEventRequestBody.category.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event category is of invalid input"});
        return;
    }
    // date
    if(typeof createEventRequestBody.date !== 'string' || createEventRequestBody.date === NaN || createEventRequestBody.date.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event date is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.timestart !== 'string' || createEventRequestBody.timestart === NaN || createEventRequestBody.timestart.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event timestart is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.endtime !== 'string' || createEventRequestBody.endtime === NaN || createEventRequestBody.endtime.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event endtime is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.address !== 'string' || createEventRequestBody.address === NaN || createEventRequestBody.address.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event address is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.city !== 'string' || createEventRequestBody.city === NaN || createEventRequestBody.city.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event city is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.state !== 'string' || createEventRequestBody.state === NaN || createEventRequestBody.state.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event state is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.ticketcapacity !== 'string' || createEventRequestBody.ticketcapacity === NaN || createEventRequestBody.ticketcapacity.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event ticketcapacity is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.price !== 'string' || createEventRequestBody.price === NaN || createEventRequestBody.price.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event price is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.description !== 'string' || createEventRequestBody.description === NaN || createEventRequestBody.description.trim() === "") {
        res.status(400).render('create-event/create-event', { error: e, message:"Event description is of invalid input"});
        return;
    }

    try{
       
        // to create the new event
        let createNewEvent = await eventsdata.createEvent(createEventRequestBody.title, createEventRequestBody.category, createEventRequestBody.creator,
            createEventRequestBody.date, createEventRequestBody.timestart, createEventRequestBody.endtime, createEventRequestBody.address, createEventRequestBody.city,
            createEventRequestBody.state, createEventRequestBody.ticketcapacity, createEventRequestBody.price, createEventRequestBody.description);

        // calling function to store in the users.eventsposts
        const createUserevent = await usersdata.addPostEvents(req.session.userId, createNewEvent._id.toString(), reateEventRequestBody.title, 
        createEventRequestBody.timestart,createEventRequestBody.endtime, createEventRequestBody.description);

        if(createUserevent.addPostEvents === false) {
            res.status(400).json({message: "SEEMS LIKE THIS EVENT OVERLAPS WITH ANOTHER EVENT OF YOURS! TRY AGAIN FOR A DIFFERENT TIME"})
        }

        //  cherry: which page? 
        // cherry: a message for: CREATED SUCCUESSFULLY! 
        res.status(200).render('/',createNewEvent)

        // TODO: remove bookedevents
        res.status(200).render("bookedevents/bookedevents", getUserBookings);

        return;
    } catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 


// 4. TODO: GET ALL THE EVENTS
router.post("/getallevents", async(req,res) =>{
    try{
        let getAllEvents = await eventsdata.getByUsers(req.session.email);

        // TODO: remove bookedevents
        res.status(200).render("bookedevents/bookedevents", getUserBookings);
        return;
    } catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 



// -------------------------
// validation functions
// -------------------------
// function isValidDate(inputTime){

// }