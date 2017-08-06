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

        this.handleMuteChange = this.handleMuteChange.bind(this);
    }

    handleMuteChange() {
      if (!this.props.track.isMuted) {
        this.props.loop.muteTrack(this.props.track);
      } else {
        this.props.loop.unMuteTrack(this.props.track);
      }

      this.forceUpdate()
    }

    render() {
      return (
          <Wrapper {...this.props}>
            <h1 className={this.props.track.isMuted?'muted':'not_muted'} onClick={this.handleMuteChange}>{this.props.track.number}</h1>
          </Wrapper>
      )
    }

}

export default MuteButton;
