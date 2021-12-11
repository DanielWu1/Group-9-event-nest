const express = require("express");
const app = express();
const configRoutes = require("./routes");
const { engine } = require("express-handlebars");
const session = require("express-session");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
    session({
        name: "AuthCookie",
        secret: "some secret string!",
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/", (req, res, next) => {
    let mytime = new Date().toUTCString();
    let mymethod = req.method;
    let url = req.originalUrl;
    let Authenticated = "";
    if (req.session.userName && req.session.email && req.session.userId) {
        Authenticated = "Authenticated User";
    } else {
        Authenticated = "Non-Authenticated User";
    }
    console.log(mytime + " + " + mymethod + " " + url + " " + Authenticated);
    next();
});

app.use("/userlogin", (req, res, next) => {
    if (req.session.userName && req.session.email && req.session.userId) {
        return res.redirect("/userhomepage");
    } else {
        next();
    }
});
app.use("/usersignup", (req, res, next) => {
    if (req.session.userName && req.session.email && req.session.userId) {
        return res.redirect("/userhomepage");
    } else {
        next();
    }
});

app.use("/userhomepage", (req, res, next) => {
    if (!req.session.userName || !req.session.email || !req.session.userId) {
        return res.redirect("/");
    } else {
        next();
    }
});
app.use("/bookedevents", (req, res, next) => {
    if (!req.session.userName || !req.session.email || !req.session.userId) {
        return res.redirect("/");
    } else {
        next();
    }
});
app.use("/myevents", (req, res, next) => {
    if (!req.session.userName || !req.session.email || !req.session.userId) {
        return res.redirect("/");
    } else {
        next();
    }
});
app.use("/create-event", (req, res, next) => {
    if (!req.session.userName || !req.session.email || !req.session.userId) {
        return res.redirect("/");
    } else {
        next();
    }
});
app.use("/checkout", (req, res, next) => {
    if (!req.session.userName || !req.session.email || !req.session.userId) {
        return res.redirect("/");
    } else {
        next();
    }
});
app.use("/payment", (req, res, next) => {
    if (!req.session.userName || !req.session.email || !req.session.userId) {
        return res.redirect("/");
    } else {
        next();
    }
});

// app.use("/filterevents", (req, res, next) => {
//     // console.log(req.originalUrl, req.method);
//     if (!req.session.userName || !req.session.email || !req.session.userId) {
//         return res.redirect("/");
//     } else {
//         next();
//     }
// });

app.use("/logout", (req, res, next) => {
    if (!req.session.userName || !req.session.email || !req.session.userId) {
        return res.redirect("/");
    } else {
        next();
    }
});

configRoutes(app);

app.listen(3000, () => {
    console.log("new server will be running on http://localhost:3000");
});
