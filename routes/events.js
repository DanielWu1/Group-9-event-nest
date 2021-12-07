const express = require("express");
//const { getAll } = require("../data");
const router = express.Router();
const usersdata = require('../data/users'); 
const eventsdata = require('../data/events')

// 1.1 to get the events which the user has booked -> get webpage
router.get("/bookedevents", async(req,res) =>{   
    try{
        const getAllEvents = await usersdata.getByUsers(req.session.email);
        const mybookEvents = getAllEvents['ticket']
        let mylist = []
        for (let i = 0; i < mybookEvents.length; i++){
            let myevent = mybookEvents[i]['eventsid'].toString()
            let getevent1 = await eventsdata.getEvent(myevent)
            mylist.push(getevent1)
        }
        res.status(200).render('bookedevents/bookedevents',{bookedevents:mylist});
        return;
    } catch(e){
        res.status(500).render('error/error',{message : e});
        return;
    }
});

// BIG TODO: TO GET THE EVENTS TO WHICH THE USER HAS BOUGHT THE TICKETS TO
// 1.2 to get the events which the user has booked  
// router.post("/bookedevents", async(req,res) =>{
//     try{

//         // retrun only the 
//         let  getUserBookings = await eventsdata.(req.session.email);
//         // getUserBookings = getUserBookings.ticket

//         res.status(200).render("bookedevents/bookedevents", getUserBookings);
//         return;
//     } catch(e){
//         res.status(500).json({message : e});
//         return;
//     }
// }); 

// 2.1 GET ALL THE EVENTS CREATED BY SELF -- web page
// router.get("/myevents", async(req,res) =>{
//     try {
//         res.status(200).render('myevents/myevents')
//         return;
//     } catch (e){
//         res.status(500).json({message : e});
//         return;
//     }
// }); 

router.post('/search/:id', async(req,res) =>{
    // console.log('asdfasdf')
    const name = req.params.id
    // console.log(name)
    if(!name) {
        res.status(400).render('error/error', { error:'You must provide a name'})
        return;
    }
    if(typeof name !== 'string') {
        res.status(400).render('error/error', { error:'name must be string'})
        return;
    }
    if(name.match(/^[ ]*$/)) {
        res.status(400).render('error/error', { error:'name is empty'})
        return;
    }
    try{
        // console.log('asdfasdf')
        let myreturn = await eventsdata.getEventListByName(name)
        // console.log(myreturn)
        res.status(200).json(myreturn)
        return
    }
    catch(e){
        res.status(400).render('error/error', { error:e})
        return;
    }

})

// 2.2: GET ALL THE EVENTS CREATED BY SELF -- get data
router.get("/myevents", async(req,res) =>{
    try{
        const getAllEvents = await usersdata.getByUsers(req.session.email);
        const mybookEvents = getAllEvents['eventspost']
        let mylist = []
        for (let i = 0; i < mybookEvents.length; i++){
            let myevent = mybookEvents[i]['eventsid'].toString()
            let getevent = await eventsdata.getEvent(myevent)
            mylist.push(getevent)
        }
        res.status(200).render('myevents/myevents',{bookedevents:mylist});
        return;
    } catch(e){
        res.status(500).render('error/error',{message : e});
        return;
    }
}); 


// 3.1 to get the page for creating an event -- web page
router.get("/create-event", async(req,res) =>{

    try {
        res.status(200).render('create-event/create-event');
        return;
    } catch (e){
        res.status(500).json({message : e});
        return;
    }
});


// 3.2 TODO: TO CREATE AN EVENT
router.post("/create-event", async(req,res) =>{
    
    const createEventRequestBody = req.body;
    // console.log(createEventRequestBody.price)
    // if(!createEventRequestBody.price) {
    //     createEventRequestBody.price = 0
    // }
    // validations
    if(!createEventRequestBody.title) {
        res.status(400).render('create-event/create-event', { error:"Event title not found"});
        return;
    }
    if(!createEventRequestBody.category) {
        res.status(400).render('create-event/create-event', { error:"Event category not found"});
        return;
    }
    // cherry: put creator(email) by default
    // if(!createEventRequestBody.date) {
    //     res.status(400).render('create-event/create-event', { error: e, message:"Event date not found"});
    //     return;
    // }
    // cherry 
    if(!createEventRequestBody.timestart) {
        res.status(400).render('create-event/create-event', { error:"Event timestart not found"});
        return;
    }
    if(!createEventRequestBody.endtime) {
        res.status(400).render('create-event/create-event', { error:"Event endtime not found"});
        return;
    }
    if(!createEventRequestBody.address) {
        res.status(400).render('create-event/create-event', { error:"Event address not found"});
        return;
    }
    if(!createEventRequestBody.city) {
        res.status(400).render('create-event/create-event', { error:"Event city not found"});
        return;
    }
    if(!createEventRequestBody.state) {
        res.status(400).render('create-event/create-event', { error:"Event state not found"});
        return;
    }
    if(!createEventRequestBody.ticketcapacity) {
        res.status(400).render('create-event/create-event', { error:"Event ticketcapacity not found"});
        return;
    }
    if(!createEventRequestBody.price) {
        res.status(400).render('create-event/create-event', { error:"Event price not found"});
        return;
    }
    if(!createEventRequestBody.description) {
        res.status(400).render('create-event/create-event', { error:"Event description not found"});
        return;
    }

    // check for string validations
    if(typeof createEventRequestBody.title !== 'string' || createEventRequestBody.title === NaN || createEventRequestBody.title.trim() === "") {
        res.status(400).render('create-event/create-event', { error:"Event title is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.category !== 'string' || createEventRequestBody.category === NaN || createEventRequestBody.category.trim() === "") {
        res.status(400).render('create-event/create-event', { error:"Event category is of invalid input"});
        return;
    }
    // TODO: VALIDATIONS FOR timestart & endtime
    // // date
    // if(typeof createEventRequestBody.date !== 'string' || createEventRequestBody.date === NaN || createEventRequestBody.date.trim() === "") {
    //     res.status(400).render('create-event/create-event', { error: e, message:"Event date is of invalid input"});
    //     return;
    // }
    // if(typeof createEventRequestBody.timestart !== 'string' || createEventRequestBody.timestart === NaN || createEventRequestBody.timestart.trim() === "") {
    //     res.status(400).render('create-event/create-event', { error: e, message:"Event timestart is of invalid input"});
    //     return;
    // }
    // if(typeof createEventRequestBody.endtime !== 'string' || createEventRequestBody.endtime === NaN || createEventRequestBody.endtime.trim() === "") {
    //     res.status(400).render('create-event/create-event', { error: e, message:"Event endtime is of invalid input"});
    //     return;
    // }
    if(typeof createEventRequestBody.address !== 'string' || createEventRequestBody.address === NaN || createEventRequestBody.address.trim() === "") {
        res.status(400).render('create-event/create-event', { error:"Event address is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.city !== 'string' || createEventRequestBody.city === NaN || createEventRequestBody.city.trim() === "") {
        res.status(400).render('create-event/create-event', { error:"Event city is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.state !== 'string' || createEventRequestBody.state === NaN || createEventRequestBody.state.trim() === "") {
        res.status(400).render('create-event/create-event', { error:"Event state is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.ticketcapacity !== 'string' || createEventRequestBody.ticketcapacity === NaN || createEventRequestBody.ticketcapacity.trim() === "") {
        res.status(400).render('create-event/create-event', { error:"Event ticketcapacity is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.price !== 'string' || createEventRequestBody.price === NaN || createEventRequestBody.price.trim() === "") {
        res.status(400).render('create-event/create-event', { error:"Event price is of invalid input"});
        return;
    }
    if(typeof createEventRequestBody.description !== 'string' || createEventRequestBody.description === NaN || createEventRequestBody.description.trim() === "") {
        res.status(400).render('create-event/create-event', { error:"Event description is of invalid input"});
        return;
    }
    if(createEventRequestBody.category !== 'Party' && createEventRequestBody.category !== 'Get-Together' && createEventRequestBody.category !== 'Conference' &&createEventRequestBody.category !== 'workshop' &&createEventRequestBody.category !== 'Expo'&&createEventRequestBody.category !== 'Networking session' ) {
        res.status(400).render('create-event/create-event', { error:"for now Event category only will be Party Get-Together Conference workshop Expo and Networking session"});
        return;
    }
    const ticketnumber = Number(createEventRequestBody.ticketcapacity)
    if (isNaN(ticketnumber)){
        res.status(400).render('create-event/create-event', { error:"ticketcapacity input is not a number"});
        return;
    }
    const ticketprice = Number(createEventRequestBody.price)
    if (isNaN(ticketprice)){
        res.status(400).render('create-event/create-event', { error:"ticket price input is not a number"});
        return;
    }
    

    try{
       
        
        // TODO: remove createEventRequestBody.date
        // to create the new event
        // console.log(createEventRequestBody.timestart)
        let mytime = createEventRequestBody.timestart
        let myarr = mytime.split('T')
        let mymdy = myarr[0].split('-')
        let myfinaltime = []
        let mystartmm = mymdy[1]+'/'+mymdy[2]+'/'+mymdy[0]
        myfinaltime.push(mystartmm)
        myfinaltime.push(myarr[1])
        let mytimee = createEventRequestBody.endtime
        let myarre = mytimee.split('T')
        let mymdye = myarre[0].split('-')
        let myfinaltimee = []
        let mystartmme = mymdye[1]+'/'+mymdye[2]+'/'+mymdye[0]
        myfinaltimee.push(mystartmme)
        myfinaltimee.push(myarre[1])
        let createNewEvent = await eventsdata.createEvent(
            createEventRequestBody.title, 
            createEventRequestBody.category, 
            createEventRequestBody.creator,
            
            //req.session.email, 
            myfinaltime, 
            myfinaltimee, 
            createEventRequestBody.address, 
            createEventRequestBody.city,
            createEventRequestBody.state, 
            //ticketnumber, 
            createEventRequestBody.ticketcapacity,
            createEventRequestBody.price,
            createEventRequestBody.description,
             
            );
        // console.log(createNewEvent._id.toString())

        // calling function to store in the users.eventsposts
        const createUserevent = await usersdata.addPostEvents(req.session.userId, createNewEvent._id.toString(), createEventRequestBody.title, 
        myfinaltime,myfinaltimee, createEventRequestBody.description);
        // console.log(createUserevent.addPostEvents)

        if(createUserevent.addPostEvents == false) {
            let changetheeventactive = await eventsdata.updateEvent(createNewEvent._id.toString(),createEventRequestBody.title, createEventRequestBody.category, req.session.email,
            createEventRequestBody.date, createEventRequestBody.timestart, createEventRequestBody.endtime, createEventRequestBody.address, createEventRequestBody.city,
            createEventRequestBody.state, createEventRequestBody.ticketcapacity, createEventRequestBody.price, createEventRequestBody.description, false)
            res.status(400).render('create-event/create-event', { error:"SEEMS LIKE THIS EVENT OVERLAPS WITH ANOTHER EVENT OF YOURS! TRY AGAIN FOR A DIFFERENT TIME"})
            return
        }
        else{
            res.status(200).redirect('/userhomepage')
            return
        }


        
    } catch(e){ 
        console.log(e)
        res.status(400).render('create-event/create-event', { error:e})
        return;
    }
}); 


router.get("/comment/:id", async(req,res) =>{
    try{
        const event = await eventsdata.getEvent(req.params.id); 
        const createEventRequestBody = req.body;
        let createNewEvent = await eventsdata.createEvent(
            createEventRequestBody.comment,



        )
            
        res.redirect("/userhomepage");
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
}); 

router.get("/likedevents", async(req,res) =>{
    try{
        res.render("likedevents/likedevents");
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
}); 

        
// 4. to get to the checkout page - web page
router.get("/checkout/:id", async(req,res) =>{
    try{
        const event = await eventsdata.getEvent(req.params.id);
        res.render("checkout/checkout", { event });
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
});    



router.get("/update/:id", async(req,res) =>{
    try{
        const event = await eventsdata.getEvent(req.params.id);
        res.render("checkout/checkout", { event });
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
});  

// to redirect to bookedevents after making the payment
router.get("/payment", async(req,res) =>{
    try{
        res.status(200).render("bookedevents/bookedevents");
        return;
    } catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 



router.get("/bookedevents", async (req, res) => {
    try {
        const myBookedEvents = await eventsdata.getMyEvents(req.session.userId);
        console.log(myBookedEvents);
        let allEvents = [];
        for (const bookedEvent of myBookedEvents) {
            allEvents.push(await eventsdata.getEvent(bookedEvent));
        }
        console.log(allEvents)
        res.render("bookedevents/bookedevents", { allBookedEvents: allEvents })
        return
    } catch (e) {
        console.log(e)
    }
})

router.get("/bookedevents/:id", async(req,res) =>{
    try{
        let eventId = req.params.id
        let userId = req.session.userId;
        let bookForUser = await eventsdata.bookTicket(userId, eventId);
        res.redirect("/mybookedevents");
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
});

// router.get("/myevents", async(req,res) =>{
//     try{
//         const myEvents = await data1.getEventByCreatorEmail(req.session.email);
//         console.log(myEvents)
//         res.render("myevents/myevents", { createdEvents: myEvents });
//         return;
// }
    
//     catch(e){
     
//         res.status(500).json({message : e});
//         return;
//     }
// });


module.exports = router;
// -------------------------
// validation functions
// -------------------------
// function isValidDate(inputTime){

// }