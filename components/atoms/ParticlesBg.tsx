"use client"

import React, { useEffect } from "react";
import ParticlesConfig from "./particles-config"; // Your particle configuration
import "particles.js";

const ParticleBackground = () => {
  const initializeParticles = () => {
   
    particlesJS("particles-js", ParticlesConfig, function () {
      console.log("Particles loaded"); // Optional callback when particles are loaded
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
    initializeParticles(); // Call the initialization function when the component mounts
    }
}, []);

  return <div id="particles-js" className="fixed top-0 left-0 w-full h-full z-0"/>; // The container element for particles
};

export default ParticleBackground;

