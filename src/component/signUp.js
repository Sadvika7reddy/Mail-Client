import React from 'react'
import { useRef,useState } from 'react'
import classes from "./signUp.module.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch } from "react-redux";
import { authActions } from '../store/authSlice';

const SignUp = () => {
    const history=useHistory();
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const confirmpasswordInputRef=useRef();
    const [isLogin,setIsLogin]=useState(false)
    const dispatch=useDispatch();
    const switchHandler=()=>{
        setIsLogin((prevstate)=>!prevstate)
    }
    console.log(isLogin)

const sumbitHandler=(event)=>{
   event.preventDefault();
   const enteredEmail=emailInputRef.current.value;
   const enteredPassword=passwordInputRef.current.value;
   let confirmPassword;
    if (!isLogin) {
      confirmPassword = confirmpasswordInputRef.current.value;
    }
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAT6faiNgXuT7MT5dX38X3JGuIrraTrCo';
    }
    else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAT6faiNgXuT7MT5dX38X3JGuIrraTrCo'
    }
      fetch(url,{
        method:'POST',
        body:JSON.stringify(
          {
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
          }
        ),
        headers :{
          'Content-Type':'application/json'
        }
      }
      ).then(res=>{
        if(res.ok){
          return res.json();

        }
        else{
          return res.json().then((data)=>{
            let errorMessage='Authenticated Failed';
            throw new Error(errorMessage);
          })
        }
      }).then((data)=>{
       
        dispatch(authActions.login(data.idToken))
        dispatch(authActions.setUserId(enteredEmail))
        history.push('/welcome')
        
        
      })
      .catch((err)=>{
        alert(err.message)
      })

  
   }
  

  return (
    <section className={classes.auth}>
        <h1>{isLogin?"Login":"SignUp"}</h1>
        <form onSubmit={sumbitHandler}>
            <div className={classes.control}>
               <label>Enter Email</label>
               <input  id='email' type='email' required ref={emailInputRef}/>
            </div>
            <div className={classes.control}>
              <label>Enter Password</label>
               <input id='password' type='password' required ref={passwordInputRef}/>
            </div>
           {!isLogin&&<div className={classes.control}>
                <label>Confirm Password</label>
                <input id='password' type='password' required ref={confirmpasswordInputRef}/> 
           </div> }     
            <div className={classes.actions}>
                <button>{isLogin?'Login':"SignUp"}</button>
            </div>
        </form>
        <div className={classes.actions}>
            <button onClick={switchHandler}>{!isLogin?"Alread have account?Login":"Don't have an account? signUp"}</button>
        </div>
    </section>
  )
}

export default SignUp