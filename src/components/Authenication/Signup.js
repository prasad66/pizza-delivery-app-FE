import * as React from "react";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../globalconstant.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Grid } from '@mui/material';

export function Signup() {
  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const history = useHistory();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        username: "",
        phoneno: "",
        password: "",
        email: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (newUser) => {
        // console.log(newUser);
        addUser(newUser);
      },
    });
  const addUser = (newUser) => {
    fetch(`${API_URL}/users/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        setMsg({
          msg: "Signup successfully",
          status: "success",
        });
        window.location.replace(`/login`);
      } else {
        setMsg({ msg: "Credentials already exists", status: "error" });
      }
      // console.log(response);
      setOpen(true);
    });
  };
  return (
    <div className="signuppage">
      <div className="brand my-5">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Aladin",
            fontSize: { sm: "35px", xs: "28px", marginTop: "20px" },
            color: "white",
          }}
        >
          PVT Pizza
        </Typography>
      </div>
      <div className="signup">
        <Typography
          variant="p"
          sx={{
            fontFamily: "Roboto Condensed",
            fontSize: "30px",
          }}
        >
          Create an Account
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                id="firstname"
                name="firstname"
                required
                label="First Name"
                sx={{ margin: "4px", width: "100%" }}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
                error={errors.firstname && touched.firstname}
                helperText={
                  errors.firstname && touched.firstname && errors.firstname
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                id="lastname"
                name="lastname"
                required
                label="Last Name"
                sx={{ margin: "4px", width: "100%" }}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
                error={errors.lastname && touched.lastname}
                helperText={errors.lastname && touched.lastname && errors.lastname}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
                id="email"
                name="email"
                required
                label="Email"
                sx={{ margin: "4px", width: "100%" }}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneIcon />{" "}
                    </InputAdornment>
                  ),
                }}
                id="phoneno"
                name="phoneno"
                required
                label="Phone No"
                sx={{ margin: "4px", width: "100%" }}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneno}
                error={errors.phoneno && touched.phoneno}
                helperText={errors.phoneno && touched.phoneno && errors.phoneno}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
                id="password"
                name="password"
                required
                label="Password"
                sx={{ margin: "4px", width: "100%" }}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={errors.password && touched.password}
                helperText={errors.password && touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: 'center' }} >
              <Grid item xs={12} md={4}  >
                <Button
                  sx={{ margin: "4px", width: "100%", justifyContent: "center" }}
                  variant="contained"
                  // onClick={() => history.push("/")}
                  type="submit"
                >
                  Signup
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </form>
        <Typography variant="p">Already have an Account?</Typography>
        <Button onClick={() => history.push("/login")} variant="text">
          Log In
        </Button>
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
  );
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formvalidationSchema = Yup.object({
  firstname: Yup.string().required("Please fill your first name"),
  lastname: Yup.string().required("Please fill your last name"),
  username: Yup.string().required("Please fill your user name"),
  email: Yup.string().email().required("Please fill the email address"),
  phoneno: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Why not fill this phone no ")
    .min(8, "Please Enter the valid phone number")
    .max(10, "Please Enter the valid phone number"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Too short password")
    .required("Please fill the password field"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
