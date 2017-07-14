import React, { Component } from 'react';
import styled from 'styled-components';

import MuteButton from '../MuteButton'
import ClearButton from '../ClearButton'
import Timeline from '../Timeline'

const Wrapper = styled.div`
    background-color: teal;

    h1 {
      font-size: 1.3rem;
      color: Salmon;
    }
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

    render() {
      return (
          <Wrapper {...this.props}>
            <MuteButton />
            <ClearButton />
            <Timeline />
          </Wrapper>
      )
    }

}

export default Track;
