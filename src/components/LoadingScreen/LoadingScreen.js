import React, { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

// Import your sticker images (adjust the paths/names as needed)
import sticker1 from "../../assets/stickers/1_thingsilikelove-png.png";
import sticker2 from "../../assets/stickers/2_thingsilikegeorgina-png.png";
import sticker3 from "../../assets/stickers/3_thingsilikedoggies-png.png";
import sticker4 from "../../assets/stickers/4_thingsilike3-png.png";
import sticker5 from "../../assets/stickers/5_thingsilikedisco-png.png";
import sticker6 from "../../assets/stickers/6_thingsilikebokchoy-png.png";
import sticker7 from "../../assets/stickers/7_thingsilikechicken-png.png";
import sticker8 from "../../assets/stickers/8_thingsilike1-png.png";
import sticker9 from "../../assets/stickers/9_sticker-15-png.png";
import sticker10 from "../../assets/stickers/10_sticker-13-png.png";

const images = [
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
  sticker8,
  sticker9,
  sticker10,
];

const LoadingScreen = ({ loading, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, onFinish]);

  return (
    <div className={`${styles.loadingScreen} ${fadeOut ? styles.fadeOut : ""}`}>
      <div className={styles.imageContainer}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Sticker ${index}`}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 0.2s ease-in-out",
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
