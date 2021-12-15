import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyHome from "./MyHome/MyHome";
import {HashRouter, Route, Switch} from 'react-router-dom';
import GameCanvas from "./MyGame/GameCanvas";
import MyMenu from "./MyMenu/MyMenu";
import CalculatePage from "./MyGame/CalculatePage/CalculatePage";
//
// const PrivateRoute = ({component: Component, authed, ...rest}) => (
//     <Route
//         {...rest}
//         render={(props) =>
//             (authed === true) ?
//                 (<Component {...props} />) :
//                 (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
//         }/>
// );


class App extends React.Component {
  render() {
    return (
      <div className="App">
          <HashRouter>
              <Switch>
                  <Route exact path="/" component={GameCanvas}/>
                  {/* <Route path="/menu" component={MyMenu}/>
                  <Route  path="/game" component={GameCanvas}/>
                  <Route path="/calculate" component={CalculatePage}/> */}
              </Switch>
          </HashRouter>
          {/*<MyHome/>*/}
          {/*<GameCanvas/>*/}
      </div>
    );
  }

}

export default App;
