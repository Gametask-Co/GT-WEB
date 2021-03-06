import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Page404 from "../../pages/Page404";
import Page500 from "../../pages/Page500";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import ForgotPassword from "../../pages/ForgotPassword";
import NewPassword from "../../pages/NewPassword";
import Profile from "../../pages/Profile";
import Subject from "../../pages/Subject";
import MilestoneList from "../../pages/MilestoneList";
import ClassroomInvite from "../../pages/ClassroomInvite";
import MilestoneDetail from "../../pages/MilestoneDetail";
import AuthProvider from "../../contents/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/newpassword" component={NewPassword} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/" component={Subject} />
          <Route path="/subject/:id" component={MilestoneList} />
          <Route path="/classroom/:id" component={ClassroomInvite} />
          <Route path="/milestone/:id" component={MilestoneDetail} />

          <Route path="/500" component={Page500} status={500} />
          <Route path="*" component={Page404} status={404} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
