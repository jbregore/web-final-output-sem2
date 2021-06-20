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

const Post = () => {
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
      <div className="post">
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
                <Grid container style={{ height: 720 }}>
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
                      <p style={{ fontSize: 14 }}>Todays date</p>
                    </Grid>

                    <Grid item sm={12} style={{ marginBottom: 15 }}>
                        <TextField
                          variant="outlined"
                          placeholder="Write a post"
                          fullWidth
                          size="small"
                          multiline
                          rows={4}
                          rowsMax={6}
                        />
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
                        src={MyImage.img_5}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>

                    <Grid container spacing={6}>
                      <Grid item sm={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          marginTop: -25,
                          height: 30,
                          backgroundColor: "#7f7f7f",
                          textTransform: "none",
                          fontSize: 14,
                          width: 90,
                        }}
                      >
                        Upload
                      </Button>
                      </Grid>
                      <Grid item sm={9}>
                      <div style={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          marginTop: -25,
                          height: 30,
                          backgroundColor: "#4cb138",
                          textTransform: "none",
                          fontSize: 14,
                          width: 90,
                        }}
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