const dbConnection = require("./config/mongoConnection");
const events = require("./data/events");
const comments = require("./data/comments");

const connection = require("./config/mongoConnection");

const main = async () => {
    const christmasParty = await events.createEvent(
        "christmasParty2k21",
        "party",
        "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
        "11/05/2021",
        ["11/05/2022", "12:00"],
        ["12/22/2022", "02:30"],
        "3385 rever st",
        "Hoboken",
        "NJ",
        100,
        150,
        "This is the event which is for upcoming event christmas 2k21"
    );
    console.log(christmasParty);
    // const diwaliParty = await events.createEvent(
    //     "diwaliParty2k21",
    //     "party",
    //     "8b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    //     "11/05/2021",
    //     ["11/05/2021", "12:00"],
    //     ["11/05/2021", "12:00"],
    //     "232 paterson st",
    //     "Jersey City",
    //     "NJ",
    //     70,
    //     200,
    //     "This is the event which is for upcoming event christmas 2k21"
    // );

    // const thanksgivingParty = await events.updateEvent(
    //     "619ebe734a6d692722350e6e",
    //     "thanksgivingParty",
    //     "party",
    //     "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    //     "11/05/2021",
    //     ["11/05/2022", "01:00"],
    //     ["22/08/2022", "01:59"],
    //     "3385 rever st",
    //     "Hoboken",
    //     "NJ",
    //     100,
    //     300,
    //     "This is the event which is for upcoming event christmas 2k21"
    // );

    // const allevents = await events.getAllEvents();
    // const event = await events.getTimingofEvent("61a8500433eeb23333b6d3f3");
    //console.log(event);
    //console.log(allevents);
    // const comment = await comments.updateComment(
    //     "61a7c5d2e8291054a3c69401",
    //     "61a850b62c8f9933dc3b176f",
    //     "hey there"
    // );
    // console.log(comment);
    //console.dir(comment, { depth: null });
    const db = await connection();
    await db.serverConfig.close();
};
main();
