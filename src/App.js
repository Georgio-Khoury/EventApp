import { LoginForm } from './Components/Login/LoginForm';
import Events from './Components/Events'
import {Routes,Route,Link} from 'react-router-dom'

import CreateAccount from './Components/Login/CreateAccount';
import { Navigation } from './Components/Navigation';
import Account from './Components/Account';
import Subscription from './Components/Subscription';
import CreateEvent from './Components/CreateEvent';

function App() {
  return (
    <div className="App">
      

      <Routes>
      
      <Route path="/" element={<LoginForm />}/>
      <Route path="/Events" element={<Events />}></Route>
      <Route path="/CreateAccount" element={<CreateAccount />}></Route>
      
      <Route path="/Account" Component={Account}/>
      <Route path="/Subscription" Component={Subscription}/>
      <Route path="/CreateEvent" element={<CreateEvent/>}/>
     </Routes>
      
      
    </div>
  );
}

export default App;
