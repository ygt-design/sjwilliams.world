// src/pages/Home/Home.js
import React, { useRef, useEffect } from "react";
import p5 from "p5";
import "./Home.module.css"; // Optional CSS for additional styling

const Home = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let customFont;
      let textStr = "sjwilliams";
      let textImage;
      let centerX, centerY, maxDist;

      p.preload = () => {
        // Make sure Seagram.otf is placed at public/assets/fonts/Seagram.otf
        customFont = p.loadFont("/fonts/Seagram.otf");
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(255);
        // Use customFont if available; otherwise fallback to Helvetica.
        p.textFont(customFont || "Helvetica");
        textImage = p.createGraphics(p.width, p.height);
        const ctx = textImage.elt.getContext("2d", {
          willReadFrequently: true,
        });
        textImage.drawingContext = ctx;
        textImage.pixelDensity(1);
        updateCenter();
      };

      // Calculate center and maximum distance.
      const updateCenter = () => {
        centerX = p.width / 2;
        centerY = p.height / 2;
        const d1 = p.dist(centerX, centerY, 0, 0);
        const d2 = p.dist(centerX, centerY, p.width, 0);
        const d3 = p.dist(centerX, centerY, 0, p.height);
        const d4 = p.dist(centerX, centerY, p.width, p.height);
        maxDist = p.max(d1, d2, d3, d4);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        updateCenter();
      };

      p.draw = () => {
        p.background(255);

        // Increase gridStep (fewer circles).
        let gridStep = p.map(p.mouseX, 0, p.width, 5, 10);
        // Responsive font size relative to canvas width.
        let fontSize = p.width / 5;

        // Create offscreen graphics buffer to render text.
        textImage.background(255);
        textImage.textFont(customFont || "Helvetica");
        textImage.textSize(fontSize);
        textImage.textAlign(p.CENTER, p.CENTER);
        textImage.fill(0);
        textImage.text(textStr, p.width / 2, p.height / 2);
        textImage.loadPixels();

        let dMin = 2;
        let dMax = gridStep;

        // Loop over the canvas using gridStep spacing.
        for (let y = 0; y < p.height; y += gridStep) {
          for (let x = 0; x < p.width; x += gridStep) {
            let ix = p.floor(x);
            let iy = p.floor(y);
            let index = (ix + iy * textImage.width) * 4;
            let brightnessValue = textImage.pixels[index];

            // Base circle diameter from brightness.
            let diameter = p.map(brightnessValue, 0, 255, dMax, dMin);

            // Increase size near mouse.
            let dMouse = p.dist(x, y, p.mouseX, p.mouseY);
            let mouseFactor = p.map(dMouse, 0, 150, 1.5, 1);
            mouseFactor = p.constrain(mouseFactor, 1, 1.5);
            diameter *= mouseFactor;

            // Variation via Perlin noise.
            let noiseFactor = p.noise(x * 0.05, y * 0.05);
            let varietyScale = p.map(noiseFactor, 0, 1, 0.75, 1.25);
            diameter *= varietyScale;

            // Calculate distance from center.
            let dCenter = p.dist(x, y, centerX, centerY);
            // Map distance to a scaling factor (1 at center, 0 at edges).
            let scaleFactor = p.map(dCenter, 0, maxDist, 1, 0);
            scaleFactor = p.constrain(scaleFactor, 0, 1);

            // For light areas, apply the scaling factor; for dark, keep full size.
            let finalScale = brightnessValue > 128 ? scaleFactor : 1;
            let finalDiameter = diameter * finalScale;

            p.noStroke();
            p.fill(0);
            p.ellipse(x, y, finalDiameter, finalDiameter);
          }
        }
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);
    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default Home;
