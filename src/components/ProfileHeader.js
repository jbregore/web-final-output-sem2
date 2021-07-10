import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  makeStyles,
  CardContent,
} from "@material-ui/core";

import MyImage from "../images";
import firebase from "../utils/firebase";

const useStyles = makeStyles((theme) => ({
  parent: {
    height: 250,
    [theme.breakpoints.down("xs")]: {
      height: "100%"
    },
  },
  imgRound: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    border: "5px solid #4cb138",
    [theme.breakpoints.down("xs")]: {
      width: 100,
      height: 100,
      border: "2px solid #4cb138",
    },
  },
  btnSecondary: {
    marginTop: -25,
    height: 30,
    backgroundColor: "#7f7f7f",
    textTransform: "none",
    fontSize: 14,
    width: 90,
  },
  btnPrimary: {
    height: 30,
    backgroundColor: "#4cb138",
    textTransform: "none",
    fontSize: 14,
    width: 150,
    marginTop: -170,
    [theme.breakpoints.down("xs")]: {
      height: 40,
      marginTop: -30,
      width: "100%"
    },
  },

  spanEmail: {
    color: "#4cb138",
    cursor: "pointer",
    textDecoration: "underline",
  },

  saveContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: -60
    },
  },

  hrBotProf : {
    marginTop: 10,
    // [theme.breakpoints.down("xs")]: {
    //   marginTop: -110
    // },
  }

}));

const db = firebase.firestore();
const storage = firebase.storage();

const ProfileHeader = (props) => {
  const classes = useStyles();

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const [state, setState] = useState(props.profileDetails);
  const [docId, setDocId] = useState("");
  const [newUpload, setUpload] = useState(false);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    setState(props.profileDetails);
  }, [props.profileDetails]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    db.collection("collection_users")
      .doc(currentUser.uid)
      .collection("profile")
      .onSnapshot((doc) => {
        doc.forEach((c) => {
          setDocId(c.id);
        });
      });
  }, []);

  const handleChange = (prop) => (text) => {
    setState({ ...state, [prop]: text.target.value });
  };

  const previewFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setUpload(true);
    } else {
      setImage(null);
    }
  };

  const save = () => {
    if (newUpload) {
      const uploadPhoto = storage
        .ref(`images-profile/${image.name}`)
        .put(image);
      uploadPhoto.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images-profile")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              const currentUser = firebase.auth().currentUser;
              db.collection("collection_users")
                .doc(currentUser.uid)
                .collection("profile")
                .doc(docId)
                .set({
                  user_bio: state.user_bio,
                  user_email: props.email,
                  user_location: state.user_location,
                  user_name: state.user_name,
                  user_photo: url,
                });
              alert("Profile updated successfully");
            });
        }
      );
    } else {
      const currentUser = firebase.auth().currentUser;
      db.collection("collection_users")
        .doc(currentUser.uid)
        .collection("profile")
        .doc(docId)
        .set({
          user_bio: state.user_bio,
          user_email: props.email,
          user_location: state.user_location,
          user_name: state.user_name,
          user_photo: state.user_photo,
        });
      alert("Profile updated successfully");
    }
  };

  return (
    <>
      <Card variant="elevation">
        <CardContent>
          <Grid container className={classes.parent}>
            {/* header left */}
            <Grid item sm={4} xs={12} style={{ textAlign: "center", alignItems: "center" }}>
              <Grid item sm={12}>
                <img
                  src={
                    state.user_photo === ""
                      ? preview || MyImage.img_2
                      : preview || state.user_photo
                  }
                  alt=""
                  className={classes.imgRound}
                />
              </Grid>
              <Grid item sm={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btnSecondary}
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  Upload
                </Button>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={previewFile}
                />
              </Grid>
            </Grid>

            {/* header right */}
            <Grid item sm={8} style={{ paddingTop: 20 }}>
              <p style={{ fontSize: 18, marginBottom: 8 }}>
                Email : <span className={classes.spanEmail}>{props.email}</span>
              </p>
              {/* bio */}
              <TextField
                variant="outlined"
                placeholder="Bio"
                fullWidth
                size="small"
                value={state.user_bio}
                onChange={handleChange("user_bio")}
              />
              {/* name */}
              <TextField
                variant="outlined"
                placeholder="Username"
                fullWidth
                size="small"
                style={{ marginTop: -20 }}
                value={state.user_name}
                onChange={handleChange("user_name")}
              />
              {/* location */}
              <TextField
                variant="outlined"
                placeholder="Location"
                fullWidth
                size="small"
                style={{ marginTop: -40 }}
                value={state.user_location}
                onChange={handleChange("user_location")}
              />
              <div xs={12} style={{textAlign: "right"}} className={classes.saveContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btnPrimary}
                  onClick={save}
                >
                  Save Changes
                </Button>
              </div>
            </Grid>
          </Grid>
          <hr className={classes.hrBotProf} /> 
          {/* marginTop: -100 */}
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileHeader;