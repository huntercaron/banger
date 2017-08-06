import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: transparent;

    h1 {
      font-size: 1.3rem;
      color: pink;
    }

    display: flex;
    justify-content: center;
    align-items: center;

    border: 2px solid pink;
    height: 40px;

    &:hover {
      font-style: italic;
      cursor: pointer;
    }

    &:active {
      background-color: pink;
      h1 {
        color: black;
      }
    }


`

class NewTrackButton extends Component {
    constructor(props) {
        super(props);

        this.handleCreateTrack = this.handleCreateTrack.bind(this);
    }

    handleCreateTrack(event) {
      this.props.onNewTrack();
    }

    render() {
      return (
          <Wrapper {...this.props} onClick={this.handleCreateTrack}>
            <h1>NEW TRACK</h1>
          </Wrapper>
      )
    }

}

export default NewTrackButton;
