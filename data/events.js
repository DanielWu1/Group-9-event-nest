const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;

let { ObjectId, TopologyDescriptionChangedEvent } = require("mongodb");

var myDate = new Date();
var mytime = myDate.toLocaleDateString();
var myhour = myDate.getHours();
const validDate = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
const validTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
// function datetime(str) {
//     let datetimer = [];
//     let date = "";
//     let time = "";
//     for (let i = 0; i < 10; i++) {
//         date += str[i];
//     }
//     for (let j = 11; j < 16; j++) {
//         time += str[j];
//     }
//     datetimer.push(date);
//     datetimer.push(time);
//     return datetimer;
// }
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
    // if (!date.match(validDate)) {
    //     throw "Date is not in Valid Format";
    // }

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
        throw " start Event time must after now";
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

        buyerList: [],
        likes: 0,
        intersted: 0,
        going: 0,

        followerList: [], // people GOING
        likeList: [], // LIKE event
        interestedList: [], // people INTERESTED in the event

        comments: [],
        active: true,
    };

    const insertInfo = await eventCollection.insertOne(newevent);

    const newId = insertInfo.insertedId;

    const event = await getEvent(newId.toString());

    return event;
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
    price,
    description,
    active
) => {
    // console.log(active, typeof active)

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

    // if (!date.match(validDate)) {
    //     throw "Date is not in Valid Format";
    // }
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

    if (typeof active !== "boolean")
        throw "Active status of the event must a true or false";

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
        active: active,
    };
    await eventCollection.updateOne(
        { _id: ObjectId(eventId) },
        { $set: updatedEvent }
    );
    return await getEvent(eventId);
};
const removeEvent = async (
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
    description
) => {
    // console.log(active, typeof active)

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

    // if (!date.match(validDate)) {
    //     throw "Date is not in Valid Format";
    // }
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
        active: false,
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
    if (typeof inputEventName !== "string")
        throw "Input event name has to be a string";
    if (inputEventName.trim() === "") throw "Input event is an empty string";

    // run query
    const eventCollection = await events();
    const result = await eventCollection
        .find({ title: inputEventName.toString() })
        .toArray();

    return result;
}

// QUERYING FOR SEARCH BY CATEGORY // FOR CATEGORY FILTERS
// TODO: check to be done with Ajax
async function getEventListByCategory(inputEventCategory) {
    // check inputs
    if (typeof inputEventCategory !== "string")
        throw "Input event category has to be a string";
    if (inputEventCategory.trim() === "")
        throw "Input event category is an empty string";

    // run query
    const eventCollection = await events();
    const result = await eventCollection
        .find({ category: inputEventCategory.toString() })
        .toArray();

    return result;
}

const recordLike = async (eventId, userId) => {
    const eventCollection = await events();
    const likedEvent = await eventCollection.updateOne(
        { _id: new ObjectId(eventId) },
        { $addToSet: { likeList: userId } }
    );
    return true;
};
const addLike = async (eventId) => {
    if (!eventId) {
        throw "event id need to have valid values";
    }
    if (typeof eventId != "string" || eventId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }

    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    const eventCollection = await events();

    const findEvent = await eventCollection.findOne({
        _id: ObjectId(eventId),
    });
    // console.log(findEvent);
    // let mynewcomment = findComment["comments"];
    // for (let i = 0; i < mynewcomment.length; i++) {
    //     let mycommentlist = mynewcomment[i];
    //     if (mycommentlist["_id"].equals(commentId)) {
    //         console.log("asdfasdf");
    //         mycommentlist["comments"] = comments;
    //     }
    // }
    like = findEvent.likes;
    like = like + 1;
    const updatedEvent = {
        title: findEvent.title,
        category: findEvent.category,
        creator: findEvent.creator,
        date: findEvent.date,
        timestart: findEvent.timestart,
        endtime: findEvent.endtime,
        address: findEvent.address,
        city: findEvent.city,
        state: findEvent.state,
        ticketcapacity: findEvent.ticketcapacity,
        price: findEvent.price,
        description: findEvent.description,
        active: findEvent.active,
        likes: like,
    };
    await eventCollection.updateOne(
        { _id: parsedEventid },
        { $set: updatedEvent }
    );

    return `Total number of likes is ${updatedEvent.likes}`;
};
const removeLike = async (eventId) => {
    if (!eventId) {
        throw "event id need to have valid values";
    }
    if (typeof eventId != "string" || eventId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }

    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    const eventCollection = await events();

    const findEvent = await eventCollection.findOne({
        _id: ObjectId(eventId),
    });
    // console.log(findEvent);
    // let mynewcomment = findComment["comments"];
    // for (let i = 0; i < mynewcomment.length; i++) {
    //     let mycommentlist = mynewcomment[i];
    //     if (mycommentlist["_id"].equals(commentId)) {
    //         console.log("asdfasdf");
    //         mycommentlist["comments"] = comments;
    //     }
    // }
    like = findEvent.likes;
    like = like - 1;

    const updatedEvent = {
        title: findEvent.title,
        category: findEvent.category,
        creator: findEvent.creator,
        date: findEvent.date,
        timestart: findEvent.timestart,
        endtime: findEvent.endtime,
        address: findEvent.address,
        city: findEvent.city,
        state: findEvent.state,
        ticketcapacity: findEvent.ticketcapacity,
        price: findEvent.price,
        description: findEvent.description,
        active: findEvent.active,
        likes: like,
    };
    await eventCollection.updateOne(
        { _id: parsedEventid },
        { $set: updatedEvent }
    );

    return `Total number of likes is ${updatedEvent.likes}`;
};

const addIntersted = async (eventId) => {
    if (!eventId) {
        throw "event id need to have valid values";
    }
    if (typeof eventId != "string" || eventId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }

    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    const eventCollection = await events();

    const findEvent = await eventCollection.findOne({
        _id: ObjectId(eventId),
    });
    // console.log(findEvent);
    // let mynewcomment = findComment["comments"];
    // for (let i = 0; i < mynewcomment.length; i++) {
    //     let mycommentlist = mynewcomment[i];
    //     if (mycommentlist["_id"].equals(commentId)) {
    //         console.log("asdfasdf");
    //         mycommentlist["comments"] = comments;
    //     }
    // }
    intersted = findEvent.intersted;
    intersted = intersted + 1;
    const updatedEvent = {
        title: findEvent.title,
        category: findEvent.category,
        creator: findEvent.creator,
        date: findEvent.date,
        timestart: findEvent.timestart,
        endtime: findEvent.endtime,
        address: findEvent.address,
        city: findEvent.city,
        state: findEvent.state,
        ticketcapacity: findEvent.ticketcapacity,
        price: findEvent.price,
        description: findEvent.description,
        active: findEvent.active,
        likes: findEvent.likes,
        intersted: intersted,
    };
    await eventCollection.updateOne(
        { _id: parsedEventid },
        { $set: updatedEvent }
    );

    return `Total number of intersted is ${updatedEvent.intersted}`;
};
const removeIntersted = async (eventId) => {
    if (!eventId) {
        throw "event id need to have valid values";
    }
    if (typeof eventId != "string" || eventId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }

    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    const eventCollection = await events();

    const findEvent = await eventCollection.findOne({
        _id: ObjectId(eventId),
    });
    // console.log(findEvent);
    // let mynewcomment = findComment["comments"];
    // for (let i = 0; i < mynewcomment.length; i++) {
    //     let mycommentlist = mynewcomment[i];
    //     if (mycommentlist["_id"].equals(commentId)) {
    //         console.log("asdfasdf");
    //         mycommentlist["comments"] = comments;
    //     }
    // }
    intersted = findEvent.intersted;
    intersted = intersted - 1;
    const updatedEvent = {
        title: findEvent.title,
        category: findEvent.category,
        creator: findEvent.creator,
        date: findEvent.date,
        timestart: findEvent.timestart,
        endtime: findEvent.endtime,
        address: findEvent.address,
        city: findEvent.city,
        state: findEvent.state,
        ticketcapacity: findEvent.ticketcapacity,
        price: findEvent.price,
        description: findEvent.description,
        active: findEvent.active,
        likes: findEvent.likes,
        intersted: intersted,
    };
    await eventCollection.updateOne(
        { _id: parsedEventid },
        { $set: updatedEvent }
    );

    return `Total number of intersted is ${updatedEvent.intersted}`;
};

const addGoing = async (eventId) => {
    if (!eventId) {
        throw "event id need to have valid values";
    }
    if (typeof eventId != "string" || eventId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }

    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    const eventCollection = await events();

    const findEvent = await eventCollection.findOne({
        _id: ObjectId(eventId),
    });
    // console.log(findEvent);
    // let mynewcomment = findComment["comments"];
    // for (let i = 0; i < mynewcomment.length; i++) {
    //     let mycommentlist = mynewcomment[i];
    //     if (mycommentlist["_id"].equals(commentId)) {
    //         console.log("asdfasdf");
    //         mycommentlist["comments"] = comments;
    //     }
    // }
    going = findEvent.going;
    going = going + 1;
    const updatedEvent = {
        title: findEvent.title,
        category: findEvent.category,
        creator: findEvent.creator,
        date: findEvent.date,
        timestart: findEvent.timestart,
        endtime: findEvent.endtime,
        address: findEvent.address,
        city: findEvent.city,
        state: findEvent.state,
        ticketcapacity: findEvent.ticketcapacity,
        price: findEvent.price,
        description: findEvent.description,
        active: findEvent.active,
        likes: findEvent.likes,
        intersted: findEvent.intersted,
        going: going,
    };
    await eventCollection.updateOne(
        { _id: parsedEventid },
        { $set: updatedEvent }
    );

    return `Total number of going is ${updatedEvent.going}`;
};
const removeGoing = async (eventId) => {
    if (!eventId) {
        throw "event id need to have valid values";
    }
    if (typeof eventId != "string" || eventId.trim().length == 0) {
        throw "id is not string or is empty string,";
    }

    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "id format wrong";
    }
    const eventCollection = await events();

    const findEvent = await eventCollection.findOne({
        _id: ObjectId(eventId),
    });
    // console.log(findEvent);
    // let mynewcomment = findComment["comments"];
    // for (let i = 0; i < mynewcomment.length; i++) {
    //     let mycommentlist = mynewcomment[i];
    //     if (mycommentlist["_id"].equals(commentId)) {
    //         console.log("asdfasdf");
    //         mycommentlist["comments"] = comments;
    //     }
    // }
    going = findEvent.going;
    going = going - 1;
    const updatedEvent = {
        title: findEvent.title,
        category: findEvent.category,
        creator: findEvent.creator,
        date: findEvent.date,
        timestart: findEvent.timestart,
        endtime: findEvent.endtime,
        address: findEvent.address,
        city: findEvent.city,
        state: findEvent.state,
        ticketcapacity: findEvent.ticketcapacity,
        price: findEvent.price,
        description: findEvent.description,
        active: findEvent.active,
        likes: findEvent.likes,
        intersted: findEvent.intersted,
        going: going,
    };
    await eventCollection.updateOne(
        { _id: parsedEventid },
        { $set: updatedEvent }
    );

    return `Total number of going is ${updatedEvent.going}`;
};
// const getBuyerList = async (eventId, userEmail) => {
//     if (!eventId) {
//         throw "event id need to have valid values";
//     }
//     if (!userEmail) {
//         throw "$ you must supply the email";
//     }
//     if (
//         (userEmail == "") |
//         (typeof userEmail == "undefined") |
//         (userEmail === null) |
//         (userEmail === NaN)
//     ) {
//         throw "$ email is empty";
//     }
//     if (userEmail.match(/^[ ]*$/)) {
//         throw "$email is spaces";
//     }
//     if (userEmail.match(/^[ ]*$/)) {
//         throw "$email is spaces";
//     }
//     let net = userEmail.split("");
//     // if (net[0] !== 'h'|| net[1] !== 't' || net[2] !== 't' || net[3] !== 'p' || net[4] !== ':' || net[5] !== '/' || net[6] !== '/' || net[7] !== 'w' || net[8] !== 'w' || net[9] !== 'w' || net[10] !== '.')
//     // throw '$ website is not right'
//     if (net.indexOf("@") == -1) {
//         throw "$ userEmail is not right1";
//     }
//     // console.log(net[net.length - 1])
//     if (
//         net[net.length - 1] !== "m" ||
//         net[net.length - 2] !== "o" ||
//         net[net.length - 3] !== "c" ||
//         net[net.length - 4] !== "."
//     ) {
//         throw "$ userEmail is not right2";
//     }
//     let mya = net.indexOf("@");
//     if (net.length - 4 - (mya + 1) < 4) {
//         throw "$ userEmail is not right3";
//     }
//     let myusmail = email.split("@");
//     if (myusmail[0].indexOf(" ") !== -1) {
//         throw "$ userEmail name have spaces";
//     }
//     if (/^[a-z0-9]+$/i.test(myusmail[0]) === false) {
//         throw "$ userEmail name is not valid";
//     }
//     if (mya + 1 < 5) {
//         throw "$ userEmail is not right4";
//     }
//     if (typeof eventId != "string" || eventId.trim().length == 0) {
//         throw "id is not string or is empty string,";
//     }

//     try {
//         parsedEventid = ObjectId(eventId);
//     } catch (e) {
//         throw "id format wrong";
//     }
//     const eventCollection = await events();

//     const findEvent = await eventCollection.findOne({
//         _id: ObjectId(eventId),
//     });
//     console.log(findEvent);
//     // let mynewcomment = findComment["comments"];
//     // for (let i = 0; i < mynewcomment.length; i++) {
//     //     let mycommentlist = mynewcomment[i];
//     //     if (mycommentlist["_id"].equals(commentId)) {
//     //         console.log("asdfasdf");
//     //         mycommentlist["comments"] = comments;
//     //     }
//     // }

//     const updatedEvent = {
//         title: findEvent.title,
//         category: findEvent.category,
//         creator: findEvent.creator,
//         date: findEvent.date,
//         timestart: findEvent.timestart,
//         endtime: findEvent.endtime,
//         address: findEvent.address,
//         city: findEvent.city,
//         state: findEvent.state,
//         ticketcapacity: findEvent.ticketcapacity,
//         price: findEvent.price,
//         description: findEvent.description,
//         active: findEvent.active,

//         likes: findEvent.likes,
//         intersted: findEvent.intersted,
//         going: findEvent.going,
//     };
//     const a = await eventCollection.updateOne(
//         { _id: new ObjectId(eventId) },
//         { $addToSet: { buyerList: userEmail } }
//     );

//     if (a == null) {
//         return false;
//     } else {
//         return true;
//     }
// };

const getBuyerList = async (eventId, creator, noOftickets) => {
    const eventCollection = await events();
    const findEvent = await eventCollection.findOne({ _id: ObjectId(eventId) });
    ticketCap = findEvent.ticketcapacity;
    // const likedEvent = await eventCollection.updateOne(
    //     { _id: new ObjectId(eventId) },
    //     {
    //         $addToSet: { buyerList: creator },
    //     }
    // );

    if (findEvent == null) {
        return false;
    } else {
        ticketCap = ticketCap - noOftickets;

        const newBuy = {
            creator: creator,
            boughtTickets: noOftickets,
        };
        await eventCollection.updateOne(
            { _id: ObjectId(eventId) },
            { $push: { buyerList: newBuy } }
        );

        return true;
    }
};

// to get the event booked by
async function getEventByCreatorEmail(inputEmail) {
    if (!inputEmail) throw "You must provide an emailid to search for";
    if (
        typeof inputEmail !== "string" ||
        inputEmail.trim().length === 0 ||
        inputEmail === NaN
    )
        throw "the email provided is not a string or is an empty string";
    if (isEmail(inputEmail) === false) throw "email of invalid format";

    const eventCollection = await events();
    const eventList = await eventCollection
        .find({ creator: inputEmail })
        .toArray();

    return eventList;
}

// check for email
function isEmail(inputEmail) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (inputEmail.match(re)) {
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
    recordLike,
    addLike,
    removeLike,
    addIntersted,
    removeIntersted,
    addGoing,
    removeGoing,
    getBuyerList,

    getEventByCreatorEmail,
};
