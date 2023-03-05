import { Grid, IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";
import './footer.css'
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="footercontainer">
        <Grid container className="footer__container">
          <Grid container md={4} sm={12} alignItems="center" className="center">
            <span className="logo__name">Hotel Booking</span>
            <div className="logo__description">
            We also deliver amazing offers, such as Instant Discounts, Fare Calendar, MyRewardsProgram, MyWallet, and many more while updating them from time to time to better suit our customers’ evolving needs and demands.
            </div>
            <hr className="hr" />
          </Grid>

          <Grid container md sm={12}>
            <Grid className="col" xs={12} sm md>
              <div className="col__title">Products</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Pricing
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Teams
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Education
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Refer a friend
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Updates
                </Link>
              </div>
            </Grid>
            <Grid className="col" xs={12} sm md>
              <div className="col__title">Features</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Overview
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Design
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Code
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Collaborate
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Sletch Plugin
                </Link>
              </div>
            </Grid>
          </Grid>
          <Grid container md sm={12}>
            <Grid className="col" xs={12} sm md>
              <div className="col__title">Get Started</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Tutorials
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Resources
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Guides
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Examples
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Docs
                </Link>
              </div>
            </Grid>
            <Grid className="col" xs={12} sm md>
              <div className="col__title">About</div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Stories
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Community
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Blog
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Careers
                </Link>
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <Link to="/" className="col__links">
                  Brand Assets
                </Link>
              </div>
            </Grid>
          </Grid>
          <Grid md={12} sm={12} className="social">
            <hr className="social__hr" />
            <div className="social__tags">
              <IconButton>
                <FacebookIcon className="social__tags__color" />
              </IconButton>
              <IconButton>
                <LinkedInIcon className="social__tags__color" />
              </IconButton>
              <IconButton>
                <TwitterIcon className="social__tags__color" />
              </IconButton>
              <IconButton>
                <GitHubIcon className="social__tags__color" />
              </IconButton>
            </div>
            <div className="social__copyrights">
              © 2020 Hotel Booking. All Rights Reserved.
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;