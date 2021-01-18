import './App.css';
import { Switch, Route, Router } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Profile from './pages/profile'
import SignUp from './pages/sign-up'
import Login from './pages/login'


function App() {
return (
      <div className="App">      
        <Switch>
          <Route exact path='/' render={()=>( <MainLayout>
            <Profile /> </MainLayout> )} />
          <Route exact path='/login' render={()=>( <MainLayout>
            <Login /> </MainLayout> )} />
          <Route exact path='/sign-up' render={()=>( <MainLayout>
            <SignUp /> </MainLayout> )} />
        </Switch>
      </div>
  );
}

export default App;
