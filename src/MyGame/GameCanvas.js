import React from "react";
import GameMain from "./GameObjects/GameMain";
import "./GameCanvas.css";
import {getUser, getUsers, updateUserScore} from "../services/DataService";
import alertDialog from "../services/AlertDialog";
import SplitText from 'react-pose-text';
import SignUpPopup from "../MyHome/SignUpPopup";
import CalculatePage from "./CalculatePage/CalculatePage";
const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

export default class GameCanvas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      gameStart: false,
      calculatePage: false,
      isGameMainInit: false
    };
    this.gameMain = null;
    this.canvas = React.createRef();

    this.gotoCalculatePage = this.gotoCalculatePage.bind(this);
    this.gameMain = null;

  }

  componentDidMount() {
    console.log(this.canvas.current);
    getUser("","", (data) => {
      this.setState({isLogin: data.result});
      // console.log("들어옴", data);
      if(!data.result) {
        alertDialog.show("알림!", "로그인 후 이용해 주시기 바랍니다.");
        this.props.history.push("/");
      } else {
        if (this.canvas) {
          this.ctx = this.canvas.current.getContext("2d");

          if (this.gameMain == null) {
            this.gameMain = new GameMain(this.canvas.current, this.ctx, this.gotoCalculatePage, this.state.isLogin);
            // this.gameMain.init();
          }
        }
      }
    });
  }


  componentWillUnmount() {
    // 초기화가 필요함
    console.log("나갓음");
    if(this.state.isLogin) {
      this.gameMain.stopGame(false);
    }
  }

  gotoCalculatePage(score) {
    console.log("score: ", score);
    getUser("","", (data) => {
      if(data.users.score < score) {
        updateUserScore(score, data.users.id, (result) => {
          console.log("updateScore: ", result);
        });
      }
    });
    localStorage.setItem('userScore', score);
    this.props.history.push("/calculate");
  }


  canvasStart = (e) => {
    this.setState({gameStart: true});
    if (this.canvas) {
      this.ctx = this.canvas.current.getContext("2d");

      if (!this.state.isGameMainInit) {
        this.gameMain.init();
        this.setState({isGameMainInit: true});
      }
      else {
        this.gameMain.startGame();
      }
    }
  };
  //
  // inputYYDH = (e) => {
  //   if(e.target.value == "yydh") {
  //     this.setState({playerDiedNo:});
  //   }
  // };

  render() {
    return (
      <div className="myGame">
        <canvas id="canvas" ref={this.canvas} width="500" height="800" style={{margin: "50px auto", display: "block"}}/>
        <div className="gameStartBefore" style={(this.state.gameStart) ? {display:"none"} : {display:"block"}}>
          <div id="game-ready-txt">
            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>You ready for this?</SplitText>
          </div>
          <button id="startBtn" onClick={this.canvasStart}>Let's go!</button>

        </div>
        {/*<input type="text" onChange={this.inputYYDH}/>*/}
        {/*<canvas id="canvas2" width="500" height="800" style={{border: "2px solid #ddd"}}/>*/}
      </div>
    );
  }
}