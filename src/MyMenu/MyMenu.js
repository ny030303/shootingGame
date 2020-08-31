import React from "react";
import "./MyMenu.css";
import {getUser} from "../services/DataService";

class MyMenu extends React.Component {


    constructor(e) {
        super(e);
        this.state = {
            userInfo: {},
        }
    }

    componentDidMount() {
        getUser("","", (data) => {
            console.log(data);
            this.setState({userInfo: data.users});
        });
    }

    goToMyGame= () => {
        this.props.history.push("/game");
    };


    render() {
        return (
            <div>
                <div id="menuImg">
                    <div id="menuContents">
                        <div id="mainMenuTitle">MAIN MENU</div>
                        <ul className="mainMenuWrap">
                            <li>
                                <a onClick={this.goToMyGame}>NEW GAME</a>
                                <div className="subMenu">Play New Game!</div>
                            </li>

                            <li>
                                <a>OPTION</a>
                                <div className="subMenu">You can Set options.</div>
                            </li>

                            <li>
                                <a>ABOUT</a>
                                <div className="subMenu">You can know about this game.</div>
                            </li>
                        </ul>

                        {/*<div className="userMenuInfo">*/}
                        {/*    <div className="userMenuInfoText">ID: {this.state.userInfo.id}</div>*/}
                        {/*    <div className="userMenuInfoText">Record: {this.state.userInfo.score}</div>*/}
                        {/*    <div className="userMenuInfoText">Rank: {this.state.userInfo}</div>*/}
                        {/*    <div className="userImage"/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }


}

export default MyMenu;