// const { checkShopkeeper } = require("../../data/shopkeeper");
    // const checkuser = require('../../data/shopkeeper')
    const signupform =document.getElementById("login-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const error = document.getElementById("error");
    // const login_error = document.getElementById("login-error");
    if(signupform){
        error.hidden = true;
        signupform.addEventListener('submit', (event) => {
            // console.log(email.value.length)
            // console.log(email.value)
            // console.log('asdfasdfa')
        
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
            if(email.value.length< 8){
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

            //------ login password---//

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
