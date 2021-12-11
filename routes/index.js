const usersRoutes = require('./users');
const eventsRoutes = require('./events');
// const filterRoutes = require('./filter');

const constructorMethod = (app) => { 
    // app.use('/filter/', filterRoutes);
    app.use('/', eventsRoutes); 
    app.use('/', usersRoutes); 
    
    
} 
module.exports = constructorMethod;