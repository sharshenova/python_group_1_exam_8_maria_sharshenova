import React, { Component } from 'react';
import TaskList from "./containers/TaskList/TaskList"
import TaskDetails from "./containers/TaskDetails/TaskDetails"
import TaskAdd from "./containers/TaskAdd/TaskAdd"
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TaskList}/>
                <Route path="/task/:id" component={TaskDetails}/>
                <Route path='/tasks/add' component={TaskAdd}/>
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
