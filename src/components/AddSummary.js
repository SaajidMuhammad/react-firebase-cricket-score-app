import React, { Component } from 'react';


class AddSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: "",
            runs: 0,
            overs: 0,
            wickets: 0,
            result: ""
        }
    }

    handleInputChange = (inputType, value) => {
        let currentState = this.state;
        currentState[inputType] = value;
        this.setState(currentState);
    }

    render() {
        return (
            <div>            
                Team <input value={this.state.team} onChange={(e) => {
                    this.handleInputChange("team", e.target.value);
                }}/> <br/>
                Runs <input value={this.state.runs} onChange={(e) => {
                    this.handleInputChange("runs", e.target.value);
                }}/> <br/>
                Overs <input value={this.state.overs} onChange={(e) => {
                    this.handleInputChange("overs", e.target.value);
                }}/> <br/>
                Wickets <input value={this.state.wickets} onChange={(e) => {
                    this.handleInputChange("wickets", e.target.value);
                }}/> <br/>
                Result <input value={this.state.result} onChange={(e) => {
                    this.handleInputChange("result", e.target.value);
                }}/> <br/>
                <button onClick={() => {
                    this.props.putScoreData(this.state)
                }}> Submit </button>     

            </div>
        );
    }
}

export default AddSummary;