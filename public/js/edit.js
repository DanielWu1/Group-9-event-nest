// const { checkShopkeeper } = require("../../data/shopkeeper");
    // const checkuser = require('../../data/shopkeeper')
    const signupform =document.getElementById("edit-event-form");
    const ticketcapacity = document.getElementById("ticketcapacity");
    const price = document.getElementById("price");
    const error = document.getElementById("error");
    // const login_error = document.getElementById("login-error");
    if(signupform){
        error.hidden = true;
        signupform.addEventListener('submit', (event) => {
            // console.log(email.value.length)
            // console.log(email.value)
            // console.log('asdfasdfa')
        
            //------ login email---//

            if(ticketcapacity.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'ticketcapacity must not empty';
                return;
            } 
            if(ticketcapacity.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'ticketcapacity must not empty';
                return;
            }

            if(price.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'price must not empty';
                return;
            } 

            if(price.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'price must not empty';
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
            
        })
    }
