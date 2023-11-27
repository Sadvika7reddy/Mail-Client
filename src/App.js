
import './App.css';
import SignUp from './component/signUp';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Welcome from './component/welcome';
import { useDispatch,useSelector } from "react-redux";
import { authActions } from './store/authSlice';
import { Redirect } from "react-router-dom";
function App() {
  const dispatch=useDispatch()
  dispatch(authActions.setIsAuth())
  let isAuth=useSelector((state)=>state.auth.isAuthenticated)
  return (
    <>
      {!isAuth&&
        <SignUp/>
      }
      {!isAuth&&<Route>
         <Redirect to='/'/>
        </Route>}
       {isAuth&&<Redirect to='/welcome'/>} 
      <Route path='/welcome'>
        <Welcome/>
      </Route>
    </>
  );
}

export default App;
