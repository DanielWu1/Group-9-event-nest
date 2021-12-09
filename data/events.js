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
    const eventList = await eventCollection.find({ active: true }).toArray();

    return eventList;
};
const getEvent = async (eventId) => {
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "Event id format wrong";
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
    timestart,
    endtime,
    address,
    city,
    state,
    ticketcapacity,
    price,
    description
) => {
    // console.log(title)
    // console.log(category)
    // console.log(creator)
    // console.log(timestart)
    // console.log(endtime)
    // console.log(address)
    // console.log(city)
    // console.log(state)
    // console.log(ticketcapacity)
    // console.log(price)
    // console.log(description)
 
    if (
        // typeof title != "string" ||
        // typeof category != "string" ||
        // typeof creator != "string" ||
        // typeof address != "string" ||
        // typeof city != "string" ||
        // typeof state != "string" ||
        // typeof description != "string" ||
        title.trim().length == 0 ||
        category.trim().length == 0 ||
        creator.trim().length == 0 ||
        address.trim().length == 0 ||
        city.trim().length == 0 ||
        state.trim().length == 0 ||
        description.trim().length == 0
    ) {
        throw "parameters are just spaces!";
    }


    //timestart validation
    if (!Array.isArray(timestart)) {
        throw "timeStart is Not an Array";
    } else if (timestart.length == 0) {
        throw "timeStart is empty";
    } else {
        if (
         
            !timestart[0].match(validDate)
        ) {
            throw " In Timestart you must enter in YYYY/DD/MM format";
        }
        if (
           
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
    let myticketcapacity = Number(ticketcapacity);
    // check for validation ticket capacity
    if (isNaN(myticketcapacity)){
        throw "ticketcapacity is not numbers"
    }
    if (typeof myticketcapacity != "number") {
        throw " Number of Tickets must be in Numbers";
    }
    

    // check for price validation
    let ticketprice = Number(price);
    if (isNaN(ticketprice)){
        throw "ticket price is not numbers"
    }
    if (typeof ticketprice != "number") {
        throw " Number of Ticket's Price must be in Numbers";
    }
    

    const eventCollection = await events();

    let newevent = {
        title: title,
        category: category,
        creator: creator,
        timestart: timestart,
        endtime: endtime,
        address: address,
        city: city,
        state: state,
        ticketcapacity: myticketcapacity,
        price: ticketprice,
        description: description,

        buyerList: [],
        likes: 0,
        intersted: 0,
        // going: 0,

        followerList: [], // people GOING
        likeList: [], // LIKE event
        interestedList: [],
        going:[], // people INTERESTED in the event

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
    let myticketcapacity = Number(ticketcapacity);
    // check for validation ticket capacity
    // console.log(myticketcapacity)
    if (isNaN(myticketcapacity)){
        throw "ticketcapacity is not numbers"
    }
    if (typeof myticketcapacity !== "number") {
        throw " Number of Tickets must be in Numbers";
    }
    

    // check for price validation
    let ticketprice = Number(price);
    if (isNaN(ticketprice)){
        throw "ticket price is not numbers"
    }
    if (typeof ticketprice != "number") {
        throw " Number of Ticket's Price must be in Numbers";
    }

   

    const eventCollection = await events();
    const olddata = await eventCollection.findOne({ _id: ObjectId(eventId) });
    const updatedEvent = {
        title: title,
        category: category,
        creator: creator,
        timestart: timestart,
        endtime: endtime,
        address: address,
        city: city,
        state: state,
        ticketcapacity: myticketcapacity,
        price: ticketprice,
        description: description,
        buyerList: olddata['buyerList'],
        likes: olddata['likes'],
        intersted: olddata['intersted'],
        going: olddata['going'],

        followerList: olddata['followerList'], // people GOING
        likeList: olddata['likeList'], // LIKE event
        interestedList: olddata['interestedList'], // people INTERESTED in the event

        comments: olddata['comments'],
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
async function getEventListByCategory(inputEventCategory) {

    // check inputs
    if (typeof inputEventCategory !== "object")
        throw "Input event category has to be an array";
    if (inputEventCategory.length === 0)
        throw "no filters supplied";

    // run query
    const eventCollection = await events();
    for (let i =0 ; i<inputEventCategory.length; i++){
        const result = await eventCollection
        .find({ "category": inputEventCategory.toString() })
        .toArray();

        returnEventList = returnEventList.concat(result);
    }

    return returnEventList;
}

const recordLike = async (eventId, userId) => {
    const eventCollection = await events();
    const likedEvent = await eventCollection.updateOne(
        { _id: new ObjectId(eventId) },
        { $addToSet: { likeList: userId }}
    );
    console.log((await eventCollection.findOne({ _id: new ObjectId(eventId) })));
    return (await eventCollection.findOne({ _id: new ObjectId(eventId) })).likeList.length;
};

const recordInterested = async (eventId, userId) => {
    const eventCollection = await events();
    const interestedEvent = await eventCollection.updateOne(
        { _id: new ObjectId(eventId) },
        { $addToSet: { interestedList: userId }}
    );
    console.log((await eventCollection.findOne({ _id: new ObjectId(eventId) })));
    return (await eventCollection.findOne({ _id: new ObjectId(eventId) })).interestedList.length;
};

const recordGoing = async (eventId, userId) => {
    const eventCollection = await events();
    const goingEvent = await eventCollection.updateOne(
        { _id: new ObjectId(eventId) },
        { $addToSet: { going: userId }}
    );
    console.log((await eventCollection.findOne({ _id: new ObjectId(eventId) })));
    return (await eventCollection.findOne({ _id: new ObjectId(eventId) })).going.length;
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

const checkcapacity = async(eventId)=>{
    let myreturn = false
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "Event id format wrong";
    }
    if (!eventId) throw "You must provide an id to search for";
    if (typeof eventId != "string" || eventId.trim().length == 0)
        throw "the id provided is not a string or is an empty string";
    const eventCollection = await events();
    const olddata = await eventCollection.findOne({ _id: parsedEventid });
    if (olddata['ticketcapacity'] < 1){
        myreturn = false
    }
    else{
        myreturn = true
    }
    return myreturn
}
const addbuyerinbuyerlist = async (email , eventId)=>{
    if ( !email){
        throw '$ you must supply the email'
    }
    if (isEmail(email) === false){
        throw '$ email is not vaile'
    }
    try {
        parsedEventid = ObjectId(eventId);
    } catch (e) {
        throw "Event id format wrong";
    }
    if (!eventId) throw "You must provide an id to search for";
    if (typeof eventId != "string" || eventId.trim().length == 0)
        throw "the id provided is not a string or is an empty string";
    const eventCollection = await events();
    const olddata = await eventCollection.findOne({ _id: parsedEventid });
    if (olddata['ticketcapacity'] < 1){
        throw 'no more site for this user'
    }
    let mynewcapacity = olddata['ticketcapacity'] - 1
    let mynewbuylist = olddata['buyerList']
    // console.log(mynewbuylist)
    // console.log(email)
    // console.log(typeof email)
    mynewbuylist.push(email)
    // console.log(mynewbuylist)
    let mynewup = {
        title: olddata['title'],
        category: olddata['category'],
        creator: olddata['creator'],
        timestart: olddata['timestart'],
        endtime: olddata['endtime'],
        address: olddata['address'],
        city: olddata['city'],
        state: olddata['state'],
        ticketcapacity: mynewcapacity,
        price: olddata['price'],
        description: olddata['description'],
        buyerList: mynewbuylist,
        likes: olddata['likes'],
        intersted: olddata['intersted'],
        going: olddata['going'],

        followerList: olddata['followerList'], // people GOING
        likeList: olddata['likeList'], // LIKE event
        interestedList: olddata['interestedList'], // people INTERESTED in the event

        comments: olddata['comments'],
        active: olddata['active'],
    }
    let addbuyer1 = await eventCollection.updateOne(
        { _id: ObjectId(eventId) },
        { $set: mynewup }
    );
    if (addbuyer1.insertedCount === 0) throw '$ Could not buy this';
    return {addbuyer : true}
}

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

const addComment = async (eventId, comment) => { 
   
        const eventCollection = await events();
    const commentAdded = await eventCollection.updateOne({ _id: new ObjectId(eventId) }, { $addToSet: { comments: [ comment ] }});
    return true;




    }
    

module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    removeEvent,
    updateEvent,
    getEventListByName,
    getEventListByCategory,
    recordLike,
    recordGoing,
    recordInterested,
    addLike,
    removeLike,
    addIntersted,
    removeIntersted,
    addGoing,
    removeGoing,
    getBuyerList,
    addbuyerinbuyerlist,
    checkcapacity,
    getEventByCreatorEmail,
    addComment 
};
