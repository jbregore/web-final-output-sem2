import React from "react";
import { Grid, TextField, Button, Card, CardContent, makeStyles } from "@material-ui/core";

import MyImage from "../images";

import { Link } from "react-router-dom";

import firebase from "../utils/firebase";

const useStyles = makeStyles((theme) => ({
    col_2:{
        [theme.breakpoints.down("xs")] : {
            textAlign: "center"
        }
    },
    img_1:{
        width: 200,
        [theme.breakpoints.down("xs")] : {
            marginTop: 20,
            width: 160,
        }
    },
    img_2:{
        width: 500,
        [theme.breakpoints.down("xs")] : {
            width: 280,
        }
    }
}))

const Signup = () => {
  const classes = useStyles();

  const [payload, setPayload] = React.useState({
    username: "",
    password: "",
    confPassword: "",
  })

  const handleChange = (prop) => (text) =>{
    setPayload({...payload, [prop]: text.target.value})
  }

  const signup = (e) =>{
    e.preventDefault();
    if(!payload.username || !payload.password || !payload.confPassword){
      alert("Please fill all the fields" );
    } else if (payload.password !== payload.confPassword){
      alert("Password not match");
    }else {
      firebase.auth().createUserWithEmailAndPassword(payload.username, payload.password)
      .then((userCredential) => {
        alert("Sign up successful");
      })
      .catch((error) => {
        alert(error);
      });
    }
  }

  return (
    <Grid
      container
      spacing={5}
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Grid
        item
        xs={10}
        lg={5}
        style={{
        //   width: "40%",
          height: 600,
        }}
        className={classes.col_2}
      >
        <Grid container direction="column">
          <Grid item>
            <img src={MyImage.img_1} className={classes.img_1} alt=""/>
          </Grid>

          <Grid item>
            <img src={MyImage.img_3} className={classes.img_2} alt=""/>
            <h2 style={{ color: "#555", fontWeight: 500 }}>
            Mindfullness social media app
            </h2>
            <p style={{ color: "#555" }}>
              Web app that will help the user be more aware to themselves, and
              allows user to be positive all the time through, instilling a
              feeling of motivation.
            </p>
          </Grid>
        </Grid>
      </Grid>

      <Grid item 
      xs={10}
      lg={5}
      style={{
        //    width: "40%",
       height: 400 }}>
        <Card style={{ padding: 15, borderRadius: 20 }}>
          <CardContent>
            <Grid item>
              <h2 style={{color: "#555", fontWeight: 500}}>Sign Up</h2>
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
              <TextField
                placeholder="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={handleChange("confPassword")}
                value={payload.confPassword}
              />
            </Grid>
            <br />

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  height: 50,
                  backgroundColor: "#4cb138",
                  textTransform: "none",
                  fontSize: 18,
                }}
                onClick={signup}
              >
                Sign up
              </Button>
              <br />

                <Link to="/login" style={{textDecoration: "none"}}> 
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    height: 50,
                    backgroundColor: "#776d6d",
                    textTransform: "none",
                    fontSize: 18,
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  Back to Log in
                </Button>
                </Link>

              <hr />
                 

            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;