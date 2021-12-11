const express = require("express");
//const { getAll } = require("../data");
const router = express.Router();
const usersdata = require("../data/users");
const eventsdata = require("../data/events");
const sendemail = require("../data/email");
let { ObjectId } = require("mongodb");
const xss = require("xss");

router.post("/filterevents", async (req, res) => {
    // console.log("req.body", req.body)
    // console.log("req.body.filterList", req.body.filterList)

    // validations
    if (typeof req.body.filterList !== "object") {
        res.status(400).render("error/error", {
            error: "You must provide a name",
        });
        return;
    }
    if (req.body.filterList.length === 0) {
        res.status(400).render("error/error", {
            error: "You must provide a name",
        });
        return;
    }

    try {
        // req.body.filterList like [ 'Party', 'Expo' ]
        const eventList = await eventsdata.getEventListByCategory(
            req.body.filterList
        );

        res.status(200).json(eventList);
        return;
    } catch (e) {
        res.status(500).render("error/error", { error: e });
        return;
    }
});

// 1.1 to get the events which the user has booked -> get webpage
router.get("/bookedevents", async (req, res) => {
    try {
        const getAllEvents = await usersdata.getByUsers(req.session.email);
        const mybookEvents = getAllEvents["ticket"];
        let mylist = [];
        for (let i = 0; i < mybookEvents.length; i++) {
            let myevent = mybookEvents[i]["eventsid"].toString();
            let getevent1 = await eventsdata.getEvent(myevent);
            mylist.push(getevent1);
        }
        res.status(200).render("bookedevents/bookedevents", {
            allBookedEvents: mylist,
        });
        return;
    } catch (e) {
        res.status(500).render("error/error", { message: e });
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

router.post("/search/:id", async (req, res) => {
    // console.log('asdfasdf')
    const name = req.params.id;
    // console.log(name)
    if (!name) {
        res.status(400).render("error/error", {
            error: "You must provide a name",
        });
        return;
    }
    if (typeof name !== "string") {
        res.status(400).render("error/error", { error: "name must be string" });
        return;
    }
    if (name.match(/^[ ]*$/)) {
        res.status(400).render("error/error", { error: "name is empty" });
        return;
    }
    try {
        // console.log('asdfasdf')
        let myreturn = await eventsdata.getEventListByName(name);
        // console.log(myreturn)
        res.status(200).json(myreturn);
        return;
    } catch (e) {
        res.status(500).render("error/error", { error: e });
        return;
    }
});

// 2.2: GET ALL THE EVENTS CREATED BY SELF -- get data
router.get("/myevents", async (req, res) => {
    try {
        const getAllEvents = await usersdata.getByUsers(req.session.email);
        const mybookEvents = getAllEvents["eventspost"];
        let mylist = [];
        for (let i = 0; i < mybookEvents.length; i++) {
            let myevent = mybookEvents[i]["eventsid"].toString();
            let getevent = await eventsdata.getEvent(myevent);

            mylist.push(getevent);
        }
        res.status(200).render("myevents/myevents", { myEvents: mylist });
        return;
    } catch (e) {
        res.status(500).render("error/error", { message: e });
        return;
    }
});

// 3.1 to get the page for creating an event -- web page
router.get("/create-event", async (req, res) => {
    try {
        res.status(200).render("create-event/create-event");
        return;
    } catch (e) {
        res.status(500).json({ message: e });
        return;
    }
});

// 3.2 TODO: TO CREATE AN EVENT
router.post("/create-event", async (req, res) => {
    //const createEventRequestBody = req.body;
    // console.log(createEventRequestBody.price)
    // if(!createEventRequestBody.price) {
    //     createEventRequestBody.price = 0
    // }
    // validations
    if (!xss(req.body.title)) {
        res.status(400).render("create-event/create-event", {
            error: "Event title not found",
        });
        return;
    }
    if (!xss(req.body.category)) {
        res.status(400).render("create-event/create-event", {
            error: "Event category not found",
        });
        return;
    }
    // cherry: put creator(email) by default
    // if(!createEventRequestBody.date) {
    //     res.status(400).render('create-event/create-event', { error: e, message:"Event date not found"});
    //     return;
    // }
    // cherry
    if (!xss(req.body.timestart)) {
        res.status(400).render("create-event/create-event", {
            error: "Event timestart not found",
        });
        return;
    }
    if (!xss(req.body.endtime)) {
        res.status(400).render("create-event/create-event", {
            error: "Event endtime not found",
        });
        return;
    }
    if (!xss(req.body.address)) {
        res.status(400).render("create-event/create-event", {
            error: "Event address not found",
        });
        return;
    }
    if (!xss(req.body.city)) {
        res.status(400).render("create-event/create-event", {
            error: "Event city not found",
        });
        return;
    }
    if (!xss(req.body.state)) {
        res.status(400).render("create-event/create-event", {
            error: "Event state not found",
        });
        return;
    }
    if (!xss(req.body.ticketcapacity)) {
        res.status(400).render("create-event/create-event", {
            error: "Event ticketcapacity not found",
        });
        return;
    }
    if (!xss(req.body.price)) {
        res.status(400).render("create-event/create-event", {
            error: "Event price not found",
        });
        return;
    }
    if (!xss(req.body.description)) {
        res.status(400).render("create-event/create-event", {
            error: "Event description not found",
        });
        return;
    }

    // check for string validations
    if (
        typeof xss(req.body.title) !== "string" ||
        xss(req.body.title) === NaN ||
        xss(req.body.title).trim() === ""
    ) {
        res.status(400).render("create-event/create-event", {
            error: "Event title is of invalid input",
        });
        return;
    }
    if (
        typeof xss(req.body.category) !== "string" ||
        xss(req.body.category) === NaN ||
        xss(req.body.category).trim() === ""
    ) {
        res.status(400).render("create-event/create-event", {
            error: "Event category is of invalid input",
        });
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
    if (
        typeof xss(req.body.address) !== "string" ||
        xss(req.body.address) === NaN ||
        xss(req.body.address).trim() === ""
    ) {
        res.status(400).render("create-event/create-event", {
            error: "Event address is of invalid input",
        });
        return;
    }
    if (
        typeof xss(req.body.city) !== "string" ||
        xss(req.body.city) === NaN ||
        xss(req.body.city).trim() === ""
    ) {
        res.status(400).render("create-event/create-event", {
            error: "Event city is of invalid input",
        });
        return;
    }
    if (
        typeof xss(req.body.state) !== "string" ||
        xss(req.body.state) === NaN ||
        xss(req.body.state).trim() === ""
    ) {
        res.status(400).render("create-event/create-event", {
            error: "Event state is of invalid input",
        });
        return;
    }
    if (
        typeof xss(req.body.ticketcapacity) !== "string" ||
        xss(req.body.ticketcapacity) === NaN ||
        xss(req.body.ticketcapacity).trim() === ""
    ) {
        res.status(400).render("create-event/create-event", {
            error: "Event ticketcapacity is of invalid input",
        });
        return;
    }
    if (
        typeof xss(req.body.price) !== "string" ||
        xss(req.body.price) === NaN ||
        xss(req.body.price).trim() === ""
    ) {
        res.status(400).render("create-event/create-event", {
            error: "Event price is of invalid input",
        });
        return;
    }
    if (
        typeof xss(req.body.description) !== "string" ||
        xss(req.body.description) === NaN ||
        xss(req.body.description).trim() === ""
    ) {
        res.status(400).render("create-event/create-event", {
            error: "Event description is of invalid input",
        });
        return;
    }
    if (
        xss(req.body.category) !== "Party" &&
        xss(req.body.category) !== "Get-Together" &&
        xss(req.body.category) !== "Conference" &&
        xss(req.body.category) !== "workshop" &&
        xss(req.body.category) !== "Expo" &&
        xss(req.body.category) !== "Networking session"
    ) {
        res.status(400).render("create-event/create-event", {
            error: "for now Event category only will be Party Get-Together Conference workshop Expo and Networking session",
        });
        return;
    }
    //const ticketnumber = Number(req.body.ticketcapacity)
    if (isNaN(Number(xss(req.body.ticketcapacity)))) {
        res.status(400).render("create-event/create-event", {
            error: "ticketcapacity input is not a number",
        });
        return;
    }
    //const ticketprice = Number(createEventRequestBody.price)
    if (isNaN(Number(xss(req.body.price)))) {
        res.status(400).render("create-event/create-event", {
            error: "ticket price input is not a number",
        });
        return;
    }

    try {
        // TODO: remove createEventRequestBody.date
        // to create the new event
        // console.log(createEventRequestBody.timestart)
        // let mytime = req.body.timestart;
        // let myarr = req.body.timestart.split("T");
        // let mymdy = req.body.timestart.split("T")[0].split("-");
        let myfinaltime = [];
        // let mystartmm =
        //     req.body.timestart.split("T")[0].split("-")[1] +
        //     "/" +
        //     req.body.timestart.split("T")[0].split("-")[2] +
        //     "/" +
        //     req.body.timestart.split("T")[0].split("-")[0];
        myfinaltime.push(
            xss(req.body.timestart).split("T")[0].split("-")[1] +
                "/" +
                xss(req.body.timestart).split("T")[0].split("-")[2] +
                "/" +
                xss(req.body.timestart).split("T")[0].split("-")[0]
        );
        myfinaltime.push(xss(req.body.timestart).split("T")[1]);

        //  let mytimee = req.body.endtime;
        //let myarre = req.body.endtime.split("T");
        // let mymdye = req.body.endtime.split("T")[0].split("-");
        let myfinaltimee = [];

        myfinaltimee.push(
            xss(req.body.endtime).split("T")[0].split("-")[1] +
                "/" +
                xss(req.body.endtime).split("T")[0].split("-")[2] +
                "/" +
                xss(req.body.endtime).split("T")[0].split("-")[0]
        );
        myfinaltimee.push(xss(req.body.endtime).split("T")[1]);
        let createNewEvent = await eventsdata.createEvent(
            xss(req.body.title),
            xss(req.body.category),
            xss(req.session.userName),

            //req.session.email,
            myfinaltime,
            myfinaltimee,
            xss(req.body.address),
            xss(req.body.city),
            xss(req.body.state),
            //ticketnumber,
            xss(req.body.ticketcapacity),
            xss(req.body.price),
            xss(req.body.description)
        );
        // console.log(createNewEvent._id.toString())

        // calling function to store in the users.eventsposts
        const createUserevent = await usersdata.addPostEvents(
            req.session.userId,
            createNewEvent._id.toString(),
            req.body.title,
            myfinaltime,
            myfinaltimee,
            req.body.description
        );
        // console.log(createUserevent.addPostEvents)

        if (createUserevent == false) {
            let changetheeventactive = await eventsdata.updateEvent(
                createNewEvent._id.toString(),
                xss(req.body.title),
                xss(req.body.category),
                xss(req.session.userName),
                myfinaltime,
                myfinaltimee,
                xss(req.body.address),
                xss(req.body.city),
                xss(req.body.state),
                xss(req.body.ticketcapacity),
                xss(req.body.price),
                xss(req.body.description),
                false
            )
            res.status(400).render("create-event/create-event", {
                error: "SEEMS LIKE THIS EVENT OVERLAPS WITH ANOTHER EVENT OF YOURS! TRY AGAIN FOR A DIFFERENT TIME",
            });
            return;
        } else {
            res.status(200).redirect("/userhomepage");
            return;
        }
    } catch (e) {
        console.log(e);
        res.status(400).render("create-event/create-event", { error: e });
        return;
    }
});

// router.get("/comment/:id", async(req,res) =>{
//     try{
//         const event = await eventsdata.getEvent(req.params.id);
//         const createEventRequestBody = req.body;
//         let createNewEvent = await eventsdata.createEvent(
//             createEventRequestBody.comment,

//         )

//         res.redirect("/userhomepage");
//         return;
// }

//     catch(e){

//         res.status(500).json({message : e});
//         return;
//     }
// });

router.get("/likedevents", async (req, res) => {
    try {
        res.render("likedevents/likedevents");
        return;
    } catch (e) {
        res.status(500).json({ message: e });
        return;
    }
});

// 4. to get to the checkout page - web page
router.get("/checkout/:id", async (req, res) => {
    try {
        const event = await eventsdata.getEvent(req.params.id);
        res.render("checkout/checkout", { event });
        return;
    } catch (e) {
        res.status(500).render("error/error", { message: e });
        return;
    }
});

router.get("/bookedevents/:id", async (req, res) => {
    try {
        const event = await eventsdata.getEvent(req.params.id);
        // console.log(typeof req.session.userId)
        const additinuser = await usersdata.addTicketEvents(
            req.session.userId,
            event._id.toString(),
            event.title,
            event.timestart,
            event.endtime,
            event.description
        );
        // console.log(additinuser)
        if (additinuser === false) {
            console.log('3')
            res.status(400).render("checkoutcheck/checkoutcheck", {
                error: "Seems like you have a conflicting event for this time.",
            });
            return;
        }
        const check = await eventsdata.checkcapacity(req.params.id);
        // console.log('4')
        if (check === false) {
            res.status(400).render("checkoutcheck/checkoutcheck", {
                error: "sorry there is no more seat for your",
            });
            return;
        }
        const additinevent = await eventsdata.addbuyerinbuyerlist(
            req.session.email,
            req.params.id
        );
        if (
            additinevent === true &&
            additinuser === true
        ) {
            sendemail.sendTicketEmail(
                req.session.email,
                event.title,
                event.price,
                1
            );
        }

        res.render("checkoutcheck/checkoutcheck", {
            message: "you got that ticket, we send you the email check it!!",
        });
        return;
    } catch (e) {
        res.status(500).render("checkoutcheck/checkoutcheck", { error: e });
        return;
    }
});

router.get("/edit-event/:id", async (req, res) => {
    let id = req.params.id;
    if (!id)
        return res.render("error/error", {
            message: "You must provide an id to search for rename",
        });
    if (
        (id == "") |
        (typeof id == "undefined") |
        (id === null) |
        (id === NaN)
    ) {
        return res
            .status(400)
            .render("error/error", { message: "$ id is empty" });
    }
    if (typeof id == "string") {
        if (id.match(/^[ ]*$/)) {
            return res
                .status(400)
                .render("error/error", { message: "$ id is spaces" });
        }
    }

    if (ObjectId.isValid(id) === false) {
        return res
            .status(404)
            .render("error/error", { message: "$id is not a valid id" });
    }
    try {
        const event = await eventsdata.getEvent(req.params.id);
        res.render("edit-event/edit-event", { event });
        return;
    } catch (e) {
        res.status(500).render("error/error", { message: e });
        return;
    }
});

router.post("/edit-eventsub", async (req, res) => {
    // const myeditbody = req.body;
    // let eventid = document.getElementById('eventid')
    // console.log(myeditbody)
    // let mycapacity = Number(req.body.ticketcapacity);
    // let myprice = Number(req.body.price);
    if (isNaN(Number(xss(req.body.ticketcapacity)))) {
        res.status(400).render("edit-event/edit-event", {
            error: "ticketcapacity is not numbers",
        });
        return;
    }
    if (typeof Number(xss(req.body.ticketcapacity)) !== "number") {
        res.status(400).render("edit-event/edit-event", {
            error: "Number of Tickets must be in Numbers",
        });
        return;
    }
    if (Number(xss(req.body.ticketcapacity)) < 0) {
        res.status(400).render("edit-event/edit-event", {
            error: "ticketcapacity must more than 0 or equal 0",
        });
        return;
    }
    if (isNaN(Number(xss(req.body.price)))) {
        res.status(400).render("edit-event/edit-event", {
            error: "ticket price is not numbers",
        });
        return;
    }
    if (typeof Number(xss(req.body.price)) != "number") {
        res.status(400).render("edit-event/edit-event", {
            error: "Number of Ticket's Price must be in Numbers",
        });
        return;
    }
    if (Number(xss(req.body.price)) < 0) {
        res.status(400).render("edit-event/edit-event", {
            error: "ticket price must more than 0 or equal 0",
        });
        return;
    }
    try {
        const checkposter = await usersdata.getByUsers(req.session.email);
        let mypostlist = checkposter["eventspost"];
        let myposttest = false;
        for (let i = 0; i < mypostlist.length; i++) {
            let myid = mypostlist[i]["eventsid"].toString();
            if (myid == req.body.eventid) myposttest = true;
        }
        if (myposttest === false) {
            res.status(400).render("error/error", {
                message: "you are not this event owner",
            });
            return;
        }

        const event = await eventsdata.getEvent(req.body.eventid);
        // console.log(typeof req.session.userId)

        const updateevent = await eventsdata.updateEvent(
            req.body.eventid,
            event.title,
            event.category,
            event.creator,
            event.timestart,
            event.endtime,
            event.address,
            event.city,
            event.state,
            req.body.ticketcapacity,
            req.body.price,
            event.description,
            event.active
        );
        if (updateevent.insertedCount === 0) {
            res.status(400).render("edit-event/edit-event", {
                error: "you must change lest one element",
            });
            return;
        } else {
            res.render("checkoutcheck/checkoutcheck", {
                message: "you change that, thanks you!!",
            });
            return;
        }
    } catch (e) {
        res.status(500).render("edit-event/edit-event", { error: e });
        return;
    }
});


// router.get("/update/:id", async(req,res) =>{
//     try{
//         const event = await eventsdata.getEvent(req.params.id);
//         res.render("checkout/checkout", { event });
//         return;
// }

//     catch(e){

//         res.status(500).json({message : e});
//         return;
//     }
// });

// // to redirect to bookedevents after making the payment
// router.get("/payment", async(req,res) =>{
//     try{
//         res.status(200).render("bookedevents/bookedevents");
//         return;
//     } catch(e){
//         res.status(500).json({message : e});
//         return;
//     }
// });

router.post("/comment/:id", async (req, res) => {
    try {
        let eventId = req.params.id;
        const addComments = await eventsdata.addComment(
            eventId,
            xss(req.body.comment)
        );

        if (addComments) {
            res.redirect("/userhomepage");
            return;
        }
    } catch (e) {
        console.log(e);
        res.render("userhomepage/userhomepage");
        return;
    }
});

module.exports = router;
// -------------------------
// validation functions
// -------------------------
// function isValidDate(inputTime){

// }
