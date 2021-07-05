import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  makeStyles,
  Modal,
} from "@material-ui/core";

import MyImage from "../images";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

import LikeModal from "../modals/LikeModal";
import firebase from "../utils/firebase";
import { getGridColumnHeaderElement } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  // post
  postHeaderLeft: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 80,
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
  imgPost: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  likes: {
    marginLeft: 4,
    position: "absolute",
    textDecoration: "underline",
    cursor: "pointer",
  },
  comments: {
    marginLeft: 4,
    position: "absolute",
    textDecoration: "underline",
    cursor: "pointer",
  },

  //comment
  cardComment: {
    backgroundColor: "#dce2db",
    paddingLeft: 40,
    paddingRight: 40,
  },
  commentImgProfile: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "5px solid #4cb138",
  },
  commentBtn: {
    marginTop: -40,
    height: 40,
    backgroundColor: "#4cb138",
    textTransform: "none",
    fontSize: 16,
    width: 120,
  },

  // modal
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
  content: {
    padding: theme.spacing(4),
    width: 600,
    height: 600,
    overflow: "auto",
  },
}));

const db = firebase.firestore();
const PostCard = (props) => {
  const classes = useStyles();

  const [state, setState] = useState(props.item);
  const [comment, setComment] = useState("0");
  const [commentText, setCommentText] = useState("");
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [likeDetails, setLikeDetails] = useState([]);
  const [commentDetails, setCommentDetails] = useState([]);
  const [like, setLike] = useState(false);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState(props.item);
      // console.log(state);
    }
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    const fetchData = () => {
      db.collection("collection_users")
        .doc(currentUser.uid)
        .collection("profile")
        .onSnapshot((doc) => {
          doc.forEach((c) => {
            // console.log(c.data().user_photo);
            setProfileUsername(c.data().user_name);
            setProfilePicture(c.data().user_photo);
          });
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    db.collection("collection_users").onSnapshot((doc) => {
      doc.forEach((user) => {
        db.collection("collection_users")
          .doc(user.id)
          .collection("posts")
          .doc(props.item.id)
          .collection("likes")
          .onSnapshot((doc) => {
            doc.forEach((c) => {
              if (currentUser.uid === c.data().like_id) {
                setLike(true);
              }
            });
          });
      });
    });
  }, []);

  const deletePost = (postId) => {
    // alert(postId);
    if (window.confirm("Are you sure to delete this post ?")) {
      db.collection("collection_users")
        .doc(currentUser.uid)
        .collection("posts")
        .doc(postId)
        .delete()
        .then(() => {
          //success
          alert("Post Deleted");
        })
        .catch((error) => {
          //error
        });
    }
  };

  const openLike = (postId) => {
    // alert(postId);
    db.collection("collection_users").onSnapshot((doc) => {
      doc.forEach((user) => {
        db.collection("collection_users")
          .doc(user.id)
          .collection("posts")
          .doc(postId)
          .collection("likes")
          .onSnapshot((doc) => {
            let foundContents = likeDetails || [];
            doc.forEach((c) => {
              foundContents.push({ ...c.data(), id: c.id });
            });
            let check = {};
            let res = [];
            for (let i = 0; i < foundContents.length; i++) {
              if (!check[foundContents[i]["id"]]) {
                check[foundContents[i]["id"]] = true;
                res.push(foundContents[i]);
              }
            }
            // console.log(res);
            console.log("gago");
            setLikeDetails(res);
          });
      });
    });
    setOpen(true);
  };

  const unlike = (user_id) => {
    // e.preventDefault();
    // console.log(props.item.id);
    db.collection("collection_users").onSnapshot((doc) => {
      doc.forEach((user) => {
        // console.log(user.id);
        db.collection("collection_users")
          .doc(user.id)
          .collection("posts")
          .doc(props.item.id)
          .collection("likes")
          .get()
          .then((doc) => {
            doc.forEach((c) => {
              // console.log(c.data());
              // console.log(c.id);
              db.collection("collection_users")
                .doc(user.id)
                .collection("posts")
                .doc(props.item.id)
                .collection("likes")
                .doc(c.id)
                .delete()
                .then(() => {
                  //success
                  setLike(false);
                  setLikeDetails([]);
                  alert("Unlike");
                })
                .catch((error) => {
                  //error
                });
              // return;
            });
          });
      });
    });
  };

  const setlike = (user_id) => {
    // e.preventDefault();
    // console.log(user_id);
    db.collection("collection_users")
      .doc(user_id)
      .collection("posts")
      .doc(props.item.id)
      .collection("likes")
      .add({
        like_id: currentUser.uid,
        like_photo: profilePicture,
        like_username: profileUsername,
      })
      .then((docRef) => {
        //success
        setLike(true);
        setLikeDetails([]);
        alert("Liked");
      })
      .catch((err) => {
        //error
      });
  };

  const getComment = (postId) => {
    // console.log(postId);
    db.collection("collection_users").onSnapshot((doc) => {
      doc.forEach((user) => {
        db.collection("collection_users")
          .doc(user.id)
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .onSnapshot((doc) => {
            let foundContents = commentDetails || [];
            doc.forEach((c) => {
              foundContents.push({ ...c.data(), id: c.id });
              console.log(c.data());
              
            });
            let check = {};
            let res = [];
            for (let i = 0; i < foundContents.length; i++) {
              if (!check[foundContents[i]["comment_text"]]) {
                check[foundContents[i]["comment_text"]] = true;
                res.push(foundContents[i]);
              }
            }
            setCommentDetails(res);
              setComment("1");
              console.log(comment);
          });
      });
    });
  };

  const goComment = (postId, postuser_id) => {
    // alert(postId);
    const currentUser = firebase.auth().currentUser;
    // alert(currentUser.uid);
    db.collection("collection_users").onSnapshot((doc => {
      doc.forEach((user) => {
        if(user.id === postuser_id){
          db.collection("collection_users")
          .doc(user.id)
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .add({
            comment_id : currentUser.uid,
            comment_photo : profilePicture === "" ? MyImage.img_2 : profilePicture,
            comment_text : commentText,
            comment_username: profileUsername
          })
          .then((docRef) => {
            //success
            alert("Comment done.");
            setCommentText("");
          })
          .catch((err) => {
            //error
          });
        }
      });
    }));

  };

  return (
    <>
      {/* posts */}
      <Card variant="elevation" style={{ marginTop: 20 }}>
        <CardContent>
          <Grid
            container
            style={{ height: props.item.post_picture === "" ? 150 : 650 }}
          >
            <Grid container item className={classes.postHeaderLeft}>
              <Grid item sm={2} style={{ paddingTop: 10 }}>
                <img
                  src={
                    props.item.postuser_picture === ""
                      ? MyImage.img_2
                      : props.item.postuser_picture
                  }
                  alt=""
                  className={classes.imgProfile}
                />
              </Grid>
              <Grid item sm={9} style={{ paddingTop: 15, marginLeft: -40 }}>
                <p style={{ fontSize: 18 }}>{props.item.post_username}</p>
                <p style={{ fontSize: 14 }}>{props.item.post_date}</p>
              </Grid>

              <Grid item sm={1} style={{ marginTop: -10, marginLeft: 40 }}>
                {props.home === "yes" ? null : (
                  <>
                    {" "}
                    <AiIcons.AiFillDelete
                      size={24}
                      color="#4cb138"
                      style={{ cursor: "pointer" }}
                      onClick={() => deletePost(props.item.id)}
                    />{" "}
                  </>
                )}
              </Grid>

              <Grid item sm={12} style={{ marginBottom: 15 }}>
                <p style={{ fontSize: 18 }}>{props.item.post_text}</p>
              </Grid>

              {props.item.post_picture === "" ? null : (
                <>
                  <Grid item sm={12} className={classes.imgBox}>
                    <img
                      src={props.item.post_picture}
                      alt=""
                      className={classes.imgPost}
                    />
                  </Grid>
                </>
              )}

              <Grid item sm={2} style={{ paddingTop: 15 }}>
                <p style={{ fontSize: 16 }}>
                  {/* dine na  */}

                  {like ? (
                    <AiIcons.AiFillHeart
                      size={24}
                      color="#4cb138"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        unlike(props.item.postuser_id);
                      }}
                    />
                  ) : (
                    <AiIcons.AiOutlineHeart
                      size={24}
                      color="#4cb138"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setlike(props.item.postuser_id);
                      }}
                    />
                  )}

                  <span
                    className={classes.likes}
                    onClick={(e) => {
                      e.preventDefault();
                      openLike(props.item.id);
                    }}
                  >
                    Likes
                  </span>
                </p>
              </Grid>
              <Grid item sm={9} style={{ paddingTop: 15, marginLeft: -20 }}>
                <p style={{ fontSize: 16 }}>
                  <FaIcons.FaRegCommentDots
                    size={24}
                    color="#4cb138"
                    style={{ cursor: "pointer" }}
                  />
                  <span
                    className={classes.comments}
                    onClick={() => {
                      if (comment === "1") {
                        setComment("0");
                        console.log(comment);
                        // setCommentDetails([]);
                        setCommentDetails([]);
                      } else {
                        // alert("gago");
                        getComment(props.item.id);
                      }
                    }}
                  >
                    Comments
                  </span>
                </p>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* comments */}
      <Card variant="elevation" className={classes.cardComment}>
        <CardContent>
          {comment === "1" ? (
            <>
              {commentDetails.map((item, key) => (
                <div key={key}>
                  <Grid container style={{ marginTop: 10 }}>
                    <Grid item>
                      <img
                        src={
                          item.comment_photo === ""
                            ? MyImage.img_2
                            : item.comment_photo
                        }
                        alt=""
                        className={classes.commentImgProfile}
                      />
                    </Grid>
                    <Grid item style={{ marginLeft: 10, marginTop: 15 }}>
                      <p style={{ fontSize: 18 }}>{item.comment_username}</p>
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      style={{
                        marginTop: -20,
                        paddingLeft: 50,
                        paddingRight: 50,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 16,
                          paddingLeft: 10,
                          paddingRight: 20,
                        }}
                      >
                        {item.comment_text}
                        {/* gago */}
                      </p>
                      <hr />
                    </Grid>
                  </Grid>
                </div>
              ))}

              {/* my comment */}
              <Grid container style={{ marginTop: 10 }}>
                <Grid item>
                  <img
                    src={profilePicture === "" ? MyImage.img_2 : profilePicture}
                    alt=""
                    className={classes.commentImgProfile}
                  />
                </Grid>
                <Grid sm={8} item style={{ marginLeft: 10, marginTop: 10 }}>
                  <TextField
                    variant="outlined"
                    placeholder="Write a comment"
                    fullWidth
                    size="small"
                    onChange={event => setCommentText(event.target.value)}
                    value={commentText}
                  />
                </Grid>
                <Grid sm={2} item style={{ marginLeft: 10, marginTop: 10 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.commentBtn}
                    onClick={() => goComment(props.item.id, props.item.postuser_id)}
                  >
                    Comment
                  </Button>
                </Grid>
              </Grid>
              <hr />
            </>
          ) : (
            <Grid item></Grid>
          )}
        </CardContent>
      </Card>

      {/* modal */}
      <Modal open={open} aria-labelledby="pet-modal">
        <>
          <LikeModal setOpen={setOpen} likeDetails={likeDetails} />
        </>
      </Modal>
    </>
  );
};

export default PostCard;