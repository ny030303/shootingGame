import React from "react";
import alertDialog from "../services/AlertDialog";
import {putUsers} from "../services/DataService";

export default class SignUpPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      idCheckText:"",
      pwd: "",
      pwdCheckText:"",
      name: "",
      nameCheckText:"",
      login: 0
    }

  }
  componentDidMount() {
    console.log("SignUpPopup: ", this.state );

  }

  changeId = (e) => {
    if(this.IsValidText(e.target.value, this.state.idCheckText) === false) {
      this.setState({idCheckText:"알파벳, 한글, 숫자, 띄어쓰기, 특수문자('!@#$%^&*()')로만 구성하여야 합니다."});
    } else if(this.IsValidText(e.target.value) === true) {
      this.setState({idCheckText:""});
      this.setState({id: e.target.value});
    }
  };

  changePwd = (e) => {
    if(this.IsValidText(e.target.value, this.state.pwdCheckText) === false) {
      this.setState({pwdCheckText:"알파벳, 한글, 숫자, 띄어쓰기, 특수문자('!@#$%^&*()')로만 구성하여야 합니다."});
    } else if(this.IsValidText(e.target.value) === true) {
      this.setState({pwdCheckText:""});
      this.setState({pwd: e.target.value});
    }
  };

  changeName = (e) => {
    if(this.IsValidText(e.target.value, this.state.nameCheckText) === false) {
      this.setState({nameCheckText:"알파벳, 한글, 숫자, 띄어쓰기, 특수문자('!@#$%^&*()')로만 구성하여야 합니다."});
    } else if(this.IsValidText(e.target.value) === true) {
      this.setState({nameCheckText:""});
      this.setState({name: e.target.value});
    }
  };

  IsValidText(nowText) {
    console.log(nowText);
    let tests = nowText;
    let regEx1 = /^[0-9]*$/;
    let regEx2 = /^[0-9a-zA-Z]*$/;
    let regEx3 = /^[!@#$%^&*()]*$/;
    let regEx4 = /^[ㄱ-ㅎ|ㅏ-ㅣ가-힣]*$/;
    if (regEx1.test(tests) === true || regEx2.test(tests)=== true  || regEx3.test(tests) === true  || regEx4.test(tests)=== true ) {

      console.log("굳");
      console.log(regEx1.test(tests), regEx2.test(tests), regEx3.test(tests), regEx4.test(tests));
      return true;
    }
    else {

      console.log("ㄴㄴ");
      console.log(regEx1.test(tests), regEx2.test(tests), regEx3.test(tests), regEx4.test(tests));
      return false;
    }
  }

  hidePopup = () => this.props.signUpShow(false);

  signUp = () => {
    let id = document.querySelector("#signUpUsr");
    let pwd = document.querySelector("#signUpPwd");
    let name = document.querySelector("#signUpName");

    if (id.value === "" || pwd.value === "" || name.value === "") {
      alertDialog.show("알림!", "값을 확인해 주시기 바랍니다.");
      return;
    } else if (this.state.idCheckText.length > 0 || this.state.pwdCheckText.length > 0 || this.state.nameCheckText.length > 0) {
      alertDialog.show("알림!", "알파벳, 한글, 숫자, 띄어쓰기, 특수문자('!@#$%^&*()')로만 구성하여야 합니다.");
      return;
    } else {
      putUsers({id:id.value.trim(), pwd:pwd.value.trim(),  name:name.value.trim()}, (data) => {
        console.log(data);
        this.setState({login: data.result});
        if(data.result == 1) {
          alertDialog.show("회원가입!", `정상적으로 회원가입 됐습니다.`);
        } else {
          alertDialog.show("오류!", `회원가입에 실패했습니다.`);
        }

      });
    }
  };

  render() {
    return (
      <div className="modal fade in" style={{display: "block", opacity: "1"}} id="signUpPopup">
        <div className="modal-dialog" style={{width: "600px", top: "33%"}}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">회원가입</h4>
              <button type="button"  className="close" data-dismiss="modal" onClick={this.hidePopup}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="signUpName" onChange={this.changeName}/>
                <p style={{color:"red"}}>{this.state.nameCheckText}</p>
              </div>
              <div className="form-group">
                <label htmlFor="usr">ID:</label>
                <input type="text" className="form-control" id="signUpUsr" onChange={this.changeId}/>
                <p style={{color:"red"}}>{this.state.idCheckText}</p>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" id="signUpPwd" onChange={this.changePwd}/>
                <p style={{color:"red"}}>{this.state.pwdCheckText}</p>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" id="signUpBtn" className="btn btn-primary" onClick={this.signUp}>Sign Up</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hidePopup}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
