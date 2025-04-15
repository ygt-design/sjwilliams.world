// src/ChannelList.js
import React, { useState, useEffect } from "react";

const ACCESS_TOKEN = "J7ruXpTpvNRJGQNdJ6x4d_a2Pr396ODnIWFWVei_-1E";

const ChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          "https://api.are.na/v2/groups/sjwilliams-world/channels?per=100&page=1",
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API response:", data); // Inspect the structure

        // Set the channels from the returned data.
        if (data.channels) {
          setChannels(data.channels);
        } else {
          setChannels([]);
        }
      } catch (err) {
        console.error("Error fetching channels:", err);
        setError(err.message);
      }
    };

    fetchChannels();
  }, []);

  if (error) {
    return <div>Error fetching channels: {error}</div>;
  }

  return (
    <div>
      {channels.length ? (
        channels.map((channel) => <p key={channel.id}>{channel.title}</p>)
      ) : (
        <p>Loading channels...</p>
      )}
    </div>
  );
};

export default ChannelList;
