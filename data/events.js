const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;

let { ObjectId } = require("mongodb");
var validDate = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
var validTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const getAllEvents = async () => {
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();

    return eventList;
};

const get = async (id) => {
const getEvent = async (eventId) => {
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

    return event;
};

const getTime = async (id) => {
    const timeArray = [];
    const timeObject = {};
    try {
        id1 = ObjectId(id);
    } catch (e) {
        throw "Format for event id is wrong";
    }
    if (!id) throw "You must provide an id to search for";
    if (typeof id != "string" || id.trim().length == 0)
        throw "the id provided is not a string or is an empty string";
    const eventCollection = await events();
    const event = await eventCollection.findOne({ _id: id1 });

    timeObject["_id"] = event._id;
    timeObject["title"] = event.title;
    timeObject["timestart"] = event.timestart;
    timeObject["description"] = event.description;
    timeArray.push(timeObject);

    return timeArray;
};
const create = async (
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
    ticketleft,
    price,
    description
) => {
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
        !ticketleft ||
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

    if (typeof ticketcapacity != "number" || typeof ticketleft != "number") {
    if (typeof ticketcapacity != "number") {
        throw " Number of Tickets must be in Numbers";
    }
    if (typeof price != "number") {
        throw " Number of Ticket's Price must be in Numbers";
    }

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
        ticketleft: ticketleft,
        price: price,
        description: description,
        buyerList: [],
        followerList: [],
        likeList: [],
        comments : []
        comments: [],
    };

    const insertInfo = await eventCollection.insertOne(newevent);

    const newId = insertInfo.insertedId;

    const event = await getEvent(newId.toString());

    return event;
};
const removeEvent = async (eventId) => {
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "Format for event id is wrong";
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
    ticketleft,
    price,
    description
) => {
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "Format for event id is wrong";
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
        !ticketleft ||
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

    if (typeof ticketcapacity != "number" || typeof ticketleft != "number") {
    if (typeof ticketcapacity != "number") {
        throw " Number of Tickets must be in Numbers";
    }

    if (typeof price != "number") {
        throw " Number of Ticket's Price must be in Numbers";
    }
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
        ticketleft: ticketleft,
        description: description,
    };
    await eventCollection.updateOne(
        { _id: ObjectId(id) },
        price: price,
        description: description,
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
module.exports = {
    

    createEvent,
    getAllEvents,
    getEvent,
    removeEvent,
    updateEvent,
    getTimingofEvent,
};
