import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (
    <div className="aboutSection">
        <Typography component="h1">About Us</Typography>

       
          <div>
            <Typography>Irshath</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by Irshath Ahamed.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;