import React from 'react';
import RangeSlider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { connect } from 'react-redux'
import Interest from './Interest';
class Sliders extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      value: 0,
      interestVal: 0,
      result: 0,
      alertMsgAmount: false,
      alertMsgInterest: false
    };
  }
  selectAmount = (value) => {
    this.props.addSliderValue(this.state.value);
    this.setState({value: value});
    if (value) {
      this.setState({alertMsgAmount: false});
    } else {
      this.setState({alertMsgAmount: true});
    }
  }
  selectInterestComponent = (value) => {
    this.setState({interestVal: value});
    if (value) {
      this.setState({alertMsgInterest: false});
    } else {
      this.setState({alertMsgInterest: true});
    }
  }
  showResult = () => {
    // eslint-disable-next-line
    let sliderVal =  parseInt(this.props.slidedVal);
    if (!sliderVal) {
        return this.setState({alertMsgAmount: true});
      } else {
        this.setState({alertMsgAmount: false});
      }
    // eslint-disable-next-line
    let interestVal =  parseInt (this.state.interestVal);
    if (!interestVal) {
        return this.setState({alertMsgInterest: true});
    } else {
        this.setState({alertMsgInterest: false});
    }
    this.setState({result: sliderVal + (interestVal * sliderVal)});
  }
  render () {
    const { value } = this.state;
    let alertAmount = '';
    let alertInterest = '';
    if (this.state.alertMsgAmount) {
        alertAmount =  <div className="notification is-danger is-active">
        Please Select Amount From slider
        </div>
    }
    if (this.state.alertMsgInterest) {
        alertInterest =  <div className="notification is-danger is-active">
        Please select interest
        </div>
    }
    return (
      <div>
        <div className="box has-text-centered">
          Simple React js Project Using Redux and Bulma css
        </div>
       
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <div className="box">
              <div className="field">
                <label className="label">Amount</label>
                <div className="control">
                  <div className='slider'>
                    <RangeSlider
                      min={0}
                      max={100}
                      value={value}
                      onChange={this.selectAmount}
                    />
                    <div className='value'>Selected Amount = {this.props.slidedVal}</div>
                  </div>
                  {alertAmount}
                </div>
              </div>
              <Interest onSelectInterest={this.selectInterestComponent}/>
              {alertInterest} 
              <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link show-result" disabled={this.state.alertMsgAmount || this.state.alertMsgInterest}  onClick={this.showResult}>Submit</button>
                </div>
              </div>
              <div className="field">
                  <label className="label">Result = {this.state.result} </label>
                  <label className="label"></label>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}
const mapStateToProps = state => ({
  slidedVal: state.amountReducer.value
})

const mapDispatchToProps = dispatch => ({
  addSliderValue: (value) => dispatch({ type: 'storeAmount', value }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sliders);