import React, { useState, useEffect, useRef, useCallback } from "react";
import WorkItem from "../../components/WorkItem/WorkItem";
import styles from "./Work.module.css";

const ACCESS_TOKEN = "J7ruXpTpvNRJGQNdJ6x4d_a2Pr396ODnIWFWVei_-1E";

const Work = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // Fetch and filter channels on mount
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          "https://api.are.na/v2/groups/sjwilliams-world/channels?per=400&page=1",
          { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
        );
        const data = await response.json();
        const filteredChannels = data.channels.filter(
          (channel) => channel.title && channel.title.startsWith("-")
        );
        setChannels(filteredChannels);
      } catch (error) {
        console.error("Error fetching channels", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  // Duplicate channels for infinite scrolling effect
  const duplicatedChannels = [...channels, ...channels];

  // Wheel handler for horizontal scrolling and infinite loop
  const handleWheel = (e) => {
    const container = containerRef.current;
    if (!container) return;

    // Detect vertical scroll only (wheel, not trackpad horizontal gesture)
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    if (isVerticalScroll) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;

      const halfWidth = container.scrollWidth / 2;

      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = container.scrollLeft - halfWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollLeft + halfWidth;
      }

      const scrollPercent =
        halfWidth > 0 ? container.scrollLeft / halfWidth : 0;
      window.dispatchEvent(
        new CustomEvent("workScroll", { detail: scrollPercent })
      );
    }
  };

  // Callback ref to attach wheel event listener as soon as the node is available
  const setContainerRef = useCallback((node) => {
    if (node !== null) {
      containerRef.current = node;
      node.addEventListener("wheel", handleWheel, { passive: false });
    }
  }, []);

  // Cleanup the event listener on unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  if (loading) {
    // return <div>Loading work items...</div>;
  }

  return (
    <div
      ref={setContainerRef}
      className={styles.workItemsContainer}
      style={{ overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }}
    >
      {duplicatedChannels.map((channel, index) => (
        <WorkItem key={index} channel={channel} index={index} />
      ))}
    </div>
  );
};

export default Work;
