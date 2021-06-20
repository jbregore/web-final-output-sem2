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

const useStyles = makeStyles((theme) => ({
  parent: {
    height: 250,
  },
  imgRound: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    border: "5px solid #4cb138",
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
  },
  
  spanEmail: {
    color: "#4cb138",
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

const ProfileHeader = (props) => {
  const classes = useStyles();

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

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

  const previewFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  return (
    <>
      <Card variant="elevation">
        <CardContent>
          <Grid container className={classes.parent}>
            {/* header left */}
            <Grid item sm={4} style={{ textAlign: "center" }}>
              <Grid item sm={12}>
                <img
                  src={preview || MyImage.img_2}
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
                Email :{" "}
                <span className={classes.spanEmail}>{props.email}</span>
              </p>
              {/* bio */}
              <TextField
                variant="outlined"
                placeholder="Bio"
                fullWidth
                size="small"
              />
              {/* name */}
              <TextField
                variant="outlined"
                placeholder="Username"
                fullWidth
                size="small"
                style={{ marginTop: -20 }}
              />
              {/* location */}
              <TextField
                variant="outlined"
                placeholder="Location"
                fullWidth
                size="small"
                style={{ marginTop: -40 }}
              />
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btnPrimary}
                >
                  Save Changes
                </Button>
              </div>
            </Grid>
          </Grid>
          <hr style={{ marginTop: 10 }} />
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileHeader;