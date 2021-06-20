import React,{useState} from "react";
import Sidebar from "./Sidebar";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  makeStyles,
  Modal,
  Paper,
} from "@material-ui/core";

import MyImage from "../images";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
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

const Home = () => {
  const classes = useStyles();
  const [comment, setComment] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const showComment = () => {
    setComment(!comment);
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", paddingBottom: 150 }}>
      <Sidebar />

      <div className="home">
        <Grid
          direction="row"
          alignItems="center"
          justify="center"
          style={{ width: "70%" }}
        >
          <Grid item>
            {/* posts */}
            <Card variant="elevation" style={{ marginTop: 20 }}>
              <CardContent>
                <Grid container style={{ height: 650 }}>
                  <Grid
                    container
                    item
                    style={{ paddingLeft: 20, paddingRight: 20, height: 80 }}
                  >
                    <Grid item sm={2} style={{ paddingTop: 10 }}>
                      <img
                        src={MyImage.img_2}
                        alt=""
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          border: "5px solid #4cb138",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      style={{ paddingTop: 15, marginLeft: -40 }}
                    >
                      <p style={{ fontSize: 18 }}>Username</p>
                      <p style={{ fontSize: 14 }}>15 days ago</p>
                    </Grid>

                    <Grid item sm={12} style={{ marginBottom: 15 }}>
                      <p style={{ fontSize: 14 }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Pariatur modi quia sit mollitia consequatur
                        aliquam. Asperiores, animi officia! Commodi, dignissimos
                        laudantium itaque laboriosam assumenda rem adipisci
                        debitis a maiores voluptas.
                      </p>
                    </Grid>

                    <Grid
                      item
                      sm={12}
                      style={{
                        border: "1px solid rgb(214, 214, 214)",
                        borderRadius: 10,
                        height: 450,
                      }}
                    >
                      <img
                        src={MyImage.img_4}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>

                    <Grid item sm={2} style={{ paddingTop: 15 }}>
                      <p style={{ fontSize: 16 }}>
                        <AiIcons.AiOutlineHeart
                          size={24}
                          color="#4cb138"
                          style={{ cursor: "pointer" }}
                        />
                        <span
                          style={{
                            marginLeft: 4,
                            position: "absolute",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => setOpen(true)}
                        >
                          Likes
                        </span>
                      </p>
                    </Grid>
                    <Grid
                      item
                      sm={9}
                      style={{ paddingTop: 15, marginLeft: -20 }}
                    >
                      <p style={{ fontSize: 16 }}>
                        <FaIcons.FaRegCommentDots
                          size={24}
                          color="#4cb138"
                          style={{ cursor: "pointer" }}
                        />
                        <span
                          style={{
                            marginLeft: 4,
                            position: "absolute",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={showComment}
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
            <Card
              variant="elevation"
              style={{
                backgroundColor: "#dce2db",
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <CardContent>
                {comment ? (
                  <>
                    <Grid container style={{ marginTop: 10 }}>
                      <Grid item>
                        <img
                          src={MyImage.img_2}
                          alt=""
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "5px solid #4cb138",
                          }}
                        />
                      </Grid>
                      <Grid item style={{ marginLeft: 10, marginTop: 15 }}>
                        <p style={{ fontSize: 18 }}>Username</p>
                      </Grid>
                      <Grid item sm={12} style={{ marginTop: -10 }}>
                        <p style={{ fontSize: 16 }}>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Pariatur modi quia sit mollitia consequatur
                          aliquam. Asperiores, animi officia! Commodi,
                          dignissimos laudantium itaque laboriosam assumenda rem
                          adipisci debitis a maiores voluptas.
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
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "5px solid #4cb138",
                          }}
                        />
                      </Grid>
                      <Grid
                        sm={8}
                        item
                        style={{ marginLeft: 10, marginTop: 10 }}
                      >
                        <TextField
                          variant="outlined"
                          placeholder="Write a comment"
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid
                        sm={2}
                        item
                        style={{ marginLeft: 10, marginTop: 10 }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            marginTop: -40,
                            height: 40,
                            backgroundColor: "#4cb138",
                            textTransform: "none",
                            fontSize: 16,
                            width: 120,
                          }}
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
          </Grid>
        </Grid>
      
      </div>

      {/* modal */}
      <Modal open={open} aria-labelledby="pet-modal">
        <div className={classes.root}>
          <Paper className={classes.content}>
            <div style={{ textAlign: "right" }}>
              <AiIcons.AiOutlineClose
                onClick={handleClose}
                style={{ fontSize: 25, cursor: "pointer", marginTop: -30 }}
              />
            </div>
            <Grid container>
              <Grid item sm={3}>
                <img
                  src={MyImage.img_2}
                  alt=""
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "5px solid #4cb138",
                  }}
                />
              </Grid>
              <Grid item sm={8} style={{ marginTop: 10 }}>
                <p style={{ fontSize: 18 }}>Username</p>
              </Grid>

              <Grid item sm={1} style={{ marginTop: 10 }}>
                <AiIcons.AiFillHeart
                  size={32}
                  color="#4cb138"
                  style={{ cursor: "pointer" }}
                />
              </Grid>
            </Grid>
            <hr style={{ marginBottom: 10 }} />
            <Grid container>
              <Grid item sm={3}>
                <img
                  src={MyImage.img_2}
                  alt=""
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "5px solid #4cb138",
                  }}
                />
              </Grid>
              <Grid item sm={8} style={{ marginTop: 10 }}>
                <p style={{ fontSize: 18 }}>Username</p>
              </Grid>

              <Grid item sm={1} style={{ marginTop: 10 }}>
                <AiIcons.AiFillHeart
                  size={32}
                  color="#4cb138"
                  style={{ cursor: "pointer" }}
                />
              </Grid>
            </Grid>
            <hr style={{ marginBottom: 10 }} />
            <Grid container>
              <Grid item sm={3}>
                <img
                  src={MyImage.img_2}
                  alt=""
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "5px solid #4cb138",
                  }}
                />
              </Grid>
              <Grid item sm={8} style={{ marginTop: 10 }}>
                <p style={{ fontSize: 18 }}>Username</p>
              </Grid>

              <Grid item sm={1} style={{ marginTop: 10 }}>
                <AiIcons.AiFillHeart
                  size={32}
                  color="#4cb138"
                  style={{ cursor: "pointer" }}
                />
              </Grid>
            </Grid>
            <hr style={{ marginBottom: 10 }} />
          </Paper>
        </div>
      </Modal>
    

    </div>
  );
};

export default Home;