import "./App.css";
import { Login } from "./components/Authenication/Login.js";
import Typography from "@mui/material/Typography";
import { Appbar } from "./components/AppBar/Appbar.js";
import Paper from "@mui/material/Paper";
import { Switch, Route, Redirect } from "react-router-dom";
import { Signup } from "./components/Authenication/Signup.js";
import { Forgotpassword } from "./components/Authenication/Forgotpassword.js";
import { Resetpassword } from "./components/Authenication/Resetpassword.js";
import { Pizzalist } from "./components/Homepage/Pizzalist.js";
import { Cart } from "./components/Cart/Cart.js";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL } from "./globalconstant.js";
import { Settings } from "./components/settings/Settings.js";
import { OrderHistory } from "./components/Cart/OrderHistory.js";
import { AdminLogin } from "./components/Admin/Login";
import { AdminSignup } from './components/Admin/Signup';
import { AdminForgotpassword } from "./components/Admin/Forgotpassword";
import { AdminResetpassword } from "./components/Admin/Resetpassword";
import AdminDashboard from "./components/Admin/AdminDashboard";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/forgotpassword">
          <Forgotpassword />
        </Route>
        <Route exact path="/forgotpassword/verify/:id">
          <Changepass />
        </Route>
        <Route exact path="/resetpassword/:id">
          <Resetpassword />
        </Route>
        <Route exact path="/admin/">
          <Redirect to="/admin/login" />
        </Route>
        <Route exact path="/admin/login">
          <AdminLogin />
        </Route>
        <Route exact path="/admin/signup">
          <AdminSignup />
        </Route>
        <Route exact path="/admin/forgotpassword">
          <AdminForgotpassword />
        </Route>
        <Route exact path="/admin/forgotpassword/verify/:id">
          <AdminChangepass />
        </Route>
        <Route exact path="/admin/resetpassword/:id">
          <AdminResetpassword />
        </Route>
        <Route exact path="/admin/dashboard">
          <AdminDashboard />
        </Route>
       
        <>
          <Paper
            elevation={0}
            style={{ borderStyle: "none", minHeight: "100vh" }}
          >
            <Appbar />
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="/menu">
              <Pizzalist />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/orderhistory">
              <OrderHistory />
            </Route>
          </Paper>
        </>
      </Switch>
    </div>
  );
}

function Changepass() {
  const { id } = useParams();
  // console.log(id);
  return id ? <Updatepassword id={id} /> : "";
}
// updatpassword
function Updatepassword({ id }) {
  // const { history } = useHistory();
  // console.log(id);
  const Result = (id) => {
    fetch(`${API_URL}/users/forgotpassword/verify`, {
      method: "GET",
      headers: { "x-auth-token": id },
    })
      .then((response) => {
        const Status = response.status;
        // console.log(Status);
        return Status;
      })
      .then((Status) =>
        Status === 200
          ? window.location.replace(`/resetpassword/${id}`)
          : alert("Please enter the registered email")
      );
  };

  Result(id);

  // Loading Page
  return (
    <div
      className="loader-container"
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
      <Typography sx={{ fontFamily: "Aladin" }} variant="h6">
        Please Wait......
      </Typography>
    </div>
  );
}
function AdminChangepass() {
  const { id } = useParams();
  // console.log(id);
  return id ? <AdminUpdatepassword id={id} /> : "";
}
// updatpassword
function AdminUpdatepassword({ id }) {
  // const { history } = useHistory();
  // console.log(id);
  const Result = (id) => {
    fetch(`${API_URL}/admin/forgotpassword/verify`, {
      method: "GET",
      headers: { "x-auth-token": id },
    })
      .then((response) => {
        const Status = response.status;
        // console.log(Status);
        return Status;
      })
      .then((Status) =>
        Status === 200
          ? window.location.replace(`/admin/resetpassword/${id}`)
          : alert("Please enter the registered email")
      );
  };

  Result(id);

  // Loading Page
  return (
    <div
      className="loader-container"
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
      <Typography sx={{ fontFamily: "Aladin" }} variant="h6">
        Please Wait......
      </Typography>
    </div>
  );
}
