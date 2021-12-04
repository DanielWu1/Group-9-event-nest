const express = require("express");
//const { getAll } = require("../data");
const router = express.Router();
const usersdata = require('../data/users'); 
const eventsdata = require('../data/events')

        

// 1. to get user login page
router.get("/", async(req,res) =>{
    try{
        res.redirect("/userlogin");
        return;
    } catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 

// 2. to get the user sigup page
router.get("/usersignup", async(req,res) =>{
    try{
        res.render("usersignup/usersignup");
        return;
    }
    catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 

// 3. create the USER @ usersignup
router.post("/usersignup", async(req,res) => {
    let createUserPost = req.body; 

    // ----- validations
    if(!createUserPost) {
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input request not found"});
        return;
    }
    if(!createUserPost.username|| createUserPost.username  === NaN){
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input username not found"});
        return;
    }
    if(!createUserPost.email || createUserPost.email  === NaN){
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input email not found"});
        return;
    }
    if(!createUserPost.password || createUserPost.password  === NaN){
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input password not found"});
        return;
    }

    // ----- check for string validations
    // check username
    if(typeof createUserPost.username !== "string") {
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input username must be a string!"});
        return;
    }
    if(typeof createUserPost.username === "string" && reateUserPost.username.trim() === "") {
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input username must be a string!"});
        return;
    }
    // checking for email validations
    if (isEmail(createUserPost.email) === false){ 
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input email is not valid"});
        return;
    }
    // chekcing for password
    if (isPassword(createUserPost.password) === false){ 
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input password has to be 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"});
        return;
    }
    // check address
     if(typeof createUserPost.address !== "string") {
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input address must be a string!"});
        return;
    }
    if(typeof createUserPost.address === "string" && reateUserPost.address.trim() === "") {
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input address must be a string!"});
        return;
    }
    // check gender
     if(typeof createUserPost.gender !== "string") {
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input gender must be a string!"});
        return;
    }
    if(typeof createUserPost.gender === "string" && reateUserPost.gender.trim() === "") {
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input gender must be a string!"});
        return;
    }

    // check if the phone number is of length 10 is all digits 
    // TODO: CEHCK FOR -
        if( (createUserPost.phone.length === 10) && (/^\d+\.\d+$/.test(createUserPost.phone))) {
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input phone must be only digits of length 10!"});
        return;
    }

    try { 
    
    const signupcreate = await usersdata.createUser( 
        createUserPost.username, 
        createUserPost.phone, 
        createUserPost.gender, 
        createUserPost.email, 
        createUserPost.address, 
        createUserPost.password
        ); 
        res.status(200).json({message:"User has been created successfully!"}).redirect('/userlogin');
        return;
    } catch(e) {
        console.log(e)
        res.render('usersignup/usersignup', { error: e });
        return;
    }
});

// 4. user login page 
router.post("/userlogin", async(req,res) => {
 
    let userLoginPostData = req.body; 

    // checking for email validations
    if (isEmail(userLoginPostData.email) === false){ 
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input email is not valid"});
        return;
    }
    // chekcing for password
    if (isPassword(userLoginPostData.password) === false){ 
        res.status(400).render('usersignup/usersignup', { error: e, message:"Input password has to be 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"});
        return;
    }

    try {
        const logininfo = await usersdata.checkUsers(
            userLoginPostData.email, 
            userLoginPostData.password); 
        
        req.session.userId = logininfo['_id']
        req.session.email = logininfo['email']
        req.session.userName = logininfo['userName']
        res.status(200).render("/userhomepage", logininfo);
        return;
    } catch(e) {   
        console.log(e);
        res.status(500).render('userlogin/userlogin', {error:e});
        return;
    }
}); 

// 5. to get the homepage data -- all events are rendered
router.get("/userhomepage", async(req,res) =>{ 
    try{ 
        const displayevent = await usersdata.getAllEvents();
        res.status(200).render(displayevent);
        return;
    } catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 


// TODO: EVENTS ROUTES
// 6. to get the events created by self i.e // FOR: MY CREATED EVENTS 
router.get("/bookedevents", async(req,res) =>{
    try{
        res.render("bookedevents/bookedevents");
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
}); 

// TODO: EVENTS ROUTES // CHECK FOR AJAX? -- IF YES, ONLY DO getAllEVents()
// 7. to get the events by FILTER/ CATEGORY
router.post("/events/:id/like", async (req, res) => {
    console.log(req.params.id);
    console.log(req.session.userId)
    const updateLikes = await data1.recordLike(req.params.id, req.session.userId);
    if (updateLikes === true) {
        res.status(200).json({ likeAdded: true });
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



// TODO: EVENTS ROUTES 
// to get the page for creating a new event
router.get("/create-event", async(req,res) =>{
    try{

        res.render("create-event/create-event");
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
});    
// to POST a new event
router.post("/create-event", async(req,res) => {
    let postevent = req.body; 

    try
{ 
    
    const createevent = await data1.createEvent( 
        postevent.title,
        postevent.category, 
        postevent.creator,
        postevent.date,
        postevent.timestart,
        postevent.endtime,
        postevent.address,
        postevent.city,
        postevent.state,
        postevent.ticketcapacity,
        postevent.price,
        postevent.description,
        ); 
         
        
        res.redirect('/eventshomepage') 
        return;
}
    catch(e)
    {
        console.log(e)
        res.render('create-event/create-event', { error: e });
        return;
    }
}); 

 



// ask cherry? 
router.get("/private", async(req,res) =>{
    try {
        
        res.render("private/private", { username: req.session.username});
        return;
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message : e});
        return;
    }
});

// 
router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render("logout/logout")
  });

// ---------------------
// validation functions
// ---------------------
// check for email
function isEmail(inputEmail) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (inputEmail.match(re)){
        return true;
    } else {
        return false;
    }
}
// check for password
function isPassword(inputtxt) { 
    var passre = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(inputtxt.value.match(passre)) { 
        return true;
    } else { 
        return false;
    }
}

module.exports = router;