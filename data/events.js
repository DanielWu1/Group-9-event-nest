const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;

let { ObjectId } = require("mongodb");

var myDate = new Date();
var mytime = myDate.toLocaleDateString();
var myhour = myDate.getHours();
const validDate = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
const validTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const getAllEvents = async () => {
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();

    return eventList;
};
const getEvent = async (eventId) => {
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    if (!eventId) throw "You must provide an id to search for";
    if (typeof eventId != "string" || eventId.trim().length == 0)
        throw "the id provided is not a string or is an empty string";
    const eventCollection = await events();
    const event = await eventCollection.findOne({ _id: parsedEventid });

    return event;
};
const createEvent = async (
    title,
    category,
    creator,
    date,
    timestart,
    endtime,
    address,
    city,
    state,
    ticketcapacity,
    price,
    description
) => {

    // checking for valid fields
    if (
        !title ||
        !category ||
        !creator ||
        !date ||
        !timestart ||
        !endtime ||
        !address ||
        !city ||
        !state ||
        !ticketcapacity ||
        !price ||
        !description
    ) {
        throw "All fields need to have valid values";
    }

    // to check for validations
    if (
        typeof title != "string" ||
        typeof category != "string" ||
        typeof creator != "string" ||
        typeof date != "string" ||
        typeof address != "string" ||
        typeof city != "string" ||
        typeof state != "string" ||
        typeof description != "string" ||
        title.trim().length == 0 ||
        category.trim().length == 0 ||
        creator.trim().length == 0 ||
        address.trim().length == 0 ||
        city.trim().length == 0 ||
        state.trim().length == 0 ||
        description.trim().length == 0
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    // date validation
    if (!date.match(validDate)) {
        throw "Date is not in Valid Format";
    }

    // timestart validation
    if (!Array.isArray(timestart)) {
        throw "timeStart is Not an Array";
    } else if (timestart.length == 0) {
        throw "timeStart is empty";
    } else {
        if (
            typeof timestart[0] != "string" ||
            timestart[0].trim().length == 0 ||
            !timestart[0].match(validDate)
        ) {
            throw " In Timestart you must enter in MM/DD/YY format";
        }
        if (
            typeof timestart[1] != "string" ||
            timestart[1].trim().length == 0 ||
            !timestart[1].match(validTime)
        ) {
            throw " In Timestart you must enter in HH/MM format";
        }
    }
    // start and end time
    let mystart = new Date(timestart[0] + " " + timestart[1]);
    if (myDate > mystart) {
        throw "$ start time must after now";
    }
    if (!Array.isArray(endtime)) {
        throw "endtime is Not an Array";
    } else if (endtime.length == 0) {
        throw "endtime is Empty";
    } else {
        if (
            typeof endtime[0] != "string" ||
            endtime[0].trim().length == 0 ||
            !endtime[0].match(validDate)
        ) {
            throw " In Endtime you must enter in MM/DD/YY format";
        }
        if (
            typeof endtime[1] != "string" ||
            endtime[1].trim().length == 0 ||
            !endtime[1].match(validTime)
        ) {
            throw " In Endtime you must enter in HH/MM format";
        }
    }
    let myend = new Date(endtime[0] + " " + endtime[1]);
    if (mystart > myend) {
        throw "$ end time must after start time and now";
    }

    // check for validation ticket capacity
    if (typeof ticketcapacity != "number") {
        throw " Number of Tickets must be in Numbers";
    }

    // check for price validation
    if (typeof price != "number") {
        throw " Number of Ticket's Price must be in Numbers";
    }

    // to create a new event
    const eventCollection = await events();

    let newevent = {
        title: title,
        category: category,
        creator: creator,
        date: date,
        timestart: timestart,
        endtime: endtime,
        address: address,
        city: city,
        state: state,
        ticketcapacity: ticketcapacity,
        price: price,
        description: description,
        buyerList: [], // people who have bought
        followerList: [], // people GOING
        likeList: [], // LIKE event
        interestedList : [], // people INTERESTED in the event
        comments: [],
        active: true
    };

    const insertInfo = await eventCollection.insertOne(newevent);

    const newId = insertInfo.insertedId;

    const event = await getEvent(newId.toString());

    return event;
};

// remove event
const removeEvent = async (eventId) => {
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    if (!eventId) throw "You must provide an id to search for";
    if (typeof eventId != "string" || eventId.trim().length == 0)
        throw "the id provided is not a string or is an  empty string";
    const eventCollection = await events();
    const findEvent = await eventCollection.findOne({ _id: parsedEventid });
    if (findEvent === null) throw "No event Found for this ID";
    await eventCollection.deleteOne({ _id: parsedEventid });
    return `${findEvent.title} has been successfully removed`;
};

// update the event
const updateEvent = async (
    eventId,
    title,
    category,
    creator,
    date,
    timestart,
    endtime,
    address,
    city,
    state,
    ticketcapacity,
    price,
    description,
    active
) => {
    
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    if (!eventId) throw "You must provide an id to search for";

    if (
        !title ||
        !category ||
        !creator ||
        !date ||
        !timestart ||
        !endtime ||
        !address ||
        !city ||
        !state ||
        !ticketcapacity ||
        !price ||
        !description 
    ) {
        throw "All fields need to have valid values";
    }

    if (
        typeof title != "string" ||
        typeof category != "string" ||
        typeof creator != "string" ||
        typeof date != "string" ||
        typeof address != "string" ||
        typeof city != "string" ||
        typeof state != "string" ||
        typeof description != "string" ||
        title.trim().length == 0 ||
        category.trim().length == 0 ||
        creator.trim().length == 0 ||
        address.trim().length == 0 ||
        city.trim().length == 0 ||
        state.trim().length == 0 ||
        description.trim().length == 0 
        
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    if (!date.match(validDate)) {
        throw "Date is not in Valid Format";
    }
    if (!Array.isArray(timestart)) {
        throw "timeStart is Not an Array";
    } else if (timestart.length == 0) {
        throw "timeStart is empty";
    } else {
        if (
            typeof timestart[0] != "string" ||
            timestart[0].trim().length == 0 ||
            !timestart[0].match(validDate)
        ) {
            throw " In Timestart you must enter in MM/DD/YY format";
        }
        if (
            typeof timestart[1] != "string" ||
            timestart[1].trim().length == 0 ||
            !timestart[1].match(validTime)
        ) {
            throw " In Timestart you must enter in HH/MM format";
        }
    }

    if (!Array.isArray(endtime)) {
        throw "endtime is not an Array";
    } else if (endtime.length == 0) {
        throw "endtime is empty";
    } else {
        if (
            typeof endtime[0] != "string" ||
            endtime[0].trim().length == 0 ||
            !endtime[0].match(validDate)
        ) {
            throw " In Endtime you must enter in MM/DD/YY format";
        }
        if (
            typeof endtime[1] != "string" ||
            endtime[1].trim().length == 0 ||
            !endtime[1].match(validTime)
        ) {
            throw " In Endtime you must enter in HH/MM format";
        }
    }

    if (typeof ticketcapacity != "number") {
        throw " Number of Tickets must be in Numbers";
    }

    if (typeof price != "number") {
        throw " Number of Ticket's Price must be in Numbers";
    }

    if (typeof active !== "boolean") throw "Active status of the event must a true or false";

    const eventCollection = await events();

    const updatedEvent = {
        title: title,
        category: category,
        creator: creator,
        date: date,
        timestart: timestart,
        endtime: endtime,
        address: address,
        city: city,
        state: state,
        ticketcapacity: ticketcapacity,
        price: price,
        description: description,
        active: active
    };
    await eventCollection.updateOne(
        { _id: ObjectId(eventId) },
        { $set: updatedEvent }
    );
    return await getEvent(eventId);
};
const getTimingofEvent = async (eventId) => {
    const timeArray = [];
    const timeObject = {};
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "Format for event id is wrong";
    }
    if (!eventId) throw "You must provide an id to search for";
    if (typeof eventId != "string" || eventId.trim().length == 0)
        throw "the id provided is not a string or is an empty string";
    const eventCollection = await events();
    const event = await eventCollection.findOne({ _id: parsedEventid });

    timeObject["_id"] = event._id;
    timeObject["title"] = event.title;
    timeObject["timestart"] = event.timestart;
    timeObject["description"] = event.description;
    timeArray.push(timeObject);

    return timeArray;
};

// QUERYING FOR SEARCH BY NAME // FOR SEARCH BAR
async function getEventListByName(inputEventName) {

    // check inputs
    if (typeof inputEventName !== "string") throw "Input event name has to be a string";
    if (inputEventName.trim() === "") throw "Input event is an empty string"

    // run query
    const eventCollection = await events();
    const result = await eventCollection.find({title:inputEventName.toString()}).toArray();

    return result;
};

// QUERYING FOR SEARCH BY CATEGORY // FOR CATEGORY FILTERS
// TODO: check to be done with Ajax
async function getEventListByCategory(inputEventCategory) {

    // check inputs
    if (typeof inputEventCategory !== "string") throw "Input event category has to be a string";
    if (inputEventCategory.trim() === "") throw "Input event category is an empty string"

    // run query
    const eventCollection = await events();
    const result = await eventCollection.find({category:inputEventCategory.toString()}).toArray();

    return result;
};

// to get the event booked by 
async function getEventByCreatorEmail(inputEmail){

    if (!inputEmail) throw "You must provide an emailid to search for";
    if (typeof inputEmail !== "string" || inputEmail.trim().length === 0 || inputEmail === NaN) throw "the email provided is not a string or is an empty string";
    if (isEmail(inputEmail) === false) throw "email of invalid format"
    
    const eventCollection = await events();
    const eventList = await eventCollection.find({ creator: inputEmail }).toArray();

    return eventList;
}


// check for email
function isEmail(inputEmail) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (inputEmail.match(re)){
        return true;
    } else {
        return false;
    }
}


module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    removeEvent,
    updateEvent,
    getTimingofEvent,
    getEventListByName,
    getEventListByCategory,
    getEventByCreatorEmail
};


