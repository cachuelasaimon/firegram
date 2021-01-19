import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import './App.css';
import { Switch, Route, Router } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'
import Navigation from './components/navigation'

// Pages
import Profile from './pages/profile'
import SignUp from './pages/sign-up'
import Login from './pages/login'


function App() {
  const [page, setPage] = useState('/firegram')
  const history = useHistory()

  useEffect(() => {
    console.log(page)
  },[page])

return (
      <div className="App">   
      <Navigation setPage={setPage} /> 
      {page === '/firegram' && (
        <Fragment>
          <Profile />
        </Fragment>
      )}
      {page === '/login' && <Login setPage={setPage} />}
      {page === '/sign-up' && <SignUp setPage={setPage} />}

        {/* <Switch>
          <Route exact path='/firegram' render={()=>( <MainLayout>
            <Profile /> </MainLayout> )} />
          <Route exact path='/login' render={()=>( <MainLayout>
            <Login /> </MainLayout> )} />
          <Route exact path='/sign-up' render={()=>( <MainLayout>
            <SignUp /> </MainLayout> )} />
        </Switch> */}
      </div>
  );
}

export default App;
