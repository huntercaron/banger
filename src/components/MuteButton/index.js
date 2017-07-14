import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: transparent;

    .muted {
      color: black;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: white;
    }

    .not_muted {
      color: white;
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: white;
    }

    h1:hover {
      cursor: pointer;
    }

`

class MuteButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
          muted: false
        }

        // this.handleChange = this.handleChange.bind(this);
        this.changeStyle = this.changeStyle.bind(this);
    }

    changeStyle() {
      if (this.state.muted == false) {
        this.setState({muted: true})
      } else {
        this.setState({muted: false})
      }
    }

    render() {
      return (
          <Wrapper {...this.props}>
            <h1 className={this.state.muted?'muted':'not_muted'} onClick={this.changeStyle}>TRACK 01</h1>
          </Wrapper>
      )
    }

}

export default MuteButton;
