// const { checkShopkeeper } = require("../../data/shopkeeper");
    // const checkuser = require('../../data/shopkeeper')
    const signupform =document.getElementById("signup-form");
    const username = document.getElementById("username");
    const phone = document.getElementById("phonenumber");
    const gender = document.getElementById("gender");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const password = document.getElementById("password");
    const error = document.getElementById("error");
    // const login_error = document.getElementById("login-error");
    if(signupform){
        error.hidden = true;
        signupform.addEventListener('submit', (event) => {
            // console.log(username.value.length)
            // console.log(username.value)
            // console.log('asdfasdfa')
            // login_error.hidden = true;
            if(username.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'user name must not empty';
                return;
            } 
            if(typeof username.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'user name is not string';
                return;
            }
            if(username.value.length< 4){
                // console.log('123123123f')
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'user name must longer than 4';
                return;
            }
            if(username.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'user name must not empty';
                return;
            }

            //------ login phone---//
            if(phone.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'phone number must not empty';
                return;
            } 
            if(typeof phone.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'phone number must be string';
                return;
            }
            if(phone.value.length< 4){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'phone number must longer than 4';
                return;
            }
            if(phone.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'phone number must not empty';
                return;
            }
            //------ login gender---//
            if(gender.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'gender must not empty';
                return;
            } 

            if(typeof gender.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'gender must not empty';
                return;
            }

            //------ login email---//

            if(email.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'email must not empty';
                return;
            } 
            if(typeof email.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'email must be string';
                return;
            }
            if(email.value.length< 4){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'email form not right';
                return;
            }
            if(email.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'email must not empty';
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
            //------ login user name---//



            if(password.value.length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'password must not empty';
                return;
            } 
            if(typeof password.value !== 'string'){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'password must be tring';
                return;
            }
            if(password.value.length < 6){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'password must longer than 6';
                return;
            }
            if(password.value.trim().length === 0){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'password must not empty';
                return;
            }
            if(password.value.indexOf() !== -1){
                event.preventDefault();
                error.hidden = false;
                error.innerHTML = 'password form not right';
                return;
            }
            
        })
    }
