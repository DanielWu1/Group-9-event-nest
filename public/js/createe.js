// const { checkShopkeeper } = require("../../data/shopkeeper");
    // const checkuser = require('../../data/shopkeeper')
    var myDate = new Date();
    const signupform =document.getElementById("createe-form");
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    const timestart = document.getElementById("timestart");
    const endtime = document.getElementById("endtime");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const ticketcapacity = document.getElementById("ticketcapacity");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const error = document.getElementById("error");
    // const login_error = document.getElementById("login-error");
    if(signupform){
        error.hidden = true;
        signupform.addEventListener('submit', (event) => {
            console.log(description.value.length)
            // console.log(username.value.length)
            // console.log(username.value)
            // console.log('asdfasdfa')
            // login_error.hidden = true;
            if(title.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'title must not empty';
                return;
            } 
            if(typeof title.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'title is not string';
                return;
            }
            if(title.value.length< 4){
                // console.log('123123123f')
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'title must longer than 4';
                return;
            }
            if(title.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'title must not empty';
                return;
            }

            //------ category---//

            if(category.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'category must not empty';
                return;
            } 
            if(typeof category.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'category is not string';
                return;
            }
            if(category.value.length< 4){
                // console.log('123123123f')
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'category name must longer than 4';
                return;
            }
            if(category.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'category must not empty';
                return;
            }
            
            //------ login phone---//

            let myfinaltime = []
            myfinaltime.push(
                timestart.value.split("T")[0].split("-")[1] +
                    "/" +
                    timestart.value.split("T")[0].split("-")[2] +
                    "/" +
                    timestart.value.split("T")[0].split("-")[0]
            );
            myfinaltime.push(timestart.value.split("T")[1]);

            let mystart = new Date(myfinaltime[0] + " " + myfinaltime[1]);


            if(timestart.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'timestart must not empty';
                return;
            } 
            if(typeof timestart.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'timestart must be string';
                return;
            }
            if(timestart.value.length< 4){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'timestart must longer than 4';
                return;
            }
            if(timestart.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'timestart must not empty';
                return;
            }

            if (myDate > mystart) {
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'timestart must after now';
                return;
            }

            //------ end time---//

            let myfinaltimee = [];

            myfinaltimee.push(
                endtime.split("T")[0].split("-")[1] +
                    "/" +
                    endtime.split("T")[0].split("-")[2] +
                    "/" +
                    endtime.split("T")[0].split("-")[0]
            );
            myfinaltimee.push(endtime.split("T")[1]);

            let myend = new Date(myfinaltimee[0] + " " + myfinaltimee[1]);

            if(endtime.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'endtime must not empty';
                return;
            } 
            if(typeof endtime.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'endtime must be string';
                return;
            }
            if(endtime.value.length< 4){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'endtime must longer than 4';
                return;
            }
            if(endtime.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'endtime must not empty';
                return;
            }
            if (myDate > myend) {
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'end time must after now';
                return;
            }

            //------ login address---//
            if(address.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'address must not empty';
                return;
            } 
            if(typeof address.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'address must be string';
                return;
            }
            if(address.value.length< 4){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'address form not right';
                return;
            }
            if(address.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'address must not empty';
                return;
            }
            //------ login address---//
            if(city.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'city must not empty';
                return;
            } 
            if(typeof city.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'city must be string';
                return;
            }
            if(city.value.length< 4){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'city form not right';
                return;
            }
            if(city.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'city must not empty';
                return;
            }

            //------ login address---//
            if(state.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'state must not empty';
                return;
            } 
            if(typeof state.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'state must be string';
                return;
            }
            if(state.value.length< 4){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'state form not right';
                return;
            }
            if(state.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'state must not empty';
                return;
            }
            let myti = Number(ticketcapacity.value)
            if ( isNaN(myti)){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'ticketcapacity must be number';
                return;
            }

            let myprice = Number(price.value)
            if ( isNaN(myprice)){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'price must be number';
                return;
            }


            //------ login address---//
            if(description.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'description must not empty';
                return;
            } 
            if(typeof description.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'description must be string';
                return;
            }
            
            if(description.value.length< 4){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'description form not right';
                return;
            }
            if(description.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'description must not empty';
                return;
            }

            
        })
    }
