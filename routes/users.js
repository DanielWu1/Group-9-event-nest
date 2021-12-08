const express = require("express");
//const { getAll } = require("../data");
const router = express.Router();
const data = require('../data/users'); 
const data1 = require('../data/events')

        


router.get("/", async(req,res) =>{
    try{
        res.redirect("/userlogin");
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
}); 

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

router.post("/usersignup", async(req,res) => {
    let signpost = req.body; 
    if(!signpost) {
        res.status(400).render('usersignup/usersignup', { error:"Input request not found"});
        return;
    }
    if(!signpost.username|| signpost.username  === NaN){
        res.status(400).render('usersignup/usersignup', { error:"Input username not found"});
        return;
    }
    if(!signpost.email || signpost.email  === NaN){
        res.status(400).render('usersignup/usersignup', { error:"Input email not found"});
        return;
    }
    if(!signpost.password || signpost.password  === NaN){
        res.status(400).render('usersignup/usersignup', { error:"Input password not found"});
        return;
    }

    // ----- check for string validations
    // check username
    if(typeof signpost.username !== "string") {
        res.status(400).render('usersignup/usersignup', { error:"Input username must be a string!"});
        return;
    }
    if(typeof signpost.username === "string" && signpost.username.trim() === "") {
        res.status(400).render('usersignup/usersignup', { error:"Input username must be a string!"});
        return;
    }
    // checking for email validations
    if (isEmail(signpost.email) === false){ 
        res.status(400).render('usersignup/usersignup', { error:"Input email is not valid"});
        return;
    }
    // chekcing for password
    if (isPassword(signpost.password) === false){ 
        res.status(400).render('usersignup/usersignup', { error:"Input password has to be 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"});
        return;
    }
    // check address
     if(typeof signpost.address !== "string") {
        res.status(400).render('usersignup/usersignup', { error:"Input address must be a string!"});
        return;
    }
    if(typeof signpost.address === "string" && signpost.address.trim() === "") {
        res.status(400).render('usersignup/usersignup', { error:"Input address must be a string!"});
        return;
    }
    // check gender
     if(typeof signpost.gender !== "string") {
        res.status(400).render('usersignup/usersignup', { error:"Input gender must be a string!"});
        return;
    }
    if(typeof signpost.gender === "string" && signpost.gender.trim() === "") {
        res.status(400).render('usersignup/usersignup', { error:"Input gender must be a string!"});
        return;
    }
    let mypho1 = signpost.phone.split('')
    if (mypho1[3] !== '-' || mypho1[7] !== '-'){
        res.status(400).render('usersignup/usersignup', { error:"phone input is wrong2!"});
        return;
    }
    let mypho = signpost.phone.split('-')
    if (mypho[0].length !== 3 || mypho[1].length !== 3 || mypho[2].length !== 4){
        res.status(400).render('usersignup/usersignup', { error:"phone input is wrong1!"});
        return;
    }
    if (mypho.length != 3){
        res.status(400).render('usersignup/usersignup', { error:"phone input is wrong3!"});
        return;
    }
    let n = Number(mypho[0])
    let n2 = Number(mypho[1])
    let n3 = Number(mypho[2])
    if (isNaN(n) || isNaN(n2) || isNaN(n3)){
        res.status(400).render('usersignup/usersignup', { error:"phone input is not a number!"});
        return;
    }
    try{ 
    console.log(signpost.gender)
    const signupcreate = await data.createUser( 
        signpost.username, 
        signpost.phone, 
        signpost.gender, 
        signpost.email, 
        signpost.address, 
        signpost.password, 
        ); 
         
        
        res.redirect('/userlogin') 
        return;
}
    catch(e)
    {
        console.log(e)
        res.render('usersignup/usersignup', { error: e });
        return;
    }
});

router.get("/userlogin", async(req,res) =>{
    try{
        res.render("userlogin/userlogin");
        return;
}
    
    catch(e){
     
        res.status(500).json({message : e});
        return;
    }
}); 

router.post("/userlogin", async(req,res) => {
 
    let login = req.body; 
    if (isEmail(login.email) === false){ 
        res.status(400).render('usersignup/usersignup', { error: "Input email is not valid"});
        return;
    }
    // chekcing for password
    if (isPassword(login.password) === false){ 
        res.status(400).render('usersignup/usersignup', { error: "Input password has to be 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"});
        return;
    }

    try {
        // console.log(login.email)
        const logininfo = await data.checkUsers( 
            login.email, 
            login.password);
        
        req.session.userId = logininfo['_id']
        req.session.email = logininfo['email']
        req.session.userName = logininfo['userName']
        res.redirect("/userhomepage");
        return;
    }
    catch(e)
    {   //console.log(e);
        res.render('userlogin/userlogin', {error:e});
        return;
    }
}); 

router.get("/userhomepage", async(req,res) =>{ 


    try{ 
        const displayevent1 = await data.getByUsers(req.session.email)
        const displayevent = await data1.getAllEvents() 
        let result = [];
        for (const event of displayevent) {
                event['likeCount'] = event.likeList.length;
                event['interestedCount'] = event.interestedList ? event.interestedList.length : 0; 
                event['going'] = event.going ? event.going.length : 0;
            result.push(event);
        }
        
        res.render("userhomepage/userhomepage",{allevents:result, username: req.session.userName});
        return;
}
    
    catch(e){
        console.log(e);
        res.status(500).json({message : e});
        return;
    }
}); 




// router.get("/bookedevents", async(req,res) =>{
//     try{
//         res.render("bookedevents/bookedevents");
//         return;
// }
    
//     catch(e){
     
//         res.status(500).json({message : e});
//         return;
//     }
// }); 

router.post("/events/:id/like", async (req, res) => {
    console.log(req.params.id);
    console.log(req.session.userId)
    const updateLikes = await data1.recordLike(req.params.id, req.session.userId);
    res.status(200).json({ likeAdded: updateLikes });
    return;
})

router.post("/events/:id/interested", async (req, res) => {
    console.log(req.params.id);
    console.log(req.session.userId)
    const updateInterested = await data1.recordInterested(req.params.id, req.session.userId);
    res.status(200).json({ interestedAdded: updateInterested });
    return;
}) 

router.post("/events/:id/going", async (req, res) => {
    console.log(req.params.id);
    console.log(req.session.userId)
    const updateGoing = await data1.recordGoing(req.params.id, req.session.userId);
    res.status(200).json({ goingAdded: updateGoing });
    return;
})

// router.get("/likedevents", async(req,res) =>{
//     try{
//         res.render("likedevents/likedevents");
//         return;
// }
    
//     catch(e){
     
//         res.status(500).json({message : e});
//         return;
//     }
// }); 


// router.get("/userhomepage", async(req,res) =>{ 


//     try{ 
//         const displayevent1 = await data.getByUsers(req.session.email)
//         const displayevent = await data1.getAllEvents() 
//         let result = [];
//         for (const event of displayevent) {
//             if (event.likeList.includes(req.session.userId)) {
//                 event['likedByThisUser'] = true;
//             }
//             result.push(event);
//         }
        
//         res.render("userhomepage/userhomepage",{allevents:displayevent, username: req.session.userName});
//         return;
// }
    
//     catch(e){
     
//         res.status(500).json({message : e});
//         return;
//     }
// }); 


// router.get("/userhomepage", async(req,res) =>{ 


//     try{ 
//         const displayevent1 = await data.getByUsers(req.session.email)
//         const displayevent = await data1.getAllEvents() 
        
        
//         res.render("userhomepage/userhomepage",{allevents:displayevent, username: req.session.userName});
//         return;
// }
    
//     catch(e){
     
//         res.status(500).json({message : e});
//         return;
//     }
// }); 



// router.get("/eventshomepage", async(req,res) =>{ 


//     try{  
//         const displayevent = await data1.getAllEvents() 
//         console.log(displayevent);
//         let result = [];
//         for (const event of displayevent) {
//             if (event.likeList.includes(req.session.userId)) {
//                 event['likedByThisUser'] = true;
//             }
//             result.push(event);
//         }
//         res.render("eventshomepage/eventshomepage",{allevents:result, username: req.session.userName});
//         return;
// }
    
//     catch(e){
//         console.log(e);
//         res.status(500).json({message : e});
//         return;
//     }
// }); 



// router.get("/create-event", async(req,res) =>{
//     try{

//         res.render("create-event/create-event");
//         return;
// }
    
//     catch(e){
     
//         res.status(500).json({message : e});
//         return;
//     }
// });    





// router.post("/create-event", async(req,res) => {
//     let postevent = req.body; 
//     console.log(postevent)
//     try
// { 
    
//     const createevent = await data1.createEvent( 
        
//         postevent.title,
//         postevent.category, 
//         postevent.creator,
//         postevent.date,
//         postevent.timestart,
//         postevent.endtime,
//         postevent.address,
//         postevent.city,
//         postevent.state,
//         postevent.ticketcapacity,
//         postevent.price,
//         postevent.description,
//         ); 
         
        
//         res.redirect('/eventshomepage') 
//         return;
// }
//     catch(e)
//     {
//         console.log(e)
//         res.render('create-event/create-event', { error: e });
//         return;
//     }
// }); 

 

// router.post("/organizersignup", async(req,res) => {
//     let orgsignpost = req.body; 
//     try
// { 
    
//     const signupcreate = await data.createOrganizer( 
//         orgsignpost.username,
//         orgsignpost.phone, 
//         orgsignpost.gender,
//         orgsignpost.email, 
//         orgsignpost.address, 
//         orgsignpost.password); 
         
        
//         res.redirect('/organizersignup') 
//         return;
// }
//     catch(e)
//     {
//         console.log(e)
//         res.render('organizerignup/organizersignup', { error: e });
//         return;
//     }
// });




// router.get("/private", async(req,res) =>{
//     try {
        
//         res.render("private/private", { username: req.session.username});
//         return;
//     }
//     catch(e) {
//         console.log(e);
//         res.status(500).json({message : e});
//         return;
//     }
// });

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render("logout/logout")
  });

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
    const passre = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(inputtxt.match(passre)) { 
        return true;
    } else { 
        return false;
    }
}


module.exports = router;