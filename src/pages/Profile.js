import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Grid, makeStyles } from "@material-ui/core";

import ProfileHeader from "../components/ProfileHeader";
import PostCard from "../components/PostCard";

import firebase from "../utils/firebase";


const useStyles = makeStyles((theme) => ({
  
}));

const db = firebase.firestore();
const Profile = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const [profileDetails, setProfileDetails] = useState({
    user_bio: "",
    user_email: "",
    user_location: "",
    user_name: "",
    user_photo: "",
  });
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const currentUser = firebase.auth().currentUser;
      setEmail(currentUser.email);

      db.collection("collection_users")
        .doc(currentUser.uid)
        .collection("profile")
        .onSnapshot((doc) => {
          doc.forEach((c) => {
            setProfileDetails({
              user_bio: c.data().user_bio,
              user_email: c.data().user_email,
              user_location: c.data().user_location,
              user_name: c.data().user_name,
              user_photo: c.data().user_photo,
            });
          });
        });

      db.collection("collection_users")
        .doc(currentUser.uid)
        .collection("posts")
        .onSnapshot((doc) => {
          let foundContents = [];
          doc.forEach((c) => {
            // console.log(c.id);
            foundContents.push({...c.data(), id: c.id});
          });
          setPostData(foundContents);
        });
    };
    fetchData();
  }, []);


  return (
    <div style={{ backgroundColor: "#f0f2f5", paddingBottom: 150, minHeight: '100vh' }}>
      <Sidebar/>

      <div className="profile">
        <Grid
          container
          item
          // direction="row"
          // alignItems="center"
          // justify="center"
          // style={{ width: "70%" }}
          xs={11}
          lg={8}
        >
          <Grid item>
            {/* profile header */}
            <ProfileHeader email={email} profileDetails={profileDetails} />

            {/* post card */}
            {postData.map((item, key) => (
              <PostCard key={key} item={item}/>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;