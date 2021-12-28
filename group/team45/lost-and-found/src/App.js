import './App.css';
import Profile from './pages/profile/profile';
import ProfileFound from './pages/profile/ProfileFound';
import ProfileLost from './pages/profile/ProfileLost';
import Display from './pages/display/display';
import Search from './pages/search/search';
import Post from './pages/post/post';
import AdminMain from './pages/admin/adminMain';
import ReqestTable from './pages/admin/requestTable'
import AdminPosts from './pages/admin/AdminPosts'
import SendReuqest from './pages/profile/SendRequest'
import Login from './pages/login/login'
import Intro from './pages/intro/intro'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MakePost from './pages/makepost/MakePost';
import { checkSession } from "./action/user";
import React from 'react';

class App extends React.Component {
  // componentDidMount() {
  //   checkSession(this); // sees if a user is logged in
  // }

  // global state passed down includes the current logged in user.
  state = {
    id: "",
    username: "",
    email: "",
    password: "",
    losts: [],
    founds: [],
    requests:[]
  }

  render() {
    const { id } = this.state;
    return (

      <BrowserRouter>
        <Switch>
          <Route
            exact path={["/", "/login", "/display"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <Display {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )}
          />

          { /* Example of having a wildcard parameter in the url  */}
          <Route exact path={["/login", "/profile"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <Profile {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
            <Route exact path={["/intro"] /* any of these URLs are accepted. */}
                   render={props => (
                       <div className="app">
                           { /* Different componenets rendered depending on if someone is logged in. */}
                           {<Intro {...props} app={this} />}
                       </div>                   // ... spread operator - provides all of the props in the props object

                   )} />
          <Route exact path={["/login", "/profile/lost"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <ProfileLost {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
          <Route exact path={["/login", "/profile/found"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <ProfileFound {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
          <Route exact path={["/login", "/profile/request"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <SendReuqest {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
          <Route exact path={["/login", "/search"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <Search {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
          <Route exact path={["/login", "/admin/user"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <AdminMain {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
          <Route exact path={["/login", "/admin/post"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <AdminPosts {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
          <Route exact path={["/login", "/post"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <Post {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
          <Route exact path={["/login", "/admin/request-table"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <ReqestTable {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />
          <Route exact path={["/login", "/makepost"] /* any of these URLs are accepted. */}
            render={props => (
              <div className="app">
                { /* Different componenets rendered depending on if someone is logged in. */}
                {!id ? <Login {...props} app={this} /> : <MakePost {...props} app={this} />}
              </div>                   // ... spread operator - provides all of the props in the props object

            )} />

          { /* 404 if URL isn't expected. */}
          <Route render={() => <div>404 Not found</div>} />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
