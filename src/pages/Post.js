import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";

import MyImage from "../images";
import firebase from "../utils/firebase";

const useStyles = makeStyles((theme) => ({
  // post
  mainCont: {
    height: 720,
    [theme.breakpoints.down("xs")]: {
      height: "100%"
    },
  },
  imgProfile: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "5px solid #4cb138",
  },
  imgBox: {
    border: "1px solid rgb(214, 214, 214)",
    borderRadius: 10,
    height: 450,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  btnSecondary: {
    marginTop: -25,
    height: 30,
    backgroundColor: "#7f7f7f",
    textTransform: "none",
    fontSize: 14,
    width: 90,
    [theme.breakpoints.down("xs")]: {
      width: "30%",
      height: 40,
    },
  },
  btnPrimary: {
    marginTop: -25,
    height: 30,
    backgroundColor: "#4cb138",
    textTransform: "none",
    fontSize: 14,
    width: 90,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: 50,
    },
  },
}));

const db = firebase.firestore();
const storage = firebase.storage();
const Post = () => {
  const classes = useStyles();

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const [userName, setUserName] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");

  const [postText, setPostText] = useState("");
  const [newUpload, setUpload] = useState(false);

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

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
    const currentUser = firebase.auth().currentUser;
    db.collection("collection_users")
      .doc(currentUser.uid)
      .collection("profile")
      .onSnapshot((doc) => {
        doc.forEach((c) => {
          // console.log(c.data());
          setUserName(c.data().user_name);
          setPhotoProfile(c.data().user_photo);
          // setDocId(c.data().user_photo);
        });
      });

    // db.collection("collection_users")
    //   .doc(currentUser.uid)
    //   .collection("posts")
    //   .onSnapshot((doc) => {
    //     doc.forEach((c) => {
    //       setDocId(c.id);
    //       setState({
    //         post_date: c.data().post_date,
    //         post_text: c.data().post_text,
    //         post_picture: c.data().post_date
    //       })
    //       // console.log(c.id);
    //       // setUserName(c.data().user_name);
    //       // setPhotoProfile(c.data().user_photo);
    //       // setDocId(c.data().user_photo);

    //     });
    //   });

    // db.collection("collection_users")
    //   .doc(currentUser.uid)
    //   .collection("posts")
    //   .doc(docId)
    //   .onSnapshot((doc) => {
    //     doc.forEach((c) => {
    //       setDocId(c.data());
    //     });
    //   });
  }, []);

  const post = (e) => {
    e.preventDefault();
    if (!postText) {
      alert("Please put a post");
    } else {
      if (newUpload) {
        const uploadPhoto = storage
          .ref(`images-posts/${image.name}`)
          .put(image);
        uploadPhoto.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images-posts")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                const currentUser = firebase.auth().currentUser;
                db.collection("collection_users")
                  .doc(currentUser.uid)
                  .collection("posts")
                  .add({
                    postuser_id: currentUser.uid,
                    post_username: userName,
                    postuser_picture: photoProfile,
                    post_date: date,
                    post_text: postText,
                    post_picture: url,
                  })
                  .then((docRef) => {
                    //success
                    alert("Posted successfully");
                    window.location.reload();
                  })
                  .catch((err) => {
                    //error
                  });
              });
          }
        );
      } else {
        const currentUser = firebase.auth().currentUser;
        db.collection("collection_users")
          .doc(currentUser.uid)
          .collection("posts")
          .add({
            postuser_id: currentUser.uid,
            post_username: userName,
            postuser_picture: photoProfile,
            post_date: date,
            post_text: postText,
            post_picture: "",
          })
          .then((docRef) => {
            //success
            alert("Posted successfully");
            window.location.reload();
          })
          .catch((err) => {
            //error
          });
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", paddingBottom: 150 }}>
      <Sidebar />
      <div className="post">
        <Grid
          container
          item
          // direction="row"
          // alignItems="center"
          // justify="center"
          style={{ width: "70%" }}
          xs={11}
          lg={8}
        >
          <Grid item >
            {/* posts */}
            <Card variant="elevation" style={{ marginTop: 20 }}>
              <CardContent>
                <Grid container className={classes.mainCont}>
                  <Grid
                    container
                    item
                    // style={{ paddingLeft: 20, paddingRight: 20, height: 80 }}
                  >
                    <Grid item sm={2} xs={4} style={{ paddingTop: 10 }}>
                      <img
                        src={photoProfile === "" ? MyImage.img_2 : photoProfile}
                        alt=""
                        className={classes.imgProfile}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      style={{ paddingTop: 15, marginLeft: -40 }}
                      xs={6}

                    >
                      <p style={{ fontSize: 18 }}>{userName}</p>
                      <p style={{ fontSize: 14 }}>{date}</p>
                    </Grid>

                    <Grid item sm={12} style={{ marginBottom: 15, width: "100%" }}>
                      <TextField
                        variant="outlined"
                        placeholder="Write a post"
                        fullWidth
                        size="small"
                        multiline
                        rows={4}
                        rowsMax={6}
                        onChange={(text) => setPostText(text.target.value)}
                        value={postText}
                      />
                    </Grid>

                    <Grid item sm={12} className={classes.imgBox}>
                      <img
                        src={preview || MyImage.img_5}
                        alt=""
                        className={classes.img}
                      />
                    </Grid>

                    <Grid container spacing={6}>
                      <Grid item sm={3} xs={12}>
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
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                              setImage(file);
                              setUpload(true);
                            } else {
                              setImage(null);
                            }
                          }}
                        />
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <div style={{ textAlign: "right" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.btnPrimary}
                            onClick={post}
                          >
                            Post
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Post;