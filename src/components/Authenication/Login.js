import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import Typography from "@mui/material/Typography";
import { InputAdornment, Tooltip, IconButton, Grid, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { useFormik } from "formik";
import { API_URL } from "../../globalconstant.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export function Login() {
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const history = useHistory();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (oldUser) => {
        // console.log(oldUser);
        getUser(oldUser);
      },
    });
  const getUser = (oldUser) => {
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(oldUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((x) => {
        // console.log(x);
        localStorage.setItem("user", JSON.stringify(x));
        if (x.username != null) {
          setMsg({ msg: "Login Successfully", status: "success" });
          setOpen(true);
          localStorage.setItem("token", x.token);
          localStorage.setItem("Username", x.username);
          history.push("/menu");
        } else {
          setMsg({ msg: x.message, status: "error" });
          setOpen(true);
        }
      })
      .catch((err) => {
        setMsg({ msg: err.message, status: "error" });
        setOpen(true);
      });
  };
  const [text, setText] = React.useState("Show");
  const [visible, setVisible] = React.useState("password");
  const icon =
    visible === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const visibility = () => {
    setVisible((visible) => (visible === "password" ? "text" : "password"));
    setText((text) => (text === "Show" ? "Hide" : "Show"));
  };
  return (
    <div className="loginpage">
      <div className="p-5">
        <div className="brand">
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Aladin",
              fontSize: { sm: "35px", xs: "28px" },
              color: "white",
            }}
          >
            PVT Pizza
          </Typography>
        </div>
        <div className="formcontainer">
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Roboto Condensed",
                fontSize: { sm: "35px", xs: "28px" },
              }}
            >
              Log In
            </Typography>
            <Box sx={{ flexGrow: 1 }}>

              <Grid container spacing={5} sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                <Grid item xs={11}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="username"
                    name="username"
                    required
                    label="User Name"
                    sx={{ margin: "4px", width: "100%" }}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    error={errors.username && touched.username}
                    helperText={errors.username && touched.username && errors.username}
                    placeholder="Enter user name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start">
                          <Tooltip title={text}>
                            <IconButton onClick={() => visibility()}>{icon}</IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    id="password"
                    name="password"
                    required
                    label="Password"
                    placeholder="Enter your password"
                    sx={{ margin: "4px", paddingRight: "0px", width: "100%" }}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={visible}
                    value={values.password}
                    error={errors.password && touched.password}
                    helperText={errors.password && touched.password && errors.password}
                  />
                </Grid>
              </Grid>
            </Box>
            <div className='d-flex justify-content-end'>
              <Button
                sx={{ marginRight: "20px" }}
                variant="text"
                onClick={() => history.push("/forgotpassword")}
              >
                Forgot Password?
              </Button>
            </div>

            <br />
            <div>

              <Button sx={{ width: "90%" }} variant="contained" type="submit">
                Login
              </Button>
            </div>
          </form>
          <div className="my-3">
            <Typography variant="p">Don't have an account</Typography>
            <Button variant="text" onClick={() => history.push("/signup")}>
              signup
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={Msg.status}
            sx={{ width: "100%" }}
          >
            {Msg.msg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

const formvalidationSchema = Yup.object({
  username: Yup.string().required("Please fill your user name"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Too short password")
    .required("Please fill the password field"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
