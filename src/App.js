
import './App.css';
import SignUp from './component/signUp';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Welcome from './component/welcome';
function App() {
  return (
    <>
      <Route path='/' exact>
        <SignUp/>
      </Route>
      <Route path='/welcome'>
        <Welcome/>
      </Route>
    </>
  );
}

export default App;
