import React from 'react'
import { useRef } from 'react'
import classes from "./signUp.module.css"


const SignUp = () => {

    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const confirmpasswordInputRef=useRef();

const sumbitHandler=(event)=>{
   event.preventDefault();
   const enteredEmail=emailInputRef.current.value;
   const enterdPassword=passwordInputRef.current.value;
   const confirmPassword=confirmpasswordInputRef.current.value
   if(enterdPassword==confirmPassword){
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAT6faiNgXuT7MT5dX38X3JGuIrraTrCo",{
         method:'POST',
         body:JSON.stringify({
            email:enteredEmail,
            password:enterdPassword,
            returnSecureToken:true
         }),
         headers:{
            "content-Type":"application/json"
         }
    })
    .then((res)=>console.log("user has succefully loggin"))
    .catch((err)=>alert("failed to signUp"))
   }
   else{
    alert("password mismatched")
   }
}

  return (
    <section className={classes.auth}>
        <h1>SignUp</h1>
        <form onSubmit={sumbitHandler}>
            <div className={classes.control}>
               <label>Enter Email</label>
               <input  id='email' type='email' required ref={emailInputRef}/>
            </div>
            <div className={classes.control}>
              <label>Enter Password</label>
               <input id='password' type='password' required ref={passwordInputRef}/>
            </div>
           <div className={classes.control}>
                <label>Confirm Password</label>
                <input id='password' type='password' required ref={confirmpasswordInputRef}/> 
           </div>      
            <div className={classes.actions}>
                <button>SignUp</button>
            </div>
        </form>
    </section>
  )
}

export default SignUp