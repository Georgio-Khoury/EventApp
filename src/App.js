import { LoginForm } from './Components/Login/LoginForm';
import Events from './Components/Events'
import {Routes,Route,Link} from 'react-router-dom'
import MyEvents from './Components/MyEvents';
import CreateAccount from './Components/Login/CreateAccount';
import { Navigation } from './Components/Navigation';
import Account from './Components/Account';
import Subscription from './Components/Subscription';
import CreateEvent from './Components/CreateEvent';
import CardDetails from './Components/Cards/CardDetails';
import MyCard from './Components/MyCard';
import MyCardDetails from './Components/MyCardDetails';

function App() {
  return (
    <div className="App">
      

      <Routes>
      
      <Route path="/" element={<LoginForm />}/>
      <Route path="/Events" element={<Events />}></Route>
      <Route path="/CreateAccount" element={<CreateAccount />}></Route>
      <Route path='/CardDetails/:eventName/:location/:price/:picture/:capacity' Component={CardDetails}></Route>
      <Route path="/Account" Component={Account}/>
      <Route path="/Subscription" Component={Subscription}/>
      <Route path="/CreateEvent" element={<CreateEvent/>}/>
      <Route path="/MyEvents" Component={MyEvents}/>
      <Route path='/MyCard' element={<MyCard />} />
      <Route path='/MyCardDetails/:eventName/:location/:price/:picture/:capacity' Component={MyCardDetails}></Route>

     </Routes>
      
      
    </div>
  );
}

export default App;
