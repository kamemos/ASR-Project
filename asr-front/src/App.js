import React, { Component } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import HomePage from './pages/homepage.js'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
