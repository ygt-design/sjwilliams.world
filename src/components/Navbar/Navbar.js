// src/components/Navbar/Navbar.js
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import sjVid from "../../assets/images/sjVid.mp4"; // Import the video file

const Navbar = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const isWorkPage = location.pathname === "/work";

  useEffect(() => {
    const handleWorkScroll = (e) => {
      if (videoRef.current && videoRef.current.duration) {
        videoRef.current.currentTime = e.detail * videoRef.current.duration;
      }
    };

    if (isWorkPage) {
      window.addEventListener("workScroll", handleWorkScroll);
    }
    return () => window.removeEventListener("workScroll", handleWorkScroll);
  }, [isWorkPage]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <ul className={styles.navList}>
          <li>
            <Link className={styles.navLink} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/work">
              Work
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/gallery">
              Gallery
            </Link>
          </li>
        </ul>
      </div>
      {isWorkPage && (
        <div className={styles.navGifContainer}>
          <video
            ref={videoRef}
            src={sjVid}
            loop
            muted
            preload="auto"
            className={styles.navGif}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
