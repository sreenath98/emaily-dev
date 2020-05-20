import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../action';

import Header from './header';
import Landing from "./Landing";
const dashboard = () => <h2> Dashboard </h2>
const surveyNew = () => <h2> surveyNew </h2>



class App extends Component {
    componentDidMount() {
        this.props.fetchUser();

    };

    render() {
        return (
          <div className="container">
            <BrowserRouter>
              <div>
                <Header />
                <Route exact path="/" component={Landing} />
                <Route exact path="/surveys" component={dashboard} />
                <Route path="/surveys/new" component={surveyNew} />
              </div>
            </BrowserRouter>
          </div>
        );
      };
    };



export default connect(null, action)(App);