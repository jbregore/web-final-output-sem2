import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Grid } from "@material-ui/core";
import PostCard from "../components/PostCard";
import firebase from "../utils/firebase";

const db = firebase.firestore();
const Home = () => {
  const [postData, setPostData] = useState([]);
  const [isMounted, setMounted] = useState(false);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    let foundContents = [];
    const fetchData = () => {

      db.collection("collection_users").onSnapshot((doc => {
        doc.forEach((user) => {
          db.collection("collection_users")
            .doc(user.id)
            .collection("posts")
            .onSnapshot((doc) => {
              doc.forEach((c) => {
                foundContents.push({ ...c.data(), id: c.id });
                // console.log(c.data());
              });
              let check = {};
              let res = [];
              for(let i=0; i<foundContents.length; i++) {
                  if(!check[foundContents[i]["post_text"]]){
                      check[foundContents[i]["post_text"]] = true;
                      res.push(foundContents[i]);
                  }
              }
              // console.log(res);
              setPostData(res);
            });
        });
      }));

    }
    fetchData();
  }, [])

  return (
    <div style={{ backgroundColor: "#f0f2f5", paddingBottom: 150, minHeight: '100vh' }}>
      <Sidebar />

      <div className="home">
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
          <Grid item >
            {postData.map((item, key) => (
              // <p key={key}>gago {item.postuser_id}</p>
              <PostCard home="yes" key={key} item={item} /> 
            ))}
            {/* <p>tanga</p> */}
            {/* <PostCard home="yes"/> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;