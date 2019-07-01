import React, { Component } from 'react';
import './App.css';
import Firebase from 'firebase';
import config from './config';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AddSummary from './components/AddSummary';
import ViewSummary from './components/ViewSummary';

class App extends Component {

  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    this.state = {
      matchSummary: []
    }
  }

  getScoreData = () => {
    let ref = Firebase.database().ref('/');
    // console.log(ref)
    ref.on('value', snapshot => {
      // this.setState(snapshot.val());
      const dataFromFirebase = snapshot.val();
      // console.log(dataFromFirebase)

      
      let matchSummary= [];
      let countryNames= Object.keys(dataFromFirebase)

      countryNames.forEach(cn => {
        matchSummary.push({
          country: cn,
          runs: dataFromFirebase[cn].runs,
          wickets: dataFromFirebase[cn].wickets,
          overs: dataFromFirebase[cn].overs,
          result: dataFromFirebase[cn].result,
        })
      })

      this.setState({
        matchSummary: matchSummary
      })

    });
    console.log('DATA RETRIEVED');ViewSummary
  }

  putScoreData = (data) =>{
      // e.preventDefault();
      

      Firebase.database().ref(`/${data.team}`).set({
        runs: data.runs,
        wickets: data.wickets,
        overs: data.overs,
        result: data.result
        
      })

  }

  deleteScoreData = (i) => {
    console.log("removing " + this.state.matchSummary[i].country)
    Firebase.database().ref(`/${this.state.matchSummary[i].country}`).remove();
  }

  componentDidMount = () => {
    this.getScoreData();
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className= "border-bottom"> 
            React Score App
          </div>

          <Link to="/view-score">
            ViewSummary
          </Link>
          <br />
          <Link to="/add-score">
            AddSummary
          </Link>

          <Route exact path="/view-score" render={() => (
            <ViewSummary
              matchSummary = {this.state.matchSummary}
              deleteScoreData = {this.deleteScoreData}
            />
          )}/>
          
          <Route exact path="/add-score" render={() => (
            <AddSummary 
              putScoreData = {this.putScoreData}
            />
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
