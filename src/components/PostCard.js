import React, { useState } from "react";
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

const PostCard = (props) => {
  const classes = useStyles();

  const [comment, setComment] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* posts */}
      <Card variant="elevation" style={{ marginTop: 20 }}>
        <CardContent>
          <Grid container style={{ height: 650 }}>
            <Grid container item className={classes.postHeaderLeft}>
              <Grid item sm={2} style={{ paddingTop: 10 }}>
                <img
                  src={MyImage.img_2}
                  alt=""
                  className={classes.imgProfile}
                />
              </Grid>
              <Grid item sm={9} style={{ paddingTop: 15, marginLeft: -40 }}>
                <p style={{ fontSize: 18 }}>Username</p>
                <p style={{ fontSize: 14 }}>15 days ago</p>
              </Grid>

              <Grid item sm={1} style={{ marginTop: -10, marginLeft: 40 }}>
                {props.home === "yes" ? (
                  null
                ) : ( <> <AiIcons.AiFillDelete
                  size={24}
                  color="#4cb138"
                  style={{ cursor: "pointer" }}
                /> </>)}
              </Grid>

              <Grid item sm={12} style={{ marginBottom: 15 }}>
                <p style={{ fontSize: 14 }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Pariatur modi quia sit mollitia consequatur aliquam.
                  Asperiores, animi officia! Commodi, dignissimos laudantium
                  itaque laboriosam assumenda rem adipisci debitis a maiores
                  voluptas.
                </p>
              </Grid>

              <Grid item sm={12} className={classes.imgBox}>
                <img src={MyImage.img_4} alt="" className={classes.imgPost} />
              </Grid>

              <Grid item sm={2} style={{ paddingTop: 15 }}>
                <p style={{ fontSize: 16 }}>
                  <AiIcons.AiOutlineHeart
                    size={24}
                    color="#4cb138"
                    style={{ cursor: "pointer" }}
                  />
                  <span className={classes.likes} onClick={() => setOpen(true)}>
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
                      if (comment === 1) {
                        setComment(0);
                      } else {
                        setComment(1);
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
          {comment === 1 ? (
            <>
              <Grid container style={{ marginTop: 10 }}>
                <Grid item>
                  <img
                    src={MyImage.img_2}
                    alt=""
                    className={classes.commentImgProfile}
                  />
                </Grid>
                <Grid item style={{ marginLeft: 10, marginTop: 15 }}>
                  <p style={{ fontSize: 18 }}>Username</p>
                </Grid>
                <Grid item sm={12} style={{ marginTop: -10 }}>
                  <p style={{ fontSize: 16 }}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Pariatur modi quia sit mollitia consequatur aliquam.
                    Asperiores, animi officia! Commodi, dignissimos laudantium
                    itaque laboriosam assumenda rem adipisci debitis a maiores
                    voluptas.
                  </p>
                </Grid>
              </Grid>
              <hr />

              {/* my comment */}
              <Grid container style={{ marginTop: 10 }}>
                <Grid item>
                  <img
                    src={MyImage.img_2}
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
                  />
                </Grid>
                <Grid sm={2} item style={{ marginLeft: 10, marginTop: 10 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.commentBtn}
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
        <LikeModal setOpen={setOpen}/>
        </>
      </Modal>
    </>
  );
};

export default PostCard;