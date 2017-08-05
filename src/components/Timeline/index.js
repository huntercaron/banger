import React, { Component } from 'react';
import styled from 'styled-components';
import audioFiles from '../../helpers/audioFiles';

const Wrapper = styled.div`
    background-color: transparent;
`

const TimelineBox = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`

const Note = styled.div`
  border: 1px solid white;
  opacity: 1;
  color: white;
  height: 100px;
  font-size: 1.1rem;
  position: absolute;
  writing-mode: vertical-lr;
  font-family: "Overpass Mono";
`

const Ticker = styled.div`
  background-color: red;
  width: 1px;
  height: 100px;
  position: absolute;
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

class Timeline extends Component {
    constructor(props) {
        super(props);
        //console.log("shit" + props.loop);

        this.state = {

        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

    }

    render() {
      let noteStyle = {
        right: 0,
      }




      let tickerStyle = {
        //transform: `translateX(${window.innerWidth/2}px)`,
        animationDuration: "0s"

      };

      if (this.props.loop) {
        console.log(window.innerWidth + "PROPS  " + this.props.loop.length )

        tickerStyle = {
          //transform: `translateX(${window.innerWidth/2}px)`,
          animationDuration: (this.props.loop.length) + "s"

        };

      }


      //console.log(this.props.loop.interval)
      return (
          <Wrapper {...this.props}>
            <TimelineBox>
              {this.props.loop ? (
                <Ticker style={tickerStyle}/>
              ) : (<div>loading</div>)}
              {this.props.loop ? (
              this.props.loop.sounds.map((sound, i) => {
                let noteStyle = {
                  right: window.innerWidth-((window.innerWidth*sound.time*1000)/(this.props.loop.length*1000))-sound.sound.calcDuration()*80,
                  width: sound.sound.calcDuration()*80,
                  height: "20px",
                  top: 100-(sound.sound.rate*35) + "px"
                  //borderWidth: 5-sound.sound.rate
                };


                //console.log(this.props.loop);
                //console.log("MATH IS HARD: " + window.innerWidth/5000)

                return <Note key={i} style={noteStyle}></Note>;
              }) ) : (
              <div>Loading...</div>
            )}
            </TimelineBox>
          </Wrapper>
      )
    }

}

export default Timeline;
