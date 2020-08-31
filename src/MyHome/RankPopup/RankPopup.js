import React from "react";
import "./RankPopup.css";
import {getUsers} from "../../services/DataService";

export default class RankPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    getUsers((data) => {
      console.log(data);
      this.setState({users: data.users});
    });

  }

  hidePopup = () => this.props.showRank(false);


  render() {
    let rankImgs = ["rank1Icons2.png", "rank2Icons2.png", "rank3Icons2.png"];
    return (
      <div className="modal fade in" style={{display: "block", opacity: "1", backgroundColor: "rgba(0,0,0,0.6)"}}
           id="signUpPopup">
        <div className="modal-dialog" style={{maxWidth: "600px", top: "23%"}}>
          <div className="modal-content popupStyle1">
            <div className="modal-header" style={{border: "none"}}>
              <h4 className="" style={{color: "#99def0"}}>RANK</h4>
              <button type="button" className="close" data-dismiss="modal" style={{color: "#fff"}}
                      onClick={this.hidePopup}>&times;</button>
            </div>
            <div className="modal-body">
              <ul className="uk-list" id="rankList">
                {/*{*/}
                {/*  (() => {*/}
                {/*    ["rank1Icons2.png", "rank2Icons2.png", "rank3Icons2.png"].forEach(v => {*/}
                {/*    })*/}
                {/*  })()*/}
                {/*}*/}
                {
                  this.state.users.map((v, i) => (
                    <li className="rankLi" key={i}>
                      {
                        (i < rankImgs.length) ?
                          (<img src={`/images/main/${rankImgs[i]}`} className="rankLiNumImg" alt="rank"/>) :
                          (<div className="rankLiNumImg normalLiNum">{i+1}</div>)
                      }
                      <div className="rankLiTextsWrap">
                        <div className="rankLiName">{v.id}</div>
                        <div className="rankLiScore">{Number(v.score).toLocaleString()}</div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
