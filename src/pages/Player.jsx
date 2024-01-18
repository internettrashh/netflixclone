import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/y2mate.com - Stranger Things Season 4 Trailer  Rotten Tomatoes TV_v720P.mp4";

function Player() {
    const navigate = useNavigate();

  return (
    <Container>
    <div className="player">
      <div className="back">
        <BsArrowLeft onClick={() => navigate(-1)} />
      </div>
      <video src={video} autoPlay loop controls muted />
    </div>
  </Container>
  )
}
const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

export default Player
