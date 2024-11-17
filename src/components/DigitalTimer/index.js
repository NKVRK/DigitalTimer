import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, newMinutes: 25, minutes: 25, seconds: 60}

  startTimer = () => {
    this.timerId = setInterval(this.timer, 1000)
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  pauseTimer = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false})
  }

  timer = () => {
    let {minutes, seconds} = this.state
    if (seconds === 60) {
      minutes -= 1
    }
    seconds -= 1
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(this.timerId)
        this.setState({isTimerRunning: false})
      } else {
        seconds = 60
      }
    }
    this.setState({minutes, seconds})
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false, minutes: 25, seconds: 60})
  }

  increaseTime = () => {
    this.setState(prevState => ({
      minutes: prevState.minutes + 1,
      newMinutes: prevState.newMinutes + 1,
    }))
  }

  decreaseTime = () => {
    this.setState(prevState => ({
      minutes: prevState.minutes - 1,
      newMinutes: prevState.newMinutes - 1,
    }))
  }

  render() {
    let {minutes, seconds, newMinutes} = this.state
    const {isTimerRunning} = this.state
    minutes = minutes > 9 ? minutes : `0${minutes}`
    seconds = seconds > 9 ? seconds : `0${seconds}`
    if (seconds === 60) {
      seconds = '00'
    }
    return (
      <div className="bg-con">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="main-con">
          <div className="con-1">
            <div className="timer-con">
              <h1 className="timer">{`${minutes}:${seconds}`}</h1>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="con-2">
            <div className="control-con">
              {!isTimerRunning && (
                <div className="mini-con">
                  <button
                    type="button"
                    className="control-para"
                    onClick={this.startTimer}
                  >
                    <img
                      className="control-icon"
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />
                    Start
                  </button>
                </div>
              )}
              {isTimerRunning && (
                <div className="mini-con">
                  <button
                    type="button"
                    className="control-para"
                    onClick={this.pauseTimer}
                  >
                    <img
                      className="control-icon"
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                    />
                    Pause
                  </button>
                </div>
              )}
              <div className="mini-con">
                <button
                  type="button"
                  className="reset-para"
                  onClick={this.resetTimer}
                >
                  <img
                    className="reset-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="msg">Set Timer Limit</p>
            <div className="set-con">
              <button
                type="button"
                className="set-btn"
                onClick={
                  isTimerRunning ? '' : minutes > 0 ? this.decreaseTime : ''
                }
              >
                -
              </button>
              <p className="set-para">{newMinutes}</p>
              <button
                type="button"
                className="set-btn"
                onClick={isTimerRunning ? '' : this.increaseTime}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
