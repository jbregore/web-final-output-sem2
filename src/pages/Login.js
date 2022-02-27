import React from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";

import MyImage from "../images";

import { Link } from "react-router-dom";
import firebase from "../utils/firebase";

const useStyles = makeStyles((theme) => ({
  gridCont : {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse"
    },
  },
  card : {
    [theme.breakpoints.down("xs")]: {
      marginTop: 40
    },
  },
  col_2: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  img_1: {
    width: 200,
    objectFit: "cover",
    [theme.breakpoints.down("xs")]: {
      marginTop: 20,
      width: 160,
    },
  },
  img_2: {
    width: 500,
    objectFit: "cover",
    [theme.breakpoints.down("xs")]: {
      width: 280,
    },
  },
  btnSecondary: {
    height: 50,
    backgroundColor: "#776d6d",
    textTransform: "none",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: "center",
    color: "#1877f2",
    textDecoration: "underline",
    cursor: "pointer",
  },
  btnPrimary: {
    height: 50,
    backgroundColor: "#4cb138",
    textTransform: "none",
    fontSize: 18,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [payload, setPayload] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (prop) => (text) => {
    setPayload({ ...payload, [prop]: text.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    if (!payload.username || !payload.password) {
      alert("Login Failed, Wrong Email/Password");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.username, payload.password)
        .then((signedInUser) => {
          //success
          alert(`Signed in success Welcome ${signedInUser.user.email}`);
        })
        .catch((err) => {
          alert("Login Failed, No acc found");
        });
    }
  };

  return (
    <Grid
      container
      spacing={5}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
      className={classes.gridCont}
    >
      {/* left content */}
      <Grid
        item
        xs={10}
        lg={5}
        style={{
          height: 600,
        }}
        className={classes.col_2}
      >
        <Grid container direction="column">
          <Grid item>
            <img src={MyImage.img_1} className={classes.img_1} alt="" />
          </Grid>

          <Grid item>
            <img src={MyImage.img_2} className={classes.img_2} alt="" />
            <h2 style={{ color: "#555", fontWeight: 500 }}>
              Mindfullness social media app
            </h2><br/>
            <p style={{ color: "#555" }}>
              Web app that will help the user be more aware to themselves, and
              allows user to be positive all the time through, instilling a
              feeling of motivation.
            </p>
          </Grid>
        </Grid>
      </Grid>

      {/* right content */}
      <Grid
        item
        xs={10}
        lg={5}
        style={{
          height: 400,
        }}
        className={classes.card}
      >
        <Card style={{ padding: 15, borderRadius: 20 }}>
          <CardContent>
            <Grid item>
              <h2 style={{ color: "#555", fontWeight: 500, marginBottom: 15 }}>
                Login to your account
              </h2>
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                placeholder="Email address or phone number"
                fullWidth
                onChange={handleChange("username")}
                value={payload.username}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={handleChange("password")}
                value={payload.password}
              />
            </Grid>
            <br />

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.btnPrimary}
                onClick={login}
              >
                Log in
              </Button>
              <br />

              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.btnSecondary}
                >
                  Create new account
                </Button>
              </Link>

              <hr />
              <br />
              <p className={classes.forgotPassword}>Forgot password ?</p>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;