import React from "react";
import "./MyHome.css";
import {getUser, logout} from "../services/DataService";
import alertDialog from "../services/AlertDialog";
import SignUpPopup from "./SignUpPopup";
import bootstrap from "bootstrap";
import RankPopup from "./RankPopup/RankPopup";

class MyHome extends React.Component {
  constructor(e) {
    super(e);
    this.state = {
      userId: "",
      userPwd: "",
      signUpPopup: false,
      rankPopup: false,
      login: 0,
      loginUserInfo: {},
    }
  }

  componentDidMount() {
    getUser("","", (data) => {
      console.log(data);
      if(data.result) {
        this.setState({login: data.result});
        this.setState({loginUserInfo: data.users});
      }
      console.log(this.state.login)
    });
    document.addEventListener("keydown", this.gotoMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.gotoMenu, false);
    let page = document.querySelector("#introImg");
    page.style.opacity = 0;
  }

  signUpShow = (bShow) => {
    this.setState({signUpPopup: bShow});
  };

  showRank = (bShow) => {
    this.setState({rankPopup: bShow});
  };

  gotoMenu = (e) => {
    if(this.state.login) {
      console.log(e);
      if (e.code === "Space") {
        this.props.history.push("/menu");
      }
    } else {
        // alertDialog.show("알림!", "로그인 먼저 해주세요.");
    }
  };


  login = () => {
    if (this.state.userId === "" || this.state.userPwd === "") {
      alertDialog.show("알림!", "값을 확인해 주시기 바랍니다.");
      return;
    }

    getUser(this.state.userId, this.state.userPwd, (data) => {
      console.log(data);
      if(!data.result) {
        alertDialog.show("오류!", "로그인에 실패했습니다.");
      } else {
        this.setState({login: data.result});
        this.setState({loginUserInfo: data.users});
        alertDialog.show("로그인", `반갑습니다. ${data.users.name}님.`);
      }
    });
  };

  logoutUser = () => {
    logout((data) => {
      alertDialog.show("로그아웃", "로그아웃 됐습니다.");
      this.setState({login: 0});
    });
  };


  changeId = (e) => {
    this.setState({userId: e.target.value});
  };

  changePwd = (e) => {
    this.setState({userPwd: e.target.value});
  };


  render() {
    return (
      <div>
        <div id="introImg">
          {this.state.signUpPopup ? <SignUpPopup signUpShow={this.signUpShow}/> : null}
          {this.state.rankPopup ? <RankPopup showRank={this.showRank}/> : null}
          <div id="introContents" style={{textAlign: "center"}}>
            <div id="introTitle">Emergency<br/> Movement Plan</div>
            {/*Emergency Movement Plan*/}
            <p id="introTest" style={this.state.login? {display:"block"} : {display:"none"}}>PUSH SPACE BUTTON...</p>
          </div>
          <div id="test"/>
          <div id="introLoginBtnImg">
            <div className="loginInputWrap" style ={this.state.login? {display:"none"} : {display:"block"}}>
              <br/>
              <input className="uk-input" placeholder="ID" value={this.state.userId} onChange={this.changeId}/>
              <input className="uk-input" type="password" placeholder="PassWord" value={this.state.userPwd}
                     onChange={this.changePwd}/>
              <button type="button" className="btn btn-primary" onClick={this.login}
                      style={{margin: "0 5px 0 0"}}>Login
              </button>

              <button type="button" className="btn btn-primary" onClick={() => this.signUpShow(true)}>signUp
              </button>
            </div>
            <div className="afterLoginContents" style ={this.state.login? {display:"block"} : {display:"none"}}>
              <div className="introIconWrap">
                <div className="introIcon" onClick={() => this.showRank(true)}>
                  <img src="/images/main/rankIcon.png" alt="rank" />
                  <p style={{margin:"7px 0 0 0"}}>RANK</p>
                </div>
                <div className="introIcon">
                  <img src="/images/main/settingIcon.png" alt="setting"/>
                  <p>SETTING</p>
                </div>
                <div className="introIcon" onClick={this.logoutUser}>
                  <img src="/images/main/outIcon.png" alt="logout"/>
                  <p style={{margin:"3px 0 0 0"}}>LOG OUT</p>
                </div>
              </div>
              <div className="homeHiText">안녕하세요 {this.state.loginUserInfo.name}님!</div>
            </div>
          </div>


        </div>

      </div>
    )
  }


}

export default MyHome;