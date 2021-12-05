const dbConnection = require("./config/mongoConnection");
const events = require("./data/events");
const comments = require("./data/comments");
const connection = require("./config/mongoConnection");

const main = async () => {
    // const diwaliParty = await events.createEvent(
    //     "diwaliParty2k21",
    //     "party",
    //     "8b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    //     "11/05/2022",
    //     ["11/05/2022", "12:00"],
    //     ["11/05/2022", "12:00"],
    //     "232 paterson st",
    //     "Jersey City",
    //     "NJ",
    //     70,
    //     200,
    //     "This is the event which is for upcoming event christmas 2k21"
    // );

    // const thanksgivingParty = await events.removeEvent(
    //     "61ad14bc3a1699478ffde3f1",
    //     "thanksgivingParty",
    //     "party",
    //     "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    //     "11/05/2022",
    //     ["01/05/2022", "18:00"],
    //     ["11/05/2022", "15:00"],
    //     "3385 rever st",
    //     "Hoboken",
    //     "NJ",
    //     100,
    //     300,
    //     "This is the event which is for upcoming event christmas 2k21"
    // );

    await events.getBuyerList(
        "61ad28daabefee535e46589b",
        "daniel@gmail.com",
        5
    );
    //  await events.addGoing("61ad22ce68e8d04f8efbca6f");

    // await events.addIntersted("61ad0fc86c5a0145187cd0eb");

    // console.log(a);
    // const allevents = await events.getAll();
    // //  console.log(allevents);

    // //const comment = await c.get("61a7151491316f152dfb6fbe");

    // console.log(comment);
    // //
    // // const allevents = await events.getAllEvents();
    // // const event = await events.getTimingofEvent("61a8500433eeb23333b6d3f3");
    // // //console.log(event);
    // //console.log(allevents);
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
