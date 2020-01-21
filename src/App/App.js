import React from 'react';
import firebase from 'firebase/app';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import './App.scss';

firebaseConnection();

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
        <MyNavBar authed={authed} />
        {
          (authed) ? (<div>All Tournaments</div>) : (<Auth />)
        }
      </div>
    );
  }
}

export default App;
