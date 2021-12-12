const express = require("express");
//const { getAll } = require("../data");
const router = express.Router();
const data = require("../data/users");
const data1 = require("../data/events");
const xss = require("xss");
router.get("/", async (req, res) => {
    try {
        res.redirect("/userlogin");
        return;
    } catch (e) {
        res.status(500).json({ message: e });
        return;
    }
});

router.get("/usersignup", async (req, res) => {
    try {
        res.render("usersignup/usersignup");
        return;
    } catch (e) {
        res.status(500).json({ message: e });
        return;
    }
});

router.post("/usersignup", async (req, res) => {
    // let signpost = req.body;
    if (!xss(req.body)) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input request not found",
        });
        return;
    }
    if (!xss(req.body.username) || xss(req.body.username === NaN)) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input username not found",
        });
        return;
    }
    if (!xss(req.body.email) || xss(req.body.email === NaN)) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input email not found",
        });
        return;
    }
    if (!xss(req.body.password) || xss(req.body.password === NaN)) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input password not found",
        });
        return;
    }

    // ----- check for string validations
    // check username
    if (typeof xss(req.body.username) !== "string") {
        res.status(400).render("usersignup/usersignup", {
            error: "Input username must be a string!",
        });
        return;
    }
    if (
        typeof xss(req.body.username) === "string" &&
        xss(req.body.username).trim() === ""
    ) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input username must be a string!",
        });
        return;
    }
    // checking for email validations
    if (isEmail(xss(req.body.email)) === false) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input email is not valid",
        });
        return;
    }
    // chekcing for password
    if (isPassword(xss(req.body.password)) === false) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input password has to be 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });
        return;
    }
    // check address
    if (typeof xss(req.body.address) !== "string") {
        res.status(400).render("usersignup/usersignup", {
            error: "Input address must be a string!",
        });
        return;
    }
    if (
        typeof xss(req.body.address) === "string" &&
        xss(req.body.address).trim() === ""
    ) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input address must be a string!",
        });
        return;
    }
    // check gender
    if (typeof xss(req.body.gender) !== "string") {
        res.status(400).render("usersignup/usersignup", {
            error: "Input gender must be a string!",
        });
        return;
    }
    if (
        typeof xss(req.body.gender) === "string" &&
        xss(req.body.gender).trim() === ""
    ) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input gender must be a string!",
        });
        return;
    }
    //  let mypho1 = req.body.phone.split("");
    if (
        xss(req.body.phone).split("")[3] !== "-" ||
        xss(req.body.phone).split("")[7] !== "-"
    ) {
        res.status(400).render("usersignup/usersignup", {
            error: "phone input is wrong2!",
        });
        return;
    }
    // let mypho = req.body.phone.split("-");
    if (
        xss(req.body.phone).split("-")[0].length !== 3 ||
        xss(req.body.phone).split("-")[1].length !== 3 ||
        xss(req.body.phone).split("-")[2].length !== 4
    ) {
        res.status(400).render("usersignup/usersignup", {
            error: "phone input is wrong1!",
        });
        return;
    }
    if (xss(req.body.phone).split("-").length != 3) {
        res.status(400).render("usersignup/usersignup", {
            error: "phone input is wrong3!",
        });
        return;
    }
    // let n =
    // let n2 = Number(xss(req.body.phone).split("-")[1]);
    // let n3 = ;
    if (
        isNaN(Number(xss(req.body.phone).split("-")[0])) ||
        isNaN(Number(xss(req.body.phone).split("-")[1])) ||
        isNaN(Number(xss(req.body.phone).split("-")[2]))
    ) {
        res.status(400).render("usersignup/usersignup", {
            error: "phone input is not a number!",
        });
        return;
    }
    try {
        //console.log(signpost.gender);
        const signupcreate = await data.createUser(
            xss(req.body.username),
            xss(req.body.phone),
            xss(req.body.gender),
            xss(req.body.email),
            xss(req.body.address),
            xss(req.body.password)
        );

        res.redirect("/userlogin");
        return;
    } catch (e) {
        console.log(e);
        res.render("usersignup/usersignup", { error: e });
        return;
    }
});

router.get("/userlogin", async (req, res) => {
    try {
        res.render("userlogin/userlogin");
        return;
    } catch (e) {
        res.status(500).json({ message: e });
        return;
    }
});

router.post("/userlogin", async (req, res) => {
    // let login = req.body;
    if (isEmail(xss(req.body.email)) === false) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input email is not valid",
        });
        return;
    }
    // chekcing for password
    if (isPassword(xss(req.body.password)) === false) {
        res.status(400).render("usersignup/usersignup", {
            error: "Input password has to be 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });
        return;
    }

    try {
        // console.log(login.email)
        const logininfo = await data.checkUsers(
            xss(req.body.email),
            xss(req.body.password)
        );

        req.session.userId = logininfo["_id"];
        req.session.email = logininfo["email"];
        req.session.userName = logininfo["userName"];
        res.redirect("/userhomepage");
        return;
    } catch (e) {
        //console.log(e);
        res.render("userlogin/userlogin", { error: e });
        return;
    }
});

router.get("/userhomepage", async (req, res) => {
    try {
        const displayevent1 = await data.getByUsers(req.session.email);
        const displayevent = await data1.getAllEvents();
        let result = [];
        for (const event of displayevent) {
            event["likeCount"] = event.likeList.length;
            event["interestedCount"] = event.interestedList
                ? event.interestedList.length
                : 0;
            event["going"] = event.going ? event.going.length : 0;
            result.push(event);
        }

        res.render("userhomepage/userhomepage", {
            allevents: result,
            userName: req.session.userName,
        });
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e });
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
    // console.log(req.params.id);
    // console.log(req.session.userId);
    const updateLikes = await data1.recordLike(
        req.params.id,
        req.session.userId
    );
    res.status(200).json({ likeAdded: updateLikes });
    return;
});

router.post("/events/:id/interested", async (req, res) => {
    console.log(req.params.id);
    console.log(req.session.userId);
    const updateInterested = await data1.recordInterested(
        req.params.id,
        req.session.userId
    );
    res.status(200).json({ interestedAdded: updateInterested });
    return;
});

router.post("/events/:id/going", async (req, res) => {
    console.log(req.params.id);
    console.log(req.session.userId);
    const updateGoing = await data1.recordGoing(
        req.params.id,
        req.session.userId
    );
    res.status(200).json({ goingAdded: updateGoing });
    return;
});

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

router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/userlogin")
});

function isEmail(inputEmail) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (inputEmail.match(re)) {
        return true;
    } else {
        return false;
    }
}
// check for password
function isPassword(inputtxt) {
    const passre = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (inputtxt.match(passre)) {
        return true;
    } else {
        return false;
    }
}

module.exports = router;
