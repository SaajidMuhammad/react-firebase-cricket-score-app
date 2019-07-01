import React, { Component } from 'react';

class ViewSummary extends Component {
    render() {
        return (
            <div>
                {this.props && this.props.matchSummary.map((cric, i) => {
                    return (
                        <div key={i} className="border-bottom">
                            <p> <b> Team : { cric.country } <br/></b>
                            <b> Runs : { cric.runs } <br/></b> 
                            <b> Overs : { cric.overs } <br/></b> 
                            <b> Wickets : { cric.wickets } <br/></b> 
                            <b> Result : { cric.result } <br/></b> </p>  
                            <button onClick={() => {
                                this.props.deleteScoreData(i);
                            }}> Remove </button>
                        </div>
                    )              
                })}
            </div>
        );
    }
}

export default ViewSummary;