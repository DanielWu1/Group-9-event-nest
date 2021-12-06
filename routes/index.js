const routes = require('./users'); 

const constructorMethod = (app) => { 
    app.use('/',routes) 
    
} 
module.exports = constructorMethod;