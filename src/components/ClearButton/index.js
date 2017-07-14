import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: transparent;
    position: relative;

    h1 {
      font-size: 1.3rem;
      color: pink;
    }

    .clear_button {
      position: relative;
      height: 53px;
      width: 123px;
    }

    .clear_button:hover .shadow {
      left: 0; 
      top: 0; 
    }

    .clear {
      width: 120px;
      height: 50px;
      background: black;
      color: white;
      -webkit-box-shadow: none;
      border: 2px solid white;
      position: absolute;
      left: 0; 
      top: 0; 
      z-index:1;
      font-family: 'Source Code Pro', monospace;
      outline: none;
    }

    .shadow {
      position: absolute;
      width: 120px;
      height: 50px;
      background: white;
      border: 2px solid white;
      left: 3px; 
      top: 3px;
      transition: all 0.3s ease;
    }



`

class ClearButton extends Component {
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
            <div className="clear_button">
              <button className="clear" onClick={this.clearMusic}>clear</button>
              <button className="shadow"></button>
            </div> 
          </Wrapper>
      )
    }

}

export default ClearButton;
