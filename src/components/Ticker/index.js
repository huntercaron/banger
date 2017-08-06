import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: red;
  width: 1.5px;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  transform: translateX(0);

  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes slidein {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(${window.innerWidth}px);
    }
  }
`

const Ticker = (props) => {
    return (
        <Wrapper {...props}>

        </Wrapper>
    )
}

export default Ticker;
