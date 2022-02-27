import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";

import MyImage from "../images";
import * as AiIcons from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
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
  close: {
    fontSize: 25,
    cursor: "pointer",
    marginTop: -30,
  },
  imgProfile: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "5px solid #4cb138",
    objectFit: 'cover'
  },
}));

const LikeModal = ({ setOpen, likeDetails }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const Likes = (props) => {
      return (
        <>
        <Grid container>
          <Grid item sm={3} xs={2}>
            <img src={props.item.like_photo} alt="" className={classes.imgProfile} />
          </Grid>
          <Grid item sm={8} xs={8} style={{ marginTop: 10 }}>
            <p style={{ fontSize: 18 }}>{props.item.like_username}</p>
          </Grid>

          <Grid item sm={1} xs={2} style={{ marginTop: 10 }}>
            <AiIcons.AiFillHeart
              size={32}
              color="#4cb138"
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </Grid>
        <hr style={{ marginBottom: 10 }} />
        </>
      )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <div style={{ textAlign: "right" }}>
          <AiIcons.AiOutlineClose
            onClick={handleClose}
            className={classes.close}
          />
        </div>
        {likeDetails.map((item, index) => (
          <Likes key={index} item={item}/>
        ))}
      </Paper>
    </div>
  );
};

export default LikeModal;