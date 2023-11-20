import { LoginForm } from './Components/Login/LoginForm';
import Events from './Components/Events'
import {Routes,Route,Link} from 'react-router-dom'
import {Main} from './Components/Main';
import CreateAccount from './Components/Login/CreateAccount';
import { Navigation } from './Components/Navigation';
import Account from './Components/Account';
import Subscription from './Components/Subscription';

function App() {
  return (
    <div className="App">
      

      <Routes>
      <Route path="/Main" Component={Main} />
      <Route path="/" element={<LoginForm />}/>
      <Route path="/Events" element={<Events />}></Route>
      <Route path="/CreateAccount" element={<CreateAccount />}></Route>
      <Route path="/CreateEvent" Component={Navigation}/>
      <Route path="/Account" Component={Account}/>
      <Route path="/Subscription" Component={Subscription}/>
     </Routes>
      
      
    </div>
  );
}

export default App;
