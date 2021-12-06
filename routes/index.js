const usersRoutes = require('./users');
const eventsRoutes = require('./events');


const constructorMethod = (app) => { 
    app.use('/', usersRoutes); 
    app.use('/', eventsRoutes); 
    
} 
module.exports = constructorMethod;