import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import MyNavBar from '../components/shared/MyNavBar/MyNavBar';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import AllTournamentsView from '../components/pages/AllTournamentsView/AllTournamentsView';
import MyTournamentsView from '../components/pages/MyTournamentsView/MyTournamentsView';
import SingleTournament from '../components/pages/SingleTournament/SingleTournament';
import TournamentForm from '../components/pages/TournamentForm/TournamentForm';
import './App.scss';

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <MyNavBar authed={authed} />
          <Switch>
            <PrivateRoute path="/" exact component={AllTournamentsView} authed={authed} />
            <PrivateRoute path="/personal" exact component={MyTournamentsView} authed={authed} />
            <PublicRoute path="/auth" exact component={Auth} authed={authed} />
            <PrivateRoute path="/tourn/new" exact component={TournamentForm} authed={authed} />
            <PrivateRoute path="/tourn/:tournId/edit" exact component={TournamentForm} authed={authed} />
            <PrivateRoute path="/tourn/:tournId" exact component={SingleTournament} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
