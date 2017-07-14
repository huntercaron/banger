import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: transparent;

    h1 {
      font-size: 1.3rem;
      color: pink;
    }
`

class MuteButton extends Component {
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
            <h1>BASE COMPONENT</h1>
          </Wrapper>
      )
    }

}

export default MuteButton;
