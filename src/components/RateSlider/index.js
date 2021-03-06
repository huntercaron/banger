import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: transparent;

    h1 {
      font-size: 1.3rem;
      color: pink;
    }

    padding: 20px 0;

    .slider {
      width: 100%;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 25px;

      border: 2px solid black;
      width: 25px;
      background: white;
    }

    .slider:focus {
      outline: none;
    }

    .slider:hover {
      cursor: pointer;
    }
`

const Slider = styled.input`
  -webkit-appearance: none;
  background: white;
  height: 3px;
  }
`

class RateSlider extends Component {
    constructor(props) {
        super(props);

        this.handleRateChange = this.handleRateChange.bind(this);
    }

    handleRateChange(event) {
        this.props.onRateChange(event.target.value);
    }

    render() {
      return (
          <Wrapper {...this.props}>
              <Slider onChange={this.handleRateChange} className="slider" type="range" id="range" min="0.1" max="3" step="0.01" value={this.props.rate || 1}/>
          </Wrapper>
      )
    }

}

export default RateSlider;
