const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require("mongodb")
const bcrypt = require('bcryptjs');
const saltRounds = 16;
var myDate = new Date();
var mytime = myDate.toLocaleDateString();
var myhour = myDate.getHours()
const validDate = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
const validTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
// console.log(myhour)
// console.log(mytime)


async function createUser(userName, phone, gender, email, address, password,){
    if (typeof(userName) !== 'string'| typeof(email) !== 'string'|typeof(address) !== 'string'| typeof(password) !== 'string'){
        throw '$ input is not string';
    }
    if ( !userName){
        throw '$ you must supply the user userName'
    }
    if ( !phone){
        throw '$ you must supply the phone'
    }
    if ( !gender){
        throw '$ you must supply the gender'
    }
    if ( !email){
        throw '$ you must supply the email'
    }
    if ( !address){
        throw '$ you must supply the address'
    }
    if ( !password){
        throw '$ you must supply the password'
    }
    if (userName ==''|typeof userName == 'undefined' | userName === null | userName === NaN){
        throw '$ userName is empty';
    }
    if (userName.match(/^[ ]*$/)){
        throw '$ userName is spaces'
    }
    // if (typeof phone != 'string'){
    //     throw '$ phone number must be number'
    // }
    let mypho1 = phone.split('')
    if (mypho1[3] !== '-' || mypho1[7] !== '-'){
        throw '$ phone input is wrong2'
    }
    let mypho = phone.split('-')
    if (mypho[0].length !== 3 || mypho[1].length !== 3 || mypho[2].length !== 4){
        throw '$ phone input is wrong1'
    }
    if (mypho.length != 3){
        throw 'phone input is wrong3'
    }
    let n = Number(mypho[0])
    let n2 = Number(mypho[1])
    let n3 = Number(mypho[2])
    if (isNaN(n) || isNaN(n2) || isNaN(n3)){
        throw '$ phone input is not a number'
    }
    if( gender !== 'male' &&  gender!== 'female' && gender!== 'orther'){
        throw '$ gender must be male ,female or orhter'
    }
    if (email ==''|typeof email == 'undefined' | email === null | email === NaN){
        throw '$ email is empty';
    }
    if (email.match(/^[ ]*$/)){
        throw '$email is spaces'
    }
    let net = email.split('')
    // if (net[0] !== 'h'|| net[1] !== 't' || net[2] !== 't' || net[3] !== 'p' || net[4] !== ':' || net[5] !== '/' || net[6] !== '/' || net[7] !== 'w' || net[8] !== 'w' || net[9] !== 'w' || net[10] !== '.')
    // throw '$ website is not right'
    if (net.indexOf('@') == -1){
        throw '$ email is not right1'
    }
    // console.log(net[net.length - 1])
    if (net[net.length - 1] !== 'm'|| net[net.length - 2] !== 'o' || net[net.length - 3] !== 'c' || net[net.length - 4] !== '.'){
        throw '$ email is not right2'
    }
    let mya = net.indexOf('@')
    if ((net.length-4) - (mya+1) < 4){
        throw '$ email is not right3'
    }
    let myusmail = email.split('@')
    if (myusmail[0].indexOf(' ')!== -1){
        throw '$ email name have spaces'
    }
    if ((/^[a-z0-9]+$/i).test(myusmail[0]) === false){
        throw '$ email name is not valid'
    }
    if (mya+1 < 5){
        throw '$ email is not right4'
    }
    // addrees check not ready


    if (password ==''|typeof password == 'undefined' | password === null | password === NaN){
        throw '$ password is empty';
    }
    if (password.match(/^[ ]*$/)){
        throw '$ password is spaces'
    }
//to lower case

    const users1 = await users();
    const hash = await bcrypt.hash(password,saltRounds)
    let myaftertestemail = email.split('@')
    myaftertestemail[0] = myaftertestemail[0].toLowerCase()
    let mynewemail = myaftertestemail[0]+'@'+myaftertestemail[1]
    const myusers = await users1.findOne({ email: mynewemail });
    if (myusers !== null) throw 'have users with same email';
    let newusers = {
        userName: userName,
        phone: phone,
        gender: gender,
        email: mynewemail,
        address: address,
        password: hash,
        URL: {},
        ticket: [],
        eventspost: [],
        likeevents: [],
      };
      let myreturn = {}
      myreturn['CreateUser'] = false
      const insertInfo = await users1.insertOne(newusers);
      if (insertInfo.insertedCount === 0) {throw '$ Could not add new restaurants'}
      else {
        myreturn['CreateUser'] = true
      }
  
    //   const newId = insertInfo.insertedId;
    //   newusers['_id'] = newusers['_id'].toString()
    //   const dog = await this.getDogById(newId);
    // it will return the users information
      return myreturn;

}

async function getAll(){
    const newusers = await users();

    const usersList = await newusers.find({}).toArray();
    // console.log(restaurantsList['_id'])
    for (let i = 0; i < usersList.length; i++){
        let newid = usersList[i]
        newid['_id'] = newid['_id'].toString()
    }

    return usersList;
}

function myDBfunction(id) {
    let { ObjectId } = require('mongodb');
    let parsedId = ObjectId(id)

    if (!id) throw 'Id parameter must be supplied';
  

    if (typeof id !== 'string') throw "Id must be a string";


    console.log('Parsed it correctly, now I can pass parsedId into my query.');
    return parsedId
}

async function checkUsers(email,password){

    if (!email) throw 'You must provide an email to search for get';
    if ( !password){
        throw '$ you must supply the password'
    }
    if (email ==''|typeof email == 'undefined' | email === null | email === NaN){
        throw '$ email is empty';
    }
    if (typeof email == 'string'){
        if (email.match(/^[ ]*$/)){
            throw '$email is spaces'
        }
    }
    let net = email.split('')
    // if (net[0] !== 'h'|| net[1] !== 't' || net[2] !== 't' || net[3] !== 'p' || net[4] !== ':' || net[5] !== '/' || net[6] !== '/' || net[7] !== 'w' || net[8] !== 'w' || net[9] !== 'w' || net[10] !== '.')
    // throw '$ website is not right'
    // if (net.indexOf('@') == -1){
    //     throw '$ email is not right1'
    // }
    // console.log(net[net.length - 1])
    if (net[net.length - 1] !== 'm'|| net[net.length - 2] !== 'o' || net[net.length - 3] !== 'c' || net[net.length - 4] !== '.'){
        throw '$ email is not right2'
    }
    let mya = net.indexOf('@')
    if ((net.length-4) - (mya+1)< 4){
        throw '$ email is not right3'
    }
    let myusmail = email.split('@')
    if (myusmail[0].indexOf(' ')!== -1){
        throw '$ email name have spaces'
    }
    if ((/^[a-z0-9]+$/i).test(myusmail[0]) === false){
        throw '$ email name is not valid'
    }
    if (mya+1 < 5){
        throw '$ email is not right4'
    }

    // if(ObjectId.isValid(id)===false){
    //     throw '$ id is not a valid id'
    // }
    let myaftertestemail = email.split('@')
    myaftertestemail[0] = myaftertestemail[0].toLowerCase()
    let mynewemail = myaftertestemail[0]+'@'+myaftertestemail[1]
    
    const users1 = await users();
    const myusers = await users1.findOne({ email: mynewemail });
    if (myusers === null) throw 'No users with that email';
    let compareToMerlin = false
    compareToMerlin = await bcrypt.compare(password, myusers['password']);
    if (compareToMerlin === false){
        throw 'Either the username or password is invalid'
    }
    // console.log(rest['_id'].toString())
    myusers['_id'] = myusers['_id'].toString()
    //it will return the users information
    return myusers;
}

async function resetPassword(email, userName, password){
    if (typeof(userName) !== 'string'| typeof(email) !== 'string'| typeof(password) !== 'string'){
        throw '$ input is not string';
    }
    if (userName ==''|typeof userName == 'undefined' | userName === null | userName === NaN){
        throw '$ userName is empty';
    }
    if ( !userName){
        throw '$ you must supply the user userName'
    }
    if ( !email){
        throw '$ you must supply the email'
    }
    if ( !password){
        throw '$ you must supply the password'
    }
    if (userName.match(/^[ ]*$/)){
        throw '$ userName is spaces'
    }
    if (email ==''|typeof email == 'undefined' | email === null | email === NaN){
        throw '$ email is empty';
    }
    if (email.match(/^[ ]*$/)){
        throw '$email is spaces'
    }
    let net = email.split('')
    // if (net[0] !== 'h'|| net[1] !== 't' || net[2] !== 't' || net[3] !== 'p' || net[4] !== ':' || net[5] !== '/' || net[6] !== '/' || net[7] !== 'w' || net[8] !== 'w' || net[9] !== 'w' || net[10] !== '.')
    // throw '$ website is not right'
    if (net.indexOf('@') == -1){
        throw '$ email is not right1'
    }
    // console.log(net[net.length - 1])
    if (net[net.length - 1] !== 'm'|| net[net.length - 2] !== 'o' || net[net.length - 3] !== 'c' || net[net.length - 4] !== '.'){
        throw '$ email is not right2'
    }
    let mya = net.indexOf('@')
    if ((net.length-4) - (mya+1) < 4){
        throw '$ email is not right3'
    }
    let myusmail = email.split('@')
    if (myusmail[0].indexOf(' ')!== -1){
        throw '$ email name have spaces'
    }
    if ((/^[a-z0-9]+$/i).test(myusmail[0]) === false){
        throw '$ email name is not valid'
    }
    if (mya+1 < 5){
        throw '$ email is not right4'
    }
    // addrees check not ready


    if (password ==''|typeof password == 'undefined' | password === null | password === NaN){
        throw '$ password is empty';
    }
    if (password.match(/^[ ]*$/)){
        throw '$ password is spaces'
    }
    const users1 = await users();
    let myaftertestemail = email.split('@')
    myaftertestemail[0] = myaftertestemail[0].toLowerCase()
    let mynewemail = myaftertestemail[0]+'@'+myaftertestemail[1]
    const myuser = await getByUsers(mynewemail)
    let myreturn = {}
    if (userName === myuser['userName']){
        const hash = await bcrypt.hash(password,saltRounds)
        const resetpassword = {
            userName: myuser['userName'],
            phone: myuser['phone'],
            gender: myuser['gender'],
            email: myuser['email'],
            address: myuser['address'],
            password: hash,
            URL: myuser['URL'],
            ticket: myuser['ticket'],
            eventspost: myuser['eventspost'],
            likeevents: myuser['likeevents'],
        };
        const updatedInfo = await users1.updateOne(
            { email: mynewemail },
            { $set: resetpassword }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update password successfully (they are same)';
        }
        myreturn['reset'] = true
    }
    else{
        throw 'user Name or emaill is not true'
    }
    // it will return {reset = true}
    // if reset the password not succeed it will return throw 'user Name or email is not true'
    return myreturn
}

async function getByUsers(email){

    if (!email) throw 'You must provide an email to search for get';
    if (email ==''|typeof email == 'undefined' | email === null | email === NaN){
        throw '$ email is empty';
    }
    if (typeof email == 'string'){
        if (email.match(/^[ ]*$/)){
            throw '$email is spaces'
        }
    }
    let net = email.split('')
    // if (net[0] !== 'h'|| net[1] !== 't' || net[2] !== 't' || net[3] !== 'p' || net[4] !== ':' || net[5] !== '/' || net[6] !== '/' || net[7] !== 'w' || net[8] !== 'w' || net[9] !== 'w' || net[10] !== '.')
    // throw '$ website is not right'
    if (net.indexOf('@') == -1){
        throw '$ email is not right1'
    }
    // console.log(net[net.length - 1])
    if (net[net.length - 1] !== 'm'|| net[net.length - 2] !== 'o' || net[net.length - 3] !== 'c' || net[net.length - 4] !== '.'){
        throw '$ email is not right2'
    }
    let mya = net.indexOf('@')
    if ((net.length-4) - (mya+1)< 4){
        throw '$ email is not right3'
    }
    let myusmail = email.split('@')
    if (myusmail[0].indexOf(' ')!== -1){
        throw '$ email name have spaces'
    }
    if ((/^[a-z0-9]+$/i).test(myusmail[0]) === false){
        throw '$ email name is not valid'
    }
    if (mya+1 < 5){
        throw '$ email is not right4'
    }

    // if(ObjectId.isValid(id)===false){
    //     throw '$ id is not a valid id'
    // }
    let myaftertestemail = email.split('@')
    myaftertestemail[0] = myaftertestemail[0].toLowerCase()
    let mynewemail = myaftertestemail[0]+'@'+myaftertestemail[1]
    
    const users1 = await users();
    const myusers = await users1.findOne({ email: mynewemail });
    if (myusers === null) throw 'No users with that email';
    // console.log(rest['_id'].toString())
    myusers['_id'] = myusers['_id'].toString()

    //return users information
    return myusers;
}

async function addLikeevents(userId, eventsid){
    if (!userId) throw 'You must provide an id to search for get';
    if (userId ==''|typeof userId == 'undefined' | userId === null | userId === NaN){
        throw '$ id is empty';
    }
    if (typeof userId == 'string'){
        if (userId.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }
    if (!eventsid) throw 'You must provide an id to search for get';
    if (eventsid ==''|typeof eventsid == 'undefined' | eventsid === null | eventsid === NaN){
        throw '$ id is empty';
    }
    if (typeof eventsid == 'string'){
        if (eventsid.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }

    if(ObjectId.isValid(eventsid)===false){
        throw '$id is not a ObjectId'
    }
    
    const myuserId = myDBfunction(userId)
    const myeventId = myDBfunction(eventsid)
    const usersCollection = await users();
    let newlikeevents = {
        _id:ObjectId(),
        eventsid: myeventId,
        // reviewer: reviewer,
        // rating: rating,
        // dateOfReview: dateOfReview,
        // review: review
    };
    
    // if (revi === null) throw 'No restaurants with that id';
    // const reviid = revi['reviews']
    // const insertInfo = await restaurantsCollection.insertOne(newreviews);
    const liket1 = await usersCollection.findOne({ _id: myuserId, likeevents:{$elemMatch:{eventsid:myeventId}}});
    // console.log(liket1)
    if (liket1 !== null){
        throw '$ events already have'
    }
    const insertliketevents = await usersCollection.updateOne({ _id: myuserId }, { $addToSet: { likeevents: newlikeevents } })
    if (insertliketevents.insertedCount === 0) throw '$ Could not add new like events';
    const liket2 = await usersCollection.findOne({ _id: myuserId, likeevents:{$elemMatch:{eventsid:myeventId}}});
    console.log(liket2)
    let myreturn = {}
    if (liket2 === null){
        myreturn['addLikeEvents'] = false
    }
    else {
        myreturn['addLikeEvents'] = true
    }
    // if add like succeed it will return {addLikeEvents : true}
    // if add like not succeed it will return {addLikeEvents : false}
    return myreturn;

}

async function removeLikeEvents(userId, eventsid){

    if (!userId) throw 'You must provide an id to search for get';
    if (userId ==''|typeof userId == 'undefined' | userId === null | userId === NaN){
        throw '$ id is empty';
    }
    if (typeof userId == 'string'){
        if (userId.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }

    if (!eventsid) throw 'You must provide an id to search for get';
    if (eventsid ==''|typeof eventsid == 'undefined' | eventsid === null | eventsid === NaN){
        throw '$ id is empty';
    }
    if (typeof eventsid !== 'string'){
        throw 'the type of id input is not correct'
    }
    if (typeof eventsid == 'string'){
        if (eventsid.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }

    if(ObjectId.isValid(eventsid)===false){
        throw '$id is not a ObjectId'
    }
    
    const usersCollection = await users()
    let id1 = myDBfunction(eventsid)
    const myuserId = myDBfunction(userId)
    const myeventId = myDBfunction(eventsid)
    const removeLikeEvents = await usersCollection.findOne({ _id: myuserId, likeevents:{$elemMatch:{eventsid:myeventId}}});
    if (removeLikeEvents === null) throw 'No eventsid with that id';
    let myupid =removeLikeEvents['_id']
    let myoutput = removeLikeEvents['likeevents']
    let myreturn = []
    for (let i = 0; i < myoutput.length; i++){
        let myoutput1 = myoutput[i]
        // console.log(myoutput1['_id'])
        // console.log(id1)
        if (myoutput1['eventsid'].equals(id1) ){
                
        }
        else{
            myreturn.push(myoutput1)
        }
    }
    removeLikeEvents['likeevents'] = myreturn
    // console.log(removereview)
    const updateduserslikeevents = {
        userName: removeLikeEvents['userName'],
        phone: removeLikeEvents['phone'],
        gender: removeLikeEvents['gender'],
        email: removeLikeEvents['email'],
        address: removeLikeEvents['address'],
        password: removeLikeEvents['password'],
        URL: removeLikeEvents['URL'],
        ticket: removeLikeEvents['ticket'],
        eventspost: removeLikeEvents['eventspost'],
        likeevents: removeLikeEvents['likeevents'],
    };
    const updatenew = await usersCollection.updateOne({ _id: myuserId }, { $set: updateduserslikeevents })

    // console.log(myreturn)
    
    // const newuser = await usersCollection.findOne({ _id: myupid });
    // if (newuser === null) throw 'No users with that id';
    // const myuser = newuser['likeevents']
    
    const removeLikeEvents1 = await usersCollection.findOne({ _id: myuserId, likeevents:{$elemMatch:{eventsid:myeventId}}})
    let myreturn1 = {}
    if (removeLikeEvents1 === null){
        myreturn1['removeLikeEvents'] = true
    }
    else {
        myreturn1['removeLikeEvents'] = false
    }
    
    // revi['_id'] = revi['_id'].toString()
    // let myreturn1 = revi['reviews']
    // Object.keys(myreturn1).forEach(function(key){
    //     myreturn1[key]['_id'] = myreturn1[key]['_id'].toString()
    // })
    // if remove like succeed it will return {addLikeEvents : true}
    // if remove like not succeed it will return {addLikeEvents : false}
    return myreturn1;
}

async function addTicketEvents(userId, ticketeventsid, eventTitle,eventStartTime,eventEndtime,eventdescription){
    if (!userId) throw 'You must provide an id to search for get';
    if (userId ==''|typeof userId == 'undefined' | userId === null | userId === NaN){
        throw '$ id is empty';
    }
    if (typeof userId == 'string'){
        if (userId.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }
    if(ObjectId.isValid(userId)===false){
        throw '$id is not a valid ObjectId'
    }
    if (!ticketeventsid) throw 'You must provide an id to search for get';
    if (ticketeventsid ==''|typeof ticketeventsid == 'undefined' | ticketeventsid === null | ticketeventsid === NaN){
        throw '$ id is empty';
    }
    if (typeof ticketeventsid == 'string'){
        if (ticketeventsid.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }

    if(ObjectId.isValid(ticketeventsid)===false){
        throw '$id is not a valid ObjectId'
    }
    if (!eventTitle) throw 'You must provide an eventTitle to search for get';
    if (!eventStartTime) throw 'You must provide an eventStartTime to search for get';
    if (!eventEndtime) throw 'You must provide an eventEndtime to search for get';
    if (!eventdescription) throw 'You must provide an eventdescription to search for get';
    if (eventTitle ==''|typeof eventTitle == 'undefined' | eventTitle === null | eventTitle === NaN){
        throw '$ eventTitle is empty';
    }
    if (typeof eventTitle != 'string'){
        throw '$ event Title is not string'
    }
    if (typeof eventTitle == 'string'){
        if (eventTitle.match(/^[ ]*$/)){
            throw '$eventTitle is spaces'
        }
    }
    if (eventStartTime ==''|typeof eventStartTime == 'undefined' | eventStartTime === null | eventStartTime === NaN){
        throw '$ event Start Time is empty';
    }
    if (eventEndtime ==''|typeof eventEndtime == 'undefined' | eventEndtime === null | eventEndtime === NaN){
        throw '$ event End time is empty';
    }
    if (!Array.isArray(eventStartTime)) {
        throw "event Start Time is Not an Array";
    } else if (eventStartTime.length == 0) {
        throw "event Start Time is empty";
    } else {
        if (
            typeof eventStartTime[0] != "string" ||
            eventStartTime[0].trim().length == 0 ||
            !eventStartTime[0].match(validDate)
        ) {
            throw " In event Start Time you must enter in MM/DD/YY format";
        }
        if (
            typeof eventStartTime[1] != "string" ||
            eventStartTime[1].trim().length == 0 ||
            !eventStartTime[1].match(validTime)
        ) {
            throw " In event Start Time you must enter in HH/MM format";
        }
    }
    let mystart = new Date(eventStartTime[0] + ' ' + eventStartTime[1])
    if (myDate > mystart){
        throw '$ start time must after now'
    }

    if (!Array.isArray(eventEndtime)) {
        throw "event End time is Not an Array";
    } else if (eventEndtime.length == 0) {
        throw "event End time is Empty";
    } else {
        if (
            typeof eventEndtime[0] != "string" ||
            eventEndtime[0].trim().length == 0 ||
            !eventEndtime[0].match(validDate)
        ) {
            throw " In event End time you must enter in MM/DD/YY format";
        }
        if (
            typeof eventEndtime[1] != "string" ||
            eventEndtime[1].trim().length == 0 ||
            !eventEndtime[1].match(validTime)
        ) {
            throw " In event End time you must enter in HH/MM format";
        }
    }
    let myend = new Date(eventEndtime[0] + ' ' + eventEndtime[1])
    if (mystart > myend){
        throw '$ end time must after start time and now'
    }

    if (eventdescription ==''|typeof eventdescription == 'undefined' | eventdescription === null | eventdescription === NaN){
        throw '$ event description is empty';
    }
    if (typeof eventdescription != 'string'){
        throw '$ event description Title is not string'
    }
    if (typeof eventdescription == 'string'){
        if (eventdescription.match(/^[ ]*$/)){
            throw '$event description is spaces'
        }
    }
    
    const myuserId = myDBfunction(userId)
    const myeventId = myDBfunction(ticketeventsid)
    const usersCollection = await users();
    let newTicket = {
        eventsid: myeventId,
        eventTitle: eventTitle,
        eventStartTime: eventStartTime,
        eventEndtime: eventEndtime,
        eventdescription: eventdescription
    };
    
    // if (revi === null) throw 'No restaurants with that id';
    // const reviid = revi['reviews']
    // const insertInfo = await restaurantsCollection.insertOne(newreviews);
    const ticket1 = await usersCollection.findOne({ _id: myuserId, ticket:{$elemMatch:{eventsid:myeventId}}});
    // console.log(liket1)
    if (ticket1 !== null){
        throw '$ events already have'
    }
    const ticket2 = await usersCollection.findOne({ _id: myuserId});
    if (ticket2 == null){
        throw '$ not have same id users'
    }
    let userpostlist = ticket2['eventspost']
    let userticketlist = ticket2['ticket']
    // let myaddpoststime = eventStartTime[0] + ' ' + eventStartTime[1]
    // let myaddpostetime = eventEndTime[0] + ' ' + eventEndTime[1]

    for(let b = 0 ; b <userticketlist.length; b++){
        let myticket = userticketlist[b]
        let myticketstime = new Date(myticket['eventStartTime'][0] + ' ' + myticket['eventStartTime'][1])
        let myticketetime = new Date(myticket['eventEndtime'][0] + ' ' + myticket['eventEndtime'][1])
        if (myticketstime <= mystart &&  mystart <= myticketetime || myticketstime <= myend  && myend <= myticketetime){
            let mythrow = myticket['eventTitle'] + ' have same time zone'
            throw mythrow
        }
    }

    for(let i = 0 ; i <userpostlist.length; i++){
        let mypost = userpostlist[i]

        let mypoststime = new Date(mypost['eventStartTime'][0] + ' ' + mypost['eventStartTime'][1])
        let mypostetime = new Date(mypost['eventEndtime'][0] + ' ' + mypost['eventEndtime'][1])
        if (mypoststime <= mystart &&  mystart <= mypostetime || mypoststime <= myend  && myend <= mypostetime){
            let mythrow = mypost['eventTitle'] + ' have same time zone'
            throw mythrow
        }
    }
    
    const insertliketevents = await usersCollection.updateOne({ _id: myuserId }, { $addToSet: { ticket: newTicket } })
    if (insertliketevents.insertedCount === 0) throw '$ Could not add new like events';
    const ticket3 = await usersCollection.findOne({ _id: myuserId, ticket:{$elemMatch:{eventsid:myeventId}}});
    // console.log(liket2)
    let myreturn = {}
    if (ticket3 === null){
        myreturn['addTicketEvents'] = false
    }
    else {
        myreturn['addTicketEvents'] = true
    }
    // if add ticket succeed it will return {addLikeEvents : true}
    // if add ticket not succeed it will return {addLikeEvents : false}
    return myreturn;

}

async function removeTicketEvents(userId, ticketeventsid){

    if (!userId) throw 'You must provide an id to search for get';
    if (userId ==''|typeof userId == 'undefined' | userId === null | userId === NaN){
        throw '$ id is empty';
    }
    if (typeof userId == 'string'){
        if (userId.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }

    if (!ticketeventsid) throw 'You must provide an id to search for get';
    if (ticketeventsid ==''|typeof ticketeventsid == 'undefined' | ticketeventsid === null | ticketeventsid === NaN){
        throw '$ id is empty';
    }
    if (typeof ticketeventsid !== 'string'){
        throw 'the type of id input is not correct'
    }
    if (typeof ticketeventsid == 'string'){
        if (ticketeventsid.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }

    if(ObjectId.isValid(ticketeventsid)===false){
        throw '$id is not a ObjectId'
    }
    
    const usersCollection = await users()
    const myuserId = myDBfunction(userId)
    const myeventId = myDBfunction(ticketeventsid)
    const removeLikeEvents = await usersCollection.findOne({ _id: myuserId, ticket:{$elemMatch:{eventsid:myeventId}}});
    if (removeLikeEvents === null) throw 'No eventsid with that id';
    let myupid =removeLikeEvents['_id']
    let myoutput = removeLikeEvents['ticket']
    let myreturn = []
    for (let i = 0; i < myoutput.length; i++){
        let myoutput1 = myoutput[i]
        // console.log(myoutput1['_id'])
        // console.log(id1)
        if (myoutput1['eventsid'].equals(myeventId) ){
                
        }
        else{
            myreturn.push(myoutput1)
        }
    }
    removeLikeEvents['ticket'] = myreturn
    // console.log(removereview)
    const updatedusersticketevents = {
        userName: removeLikeEvents['userName'],
        phone: removeLikeEvents['phone'],
        gender: removeLikeEvents['gender'],
        email: removeLikeEvents['email'],
        address: removeLikeEvents['address'],
        password: removeLikeEvents['password'],
        URL: removeLikeEvents['URL'],
        ticket: removeLikeEvents['ticket'],
        eventspost: removeLikeEvents['eventspost'],
        likeevents: removeLikeEvents['likeevents'],
    };
    const updatenew = await usersCollection.updateOne({ _id: myuserId }, { $set: updatedusersticketevents })

    // console.log(myreturn)
    
    // const newuser = await usersCollection.findOne({ _id: myupid });
    // if (newuser === null) throw 'No users with that id';
    // const myuser = newuser['likeevents']
    
    const removeLikeEvents1 = await usersCollection.findOne({ _id: myuserId, ticket:{$elemMatch:{eventsid:myeventId}}})
    let myreturn1 = {}
    if (removeLikeEvents1 === null){
        myreturn1['removeTicketEvents'] = true
    }
    else {
        myreturn1['removeTicketEvents'] = false
    }
    
    // revi['_id'] = revi['_id'].toString()
    // let myreturn1 = revi['reviews']
    // Object.keys(myreturn1).forEach(function(key){
    //     myreturn1[key]['_id'] = myreturn1[key]['_id'].toString()
    // })
    // if remove ticket succeed it will return {addLikeEvents : true}
    // if remove ticket not succeed it will return {addLikeEvents : false}
    return myreturn1;
}


async function addPostEvents(userId, eventsid, eventTitle,eventStartTime,eventEndtime,eventdescription ){
    if (!userId) throw 'You must provide an id to search for get';
    if (userId ==''|typeof userId == 'undefined' | userId === null | userId === NaN){
        throw '$ id is empty';
    }
    if (typeof userId == 'string'){
        if (userId.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }
    if(ObjectId.isValid(userId)===false){
        throw '$id is not a valid ObjectId'
    }
    if (!eventsid) throw 'You must provide an id to search for get';
    if (eventsid ==''|typeof eventsid == 'undefined' | eventsid === null | eventsid === NaN){
        throw '$ id is empty';
    }
    if (typeof eventsid == 'string'){
        if (eventsid.match(/^[ ]*$/)){
            throw '$ id is spaces'
        }
    }

    if(ObjectId.isValid(eventsid)===false){
        throw '$ id is not a ObjectId'
    }
    if (!eventTitle) throw 'You must provide an eventTitle to search for get';
    if (!eventStartTime) throw 'You must provide an eventStartTime to search for get';
    if (!eventEndtime) throw 'You must provide an eventEndtime to search for get';
    if (!eventdescription) throw 'You must provide an eventdescription to search for get';
    if (eventTitle ==''|typeof eventTitle == 'undefined' | eventTitle === null | eventTitle === NaN){
        throw '$ eventTitle is empty';
    }
    if (typeof eventTitle != 'string'){
        throw '$ event Title is not string'
    }
    if (typeof eventTitle == 'string'){
        if (eventTitle.match(/^[ ]*$/)){
            throw '$eventTitle is spaces'
        }
    }
    if (eventStartTime ==''|typeof eventStartTime == 'undefined' | eventStartTime === null | eventStartTime === NaN){
        throw '$ event Start Time is empty';
    }
    if (eventEndtime ==''|typeof eventEndtime == 'undefined' | eventEndtime === null | eventEndtime === NaN){
        throw '$ event End time is empty';
    }
    if (!Array.isArray(eventStartTime)) {
        throw "event Start Time is Not an Array";
    } else if (eventStartTime.length == 0) {
        throw "event Start Time is empty";
    } else {
        if (
            typeof eventStartTime[0] != "string" ||
            eventStartTime[0].trim().length == 0 ||
            !eventStartTime[0].match(validDate)
        ) {
            throw " In event Start Time you must enter in MM/DD/YY format";
        }
        if (
            typeof eventStartTime[1] != "string" ||
            eventStartTime[1].trim().length == 0 ||
            !eventStartTime[1].match(validTime)
        ) {
            throw " In event Start Time you must enter in HH/MM format";
        }
    }
    let mystart = new Date(eventStartTime[0] + ' ' + eventStartTime[1])
    if (myDate > mystart){
        throw '$ start time must after now'
    }

    if (!Array.isArray(eventEndtime)) {
        throw "event End time is Not an Array";
    } else if (eventEndtime.length == 0) {
        throw "event End time is Empty";
    } else {
        if (
            typeof eventEndtime[0] != "string" ||
            eventEndtime[0].trim().length == 0 ||
            !eventEndtime[0].match(validDate)
        ) {
            throw " In event End time you must enter in MM/DD/YY format";
        }
        if (
            typeof eventEndtime[1] != "string" ||
            eventEndtime[1].trim().length == 0 ||
            !eventEndtime[1].match(validTime)
        ) {
            throw " In event End time you must enter in HH/MM format";
        }
    }
    let myend = new Date(eventEndtime[0] + ' ' + eventEndtime[1])
    if (mystart > myend){
        throw '$ end time must after start time and now'
    }

    if (eventdescription ==''|typeof eventdescription == 'undefined' | eventdescription === null | eventdescription === NaN){
        throw '$ event description is empty';
    }
    if (typeof eventdescription != 'string'){
        throw '$ event description Title is not string'
    }
    if (typeof eventdescription == 'string'){
        if (eventdescription.match(/^[ ]*$/)){
            throw '$event description is spaces'
        }
    }
    
    const myuserId = myDBfunction(userId)
    const myeventId = myDBfunction(eventsid)
    const usersCollection = await users();

    let newpostevents = {
        eventsid: myeventId,
        eventTitle: eventTitle,
        eventStartTime: eventStartTime,
        eventEndtime: eventEndtime,
        eventdescription: eventdescription
    };
    
    // if (revi === null) throw 'No restaurants with that id';
    // const reviid = revi['reviews']
    // const insertInfo = await restaurantsCollection.insertOne(newreviews);
    const post1 = await usersCollection.findOne({ _id: myuserId, eventspost:{$elemMatch:{eventsid:myeventId}}});
    // console.log(liket1)
    if (post1 !== null){
        throw '$ events already have'
    }
    const post2 = await usersCollection.findOne({ _id: myuserId});
    if (post2 == null){
        throw '$ not have same id users'
    }
    let userpostlist = post2['eventspost']
    let userticketlist = post2['ticket']
    // let myaddpoststime = eventStartTime[0] + ' ' + eventStartTime[1]
    // let myaddpostetime = eventEndTime[0] + ' ' + eventEndTime[1]
    
    for(let i = 0 ; i <userpostlist.length; i++){
        let mypost = userpostlist[i]

        let mypoststime = new Date(mypost['eventStartTime'][0] + ' ' + mypost['eventStartTime'][1])
        let mypostetime = new Date(mypost['eventEndtime'][0] + ' ' + mypost['eventEndtime'][1])
        if (mypoststime <= mystart &&  mystart <= mypostetime || mypoststime <= myend  && myend <= mypostetime){
            let mythrow = mypost['eventTitle'] + ' have same time zone'
            throw mythrow
        }
    }
    for(let b = 0 ; b <userticketlist.length; b++){
        let myticket = userticketlist[b]
        let myticketstime = new Date(myticket['eventStartTime'][0] + ' ' + myticket['eventStartTime'][1])
        let myticketetime = new Date(myticket['eventEndtime'][0] + ' ' + myticket['eventEndtime'][1])
        if (myticketstime <= mystart &&  mystart <= myticketetime || myticketstime <= myend  && myend <= myticketetime){
            let mythrow = myticket['eventTitle'] + ' have same time zone'
            throw mythrow
        }
    }
    const insertliketevents = await usersCollection.updateOne({ _id: myuserId }, { $addToSet: { eventspost: newpostevents } })
    if (insertliketevents.insertedCount === 0) throw '$ Could not add new post events';
    const post3 = await usersCollection.findOne({ _id: myuserId, eventspost:{$elemMatch:{eventsid:myeventId}}});
    // console.log(liket2)
    let myreturn = {}
    if (post3 === null){
        myreturn['addPostEvents'] = false
    }
    else {
        myreturn['addPostEvents'] = true
    }
    // if add Post succeed it will return {addLikeEvents : true}
    // if add Post not succeed it will return {addLikeEvents : false}
    return myreturn;

}

async function removePostEvents(userId, eventsid){

    if (!userId) throw 'You must provide an id to search for get';
    if (userId ==''|typeof userId == 'undefined' | userId === null | userId === NaN){
        throw '$ id is empty';
    }
    if (typeof userId == 'string'){
        if (userId.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }

    if (!eventsid) throw 'You must provide an id to search for get';
    if (eventsid ==''|typeof eventsid == 'undefined' | eventsid === null | eventsid === NaN){
        throw '$ id is empty';
    }
    if (typeof eventsid !== 'string'){
        throw 'the type of id input is not correct'
    }
    if (typeof eventsid == 'string'){
        if (eventsid.match(/^[ ]*$/)){
            throw '$id is spaces'
        }
    }

    if(ObjectId.isValid(eventsid)===false){
        throw '$id is not a ObjectId'
    }
    
    const usersCollection = await users()
    const myuserId = myDBfunction(userId)
    const myeventId = myDBfunction(eventsid)
    const removeLikeEvents = await usersCollection.findOne({ _id: myuserId, eventspost:{$elemMatch:{eventsid:myeventId}}});
    if (removeLikeEvents === null) throw 'No eventsid with that id';
    let myupid =removeLikeEvents['_id']
    let myoutput = removeLikeEvents['eventspost']
    let myreturn = []
    for (let i = 0; i < myoutput.length; i++){
        let myoutput1 = myoutput[i]
        // console.log(myoutput1['_id'])
        // console.log(id1)
        if (myoutput1['eventsid'].equals(myeventId) ){
                
        }
        else{
            myreturn.push(myoutput1)
        }
    }
    removeLikeEvents['eventspost'] = myreturn
    // console.log(removereview)
    const updatedusersPostevents = {
        userName: removeLikeEvents['userName'],
        phone: removeLikeEvents['phone'],
        gender: removeLikeEvents['gender'],
        email: removeLikeEvents['email'],
        address: removeLikeEvents['address'],
        password: removeLikeEvents['password'],
        URL: removeLikeEvents['URL'],
        ticket: removeLikeEvents['ticket'],
        eventspost: removeLikeEvents['eventspost'],
        likeevents: removeLikeEvents['likeevents'],
    };
    const updatenew = await usersCollection.updateOne({ _id: myuserId }, { $set: updatedusersPostevents })

    // console.log(myreturn)
    
    // const newuser = await usersCollection.findOne({ _id: myupid });
    // if (newuser === null) throw 'No users with that id';
    // const myuser = newuser['likeevents']
    
    const removePostEvents1 = await usersCollection.findOne({ _id: myuserId, eventspost:{$elemMatch:{eventsid:myeventId}}})
    let myreturn1 = {}
    if (removePostEvents1 === null){
        myreturn1['removePostEvents'] = true
    }
    else {
        myreturn1['removePostEvents'] = false
    }
    
    // revi['_id'] = revi['_id'].toString()
    // let myreturn1 = revi['reviews']
    // Object.keys(myreturn1).forEach(function(key){
    //     myreturn1[key]['_id'] = myreturn1[key]['_id'].toString()
    // })
    // if remove Post succeed it will return {addLikeEvents : true}
    // if remove Post not succeed it will return {addLikeEvents : false}
    return myreturn1;
}



// let my = checkUsers('tony153265964@gmail.com','123456')
// async function test(){
//     let mycreate = await createUser('BingzhenLi','319-429-5274','male','tOny1532659612341@gmail.com','333 rever st','123456') 
//     console.log(mycreate)
//     // const usersCollection = await users()
//     // const myeventId = myDBfunction('619bdfc0fa1fa9ca424f09a3')
//     // const myuserId1 = myDBfunction('619bdfc0fa1fa9ca424f09c9')
//     // const liket1 = await usersCollection.findOne({ _id: myuserId1, ticket:{$elemMatch:{eventsid:myeventId}}});
//     // const restetpass = await resetPassword('tony1532659641@gmail.com','Bingzhen1Li','123123123')
//     // let myaddlike = await addLikeevents('619bdfc0fa1fa9ca424f09c9', '619bdfc0fa1fa9ca424f09a3')
//     // let myaddlike = await addTicketEvents('61a3fc0ad42e251d4413dab5', '619bdfc0fa1fa9ca424f09a1','christmasParty2k21',["12/14/2021", "09:00"],["12/14/2021", "11:00"], 'asdfasdfasdf')
//     // let myaddlike = await addPostEvents('61a3fc0ad42e251d4413dab5', '619bdfc0fa1fa9ca424f09a9','christmasParty2k21',["12/12/2021", "09:00"],["12/12/2021", "11:00"], 'asdfasdfasdf')
//     // let myaddlike = await removeLikeEvents('619bdfc0fa1fa9ca424f09c9', '619bdfc0fa1fa9ca424f09c1')
//     // let myaddlike = await removeTicketEvents('61a3fc0ad42e251d4413dab5', '619bdfc0fa1fa9ca424f09a1')
//     // let myaddlike = await removePostEvents('61a3fc0ad42e251d4413dab5', '619bdfc0fa1fa9ca424f09a4')
//     // _id: '619bdfc0fa1fa9ca424f09c9', 
//     // console.log(liket1)
//     // console.log(restetpass)
//     // console.log(myaddlike)
//     // console.log(myaddlike)
// }
// test()

module.exports = {
    createUser,
    getAll,
    checkUsers,
    resetPassword,
    getByUsers,
    addLikeevents,
    removeLikeEvents,
    addTicketEvents,
    removeTicketEvents,
    addPostEvents,
    removePostEvents,
};
