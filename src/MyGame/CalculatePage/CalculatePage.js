import React from "react";
import "./CalculatePage.css";
import {getUser, getUsers} from "../../services/DataService";
import alertDialog from "../../services/AlertDialog";

export default class CalculatePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            rank: 0
        }
    }
    componentDidMount() {
        getUser("","", (data) => {
            if(!data.result) {
                alertDialog.show("알림!", "로그인 후 이용해 주시기 바랍니다.");
                this.props.history.push("/");
                return;
            } else {
                // userScore
                this.setState({score: localStorage.getItem('userScore')});
                getUsers((data2) => {
                    data2.users.forEach((v,i) => {
                        if(v.id === data.users.id) {
                            this.setState({rank: i});
                        }
                    });
                })
            }
        });
    }

    hidePopup = () => this.props.showRank(false);

    gotoHome = () => {
        this.props.history.push("/");
    };

    gameAgain = () => {
        this.props.history.push("/game");
    };

    render() {
        return (
            <div className="modal fade in" style={{display: "block", opacity: "1", backgroundColor: "rgba(0,0,0,0.7)"}} id="signUpPopup">
                <div className="modal-dialog" style={{maxWidth: "800px", top: "9%"}}>
                    <div className="modal-content popupStyle1" style={{height: "800px", backgroundColor:"#051012"}}>
                        <div className="modal-header" style={{border: "none"}}>
                            {/*<h4 className="" style={{color:"#99def0"}}></h4>*/}
                            {/*<button type="button" className="close" data-dismiss="modal"  style={{color:"#fff"}} onClick={this.hidePopup}>&times;</button>*/}
                        </div>
                        <div className="modal-body">
                            <div className="calculateTitleImg"/>
                            <div className="calculateContents">
                                <br/>
                                <div>. . .</div>
                                <br/>
                                <div>Score: {this.state.score}</div>
                                <div>Rank: {this.state.rank}</div>
                                <img src="/images/main/homeIcons.png" onClick={this.gotoHome} className="calculateIcon" alt="home"/>
                                <img src="/images/main/againIcons.png" onClick={this.gameAgain} className="calculateIcon" alt="again"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
