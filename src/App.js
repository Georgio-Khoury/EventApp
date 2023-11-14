import { LoginForm } from './Components/LoginForm';
import {Routes,Route,Link} from 'react-router-dom'
import {Main} from './Components/Main';

function App() {
  return (
    <div className="App">
      

      <Routes>
      <Route path="/Main" Component={Main} />
      <Route path="/" element={<LoginForm />}/>
     </Routes>
      
      
    </div>
  );
}

export default App;