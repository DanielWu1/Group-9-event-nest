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
        ["12/22/2023", "02:39"],
        ["12/30/2023", "02:39"],
        "315 new york ave ",
        "New york City",
        "New York",
        550,
        1000,
        "This is the lobester party is going to arranged in New york city"
    );
    const addeventUserdata11 = await users.addPostEvents(
        user1Object._id,
        event1._id.toString(),
        event1.title,
        event1.timestart,
        event1.endtime,
        event1.description
    );
    const event11 = await events.createEvent(
        "School get together",
        "Get-Together",
        "neeltejani125@gmail.com",
        ["12/22/2023", "02:39"],
        ["12/30/2023", "02:39"],
        "315 new york ave ",
        "New york City",
        "New York",
        550,
        1000,
        "This is the lobester party is going to arranged in New york city"
    );
    const addeventUserdata1 = await users.addPostEvents(
        user1Object._id,
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
    const user2Object = await users.getByUsers("prajay16@gmail.com");

    const event2 = await events.createEvent(
        "The christmas party",
        "Party",
        "prajay16@gmail.com",
        ["12/10/2022", "02:39"],
        ["12/27/2022", "02:39"],
        "86 graham st ",
        "Jersey City",
        "New Jersey",
        100,
        700,
        "This is the christmas party is going to arranged in jersey city"
    );
    const addeventUserdata2 = await users.addPostEvents(
        user2Object._id,
        event2._id.toString(),
        event2.title,
        event2.timestart,
        event2.endtime,
        event2.description
    );
    const user3 = await users.createUser(
        "daniel123",
        "111-233-3343",
        "male",
        "daniel123@gmail.com",
        "87 new york ave",
        "Danial@123"
    );

    const user3Object = await users.getByUsers("daniel123@gmail.com");

    const event3 = await events.createEvent(
        "The christmas party",
        "Party",
        "daniel123@gmail.com",
        ["12/10/2022", "02:39"],
        ["12/27/2022", "02:39"],
        "86 graham st ",
        "Jersey City",
        "New Jersey",
        100,
        700,
        "This is the christmas party is going to arranged in jersey city"
    );
    const addeventUserdata3 = await users.addPostEvents(
        user3Object._id,
        event3._id.toString(),
        event3.title,
        event3.timestart,
        event3.endtime,
        event3.description
    );
    const user4 = await users.createUser(
        "cherry25",
        "222-333-3344",
        "male",
        "charan22@gmail.com",
        "222 graham St",
        "Charan@123"
    );
    const user4Object = await users.getByUsers("charan22@gmail.com");

    const event4 = await events.createEvent(
        "The christmas party",
        "Party",
        "charan22@gmail.com",
        ["12/10/2022", "02:39"],
        ["12/27/2022", "02:39"],
        "86 graham st ",
        "Jersey City",
        "New Jersey",
        100,
        700,
        "This is the christmas party is going to arranged in jersey city"
    );
    const addeventUserdata4 = await users.addPostEvents(
        user4Object._id,
        event4._id.toString(),
        event4.title,
        event4.timestart,
        event4.endtime,
        event4.description
    );
    const db = await connection();
    await db.serverConfig.close();
};
main();
