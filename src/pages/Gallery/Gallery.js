import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.css";

const ACCESS_TOKEN = "J7ruXpTpvNRJGQNdJ6x4d_a2Pr396ODnIWFWVei_-1E";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch gallery images from the Gallery channel
  useEffect(() => {
    const fetchGalleryChannel = async () => {
      try {
        setLoading(true);
        const perPage = 100;
        let page = 1;
        let allContents = [];
        let fetchedData = null;
        // Loop through pages until all contents are fetched
        do {
          const response = await fetch(
            `https://api.are.na/v2/channels/gallery-5sy-esdksbc?per=${perPage}&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (page === 1) {
            fetchedData = data;
          }
          allContents = allContents.concat(data.contents);
          page++;
        } while (allContents.length < fetchedData.contents_count);

        // Filter for image blocks (blocks with class "image" and a valid URL)
        const imageBlocks = allContents.filter(
          (block) =>
            block.class &&
            block.class.toLowerCase() === "image" &&
            (block.image?.original?.url || block.image?.url)
        );
        setImages(imageBlocks);
      } catch (err) {
        console.error("Error fetching gallery channel:", err);
        setError("Error fetching gallery data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryChannel();
  }, []);

  // Shuffle the images array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    let newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleShuffle = () => {
    setImages((prevImages) => shuffleArray(prevImages));
  };

  if (loading) {
    return <div className={styles.galleryContainer}></div>;
  }

  if (error) {
    return <div className={styles.galleryContainer}></div>;
  }

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.galleryContainer}>
        {images.length > 0 ? (
          <div className={styles.galleryGrid}>
            {images.map((block, index) => {
              const imageUrl = block.image?.original?.url || block.image?.url;
              return imageUrl ? (
                <div
                  key={index}
                  className={styles.galleryItem}
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <img src={imageUrl} alt={block.title || `Image ${index}`} />
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <p>No images found.</p>
        )}
        {selectedImage && (
          <div className={styles.modal} onClick={() => setSelectedImage(null)}>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className={styles.modalImage}
            />
          </div>
        )}
        <button className={styles.shuffleButton} onClick={handleShuffle}>
          Shuffle Gallery
        </button>
      </div>
    </div>
  );
};

export default Gallery;
