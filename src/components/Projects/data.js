// src/components/Projects/data.js

// === Image imports ===
import portfolio from "../../assets/Images/portfolio.png";
import nft from "../../assets/Images/nft.png";
import skinstric from "../../assets/Images/Skinstric.png";
import vinylrecord from "../../assets/Images/VinylRecord.png";
import movieapi from "../../assets/Images/movieAPI.png";
import youtubeclone from "../../assets/Images/youtubeclone.png";

// === Project data ===
export const PROJECTS = [
  {
    title: "Portfolio 2025",
    description:
      "Personal portfolio showcasing selected projects and experience as a frontend developer.",
    tags: ["React", "Vite", "Framer Motion"],
    image: portfolio,
    live: "https://areyes-portfolio.vercel.app",
    code: "https://github.com/angelmonoestereo/portfolio",
  },
  {
    title: "Skinstric AI",
    description:
      "Frontend for an AI-powered skincare analysis app with a modern and responsive interface.",
    tags: ["React", "Tailwind", "Vercel"],
    image: skinstric,
    live: "https://skinstric-two.vercel.app",
    code: "https://github.com/angelmonoestereo/skinstric",
  },
  {
    title: "NFT Internship",
    description:
      "NFT marketplace UI built during internship with API integration and dynamic routing.",
    tags: ["React", "Vite", "Framer Motion"],
    image: nft,
    live: "https://angel-internship.vercel.app",
    code: "https://github.com/AngelMonoestereo/angel-internship",
  },
  {
    title: "Record Store",
    description:
      "A record search tool using the Discogs API to find vinyls, prices, and artist details.",
    tags: ["React", "API", "Styled Components"],
    image: vinylrecord,
    live: "https://react-record-store-api.vercel.app",
    code: "https://github.com/AngelMonoestereo/React-Record-Store-API.git",
  },
  {
    title: "Movie Finder",
    description:
      "Movie search app built with TMDB API showing trending movies, trailers, and ratings.",
    tags: ["React", "API", "Styled Components"],
    image: movieapi,
    live: "https://react-movies-clone-v2.vercel.app/",
    code: "https://github.com/AngelMonoestereo/react-movies-clone-v2.git",
  },
  {
    title: "YouTube Clone",
    description:
      "Video streaming clone inspired by YouTube with search, playback, and responsive layout.",
    tags: ["React", "CSS", "API"],
    image: youtubeclone,
    live: "https://youtube-clone-react-v5l4.vercel.app",
    code: "https://github.com/AngelMonoestereo/youtube-clone-react.git",
  },
];
