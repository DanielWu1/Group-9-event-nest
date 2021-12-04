const express = require("express");
//const { getAll } = require("../data");
const router = express.Router();
const usersdata = require('../data/users'); 
const eventsdata = require('../data/events')

// TODO: get by my events
// 1. to get the events created by self page i.e // FOR: MY CREATED EVENTS 
router.get("/bookedevents", async(req,res) =>{
    try{
        res.render("bookedevents/bookedevents");
        return;
} catch(e){
        res.status(500).json({message : e});
        return;
    }
}); 

// 