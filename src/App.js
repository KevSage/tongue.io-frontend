import React from "react";
import "./App.css";
import Dashboard from "./containers/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NationList from "./components/NationList";
import { Provider } from "react-redux";
import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/countries" component={NationList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
