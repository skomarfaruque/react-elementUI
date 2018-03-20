import React from 'react';
export default class Interest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            optionsdata : []
        };
    }
    componentWillMount() {
        let optionArray = [];
        for ( var i = 1; i <= 100; i ++) {
            optionArray.push(i)
        }
        this.setState({optionsdata: optionArray})
    }
    selectInterest = (e) => {
        this.props.onSelectInterest(e.target.value);
    }
    render () {
        return (
            <div className="field">
                <label className="label">Interest</label>
                <div className="control">
                    <div className="select">
                        <select onChange={this.selectInterest}>
                            <option value="">--Please select--</option>
                                {this.state.optionsdata.map(function(value, key){  
                                    return (<option key={key} value={value}>{value}</option> )
                                })}
                        </select>
                    </div>
                </div>
            </div>
       )
    }
}