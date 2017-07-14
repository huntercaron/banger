import React, { Component } from 'react';
import styled from 'styled-components';

import MuteButton from '../MuteButton'
import ClearButton from '../ClearButton'
import Timeline from '../Timeline'
import RateSlider from '../RateSlider'

const Wrapper = styled.div`
    background-color: black;
`

class Track extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

    }
    
    handleRate(rate) {
      this.setState({
        rate: rate
      });
      console.log(rate);
    }

    render() {
      return (
          <Wrapper {...this.props}>
            <RateSlider onRateChange={function(){}} />
            <MuteButton />
            <ClearButton />
            <Timeline />
          </Wrapper>
      )
    }

}

export default Track;
