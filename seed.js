const dbConnection = require("./config/mongoConnection");
const events = require("./data/events");
const users = require("./data/users");

const connection = require("./config/mongoConnection");

const main = async () => {
    const user1 = await users.createUser(
        "neeltejani125",
        "111-222-3343",
        "male",
        "neeltejani125@gmail.com",
        "87 Paterson St",
        "Neel@123"
    );
    const user1Object = await users.getByUsers("neeltejani125@gmail.com");

    const event1 = await events.createEvent(
        "Lobster Event",
        "Party",
        "neeltejani125@gmail.com",
        ["12/26/2021", "03:39"],
        ["12/26/2021", "04:39"],
        "315 new york ave ",
        "New york City",
        "New York",
        550,
        1000,
        "This is the lobester party is going to arranged in New york city"
    );
    await users.addPostEvents(
        user1Object._id,
        event1._id.toString(),
        event1.title,
        event1.timestart,
        event1.endtime,
        event1.description
    );

    const event11 = await events.createEvent(
        "Dream Workshop",
        "workshop",
        "neeltejani125@gmail.com",
        ["12/27/2021", "03:39"],
        ["12/27/2021", "04:39"],
        "315 new york ave ",
        "New york City",
        "New York",
        550,
        1000,
        "This is the lobester party is going to arranged in New york city"
    );
    const user2Object = await users.getByUsers("neeltejani125@gmail.com");

    await users.addPostEvents(
        user2Object._id,
        event11._id.toString(),
        event11.title,
        event11.timestart,
        event11.endtime,
        event11.description
    );

    const user2 = await users.createUser(
        "prajay1",
        "111-233-3343",
        "male",
        "prajay16@gmail.com",
        "87 kournal St",
        "Prajay@123"
    );
    const user22Object = await users.getByUsers("prajay16@gmail.com");

    const event2 = await events.createEvent(
        "The school Get-together",
        "Get-Together",
        "prajay16@gmail.com",
        ["12/28/2021", "05:39"],
        ["12/28/2021", "06:39"],
        "86 New port Ave",
        "Jersey City",
        "New Jersey",
        500,
        100,
        "This is the get together is going to arranged in jersey city"
    );
    const addeventUserdata2 = await users.addPostEvents(
        user22Object._id,
        event2._id.toString(),
        event2.title,
        event2.timestart,
        event2.endtime,
        event2.description
    );

    const event22 = await events.createEvent(
        "Session Life",
        "Networking session",
        "prajay16@gmail.com",
        ["12/28/2021", "03:39"],
        ["12/28/2021", "04:39"],
        "315 new york ave ",
        "New york City",
        "New York",
        550,
        1000,
        "This is the Session on life  is going to arranged in New york city"
    );
    const user3Object = await users.getByUsers("prajay16@gmail.com");

    await users.addPostEvents(
        user3Object._id,
        event22._id.toString(),
        event22.title,
        event22.timestart,
        event22.endtime,
        event22.description
    );
    const user3 = await users.createUser(
        "daniel123",
        "111-233-3343",
        "male",
        "daniel123@gmail.com",
        "87 new york ave",
        "Danial@123"
    );

    const user33Object = await users.getByUsers("daniel123@gmail.com");

    const event3 = await events.createEvent(
        "Summit Conference",
        "Conference",
        "daniel123@gmail.com",
        ["12/28/2021", "03:39"],
        ["12/28/2021", "04:39"],
        "Summit ave ",
        "nyc",
        "New york",
        234,
        433,
        "This is the party is going to arranged in nyc"
    );
    await users.addPostEvents(
        user33Object._id,
        event3._id.toString(),
        event3.title,
        event3.timestart,
        event3.endtime,
        event3.description
    );
    const event33 = await events.createEvent(
        "Dubai Expo",
        "Expo",
        "daniel123@gmail.com",
        ["01/05/2022", "08:39"],
        ["01/06/2022", "08:39"],
        "86 Purvi st ",
        "miami",
        "florida",
        23,
        333,
        "This is the party is going to arranged in miami"
    );
    const user4Object = await users.getByUsers("daniel123@gmail.com");

    await users.addPostEvents(
        user4Object._id,
        event33._id.toString(),
        event33.title,
        event33.timestart,
        event33.endtime,
        event33.description
    );
    const user4 = await users.createUser(
        "cherry25",
        "222-333-3344",
        "male",
        "charan22@gmail.com",
        "222 graham St",
        "Charan@123"
    );
    const user44Object = await users.getByUsers("charan22@gmail.com");

    const event4 = await events.createEvent(
        "HongKong Expo",
        "Expo",
        "charan22@gmail.com",
        ["12/29/2022", "15:39"],
        ["12/29/2022", "19:39"],
        "89 hoje st ",
        "belgium",
        "Hong Kong",
        100,
        500,
        "This is the Expo  is going to arranged in Hong kong"
    );
    await users.addPostEvents(
        user44Object._id,
        event4._id.toString(),
        event4.title,
        event4.timestart,
        event4.endtime,
        event4.description
    );
    const user5Object = await users.getByUsers("charan22@gmail.com");

    const event44 = await events.createEvent(
        "College Get-Together",
        "Get-Together",
        "charan22@gmail.com",
        ["12/26/2021", "01:39"],
        ["12/26/2021", "05:39"],
        "89 helon ave ",
        "jersey city",
        "New Jersey",
        33,
        2000,
        "This is the Get together is going to arranged in Jersey city"
    );
    await users.addPostEvents(
        user5Object._id,
        event44._id.toString(),
        event44.title,
        event44.timestart,
        event44.endtime,
        event44.description
    );
    const db = await connection();
    await db.serverConfig.close();
};
main();
