import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 200px;
`

const Record = styled.button`
  background-color: red;
  width: 100%;
  border: none;
  outline: none;

  &.inactive {
    background-color: transparent;
    border: 4px solid red;
  }
`

const Spacer = styled.div`
  width: 0%;
`

class RecordButton extends Component {
    constructor(props) {
        super(props);

        this.handleRecordChange = this.handleRecordChange.bind(this);
    }

    handleRecordChange(event) {
      this.props.onRecordChange();
    }

    render() {
      return (
          <Wrapper {...this.props}>
              <Spacer />
              <Record onClick={this.handleRecordChange} className={this.props.recording ? "" : "inactive"}/>
          </Wrapper>
      )
    }

}

export default RecordButton;
