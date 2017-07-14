import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: transparent;

    h1 {
      font-size: 1.3rem;
      color: pink;
    }
`

class RateSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 1
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      console.log(event.target.value);

      this.setState({
        rate: event.target.value
      })

    }

    render() {
      return (
          <Wrapper {...this.props}>
              <input onChange={this.handleChange} type="range" id="range" min="0.1" max="4" step="0.01" defaultValue="1"></input>
          </Wrapper>
      )
    }

}

export default RateSlider;









