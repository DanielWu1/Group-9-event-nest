const express = require('express') 
const app = express(); 
const configRoutes = require('./routes'); 
const { engine } = require('express-handlebars'); 
const session = require('express-session');

app.use('/public', express.static(__dirname + '/public')) 
app.use(express.json()); 
app.use(express.urlencoded({extended: true})) 
app.engine('handlebars',engine({defaultLayout: 'main'})); 
app.set('view engine','handlebars'); 


app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))

  app.use("/private", (req, res, next) => {
      if (!req.session.username) {
          return res.redirect("/");
      }
      else {
          next();
      }
  })
  app.use((req,res,next) => {

    let answer = ''; 
    if(req.session.username) 
    {
        answer="User is authenticated" 
    } 
    else{
        answer="User is not authenticated"
    } 
    console.log(new Date().toUTCString(), req.method, req.originalUrl, answer); 
    next();
  })

  configRoutes(app)

app.listen(3100, () => { 
 
    console.log('new server will be running on http://localhost:3200')
})