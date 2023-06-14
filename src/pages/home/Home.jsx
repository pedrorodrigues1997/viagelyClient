import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="home">
      <Featured />
      
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>The best part? Everything!</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Unlock the world with curated itineraries
            </div>
            <p>
            Explore destinations like never before with our handpicked itineraries crafted by experienced travelers.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Budget-friendly choices
            </div>
            <p>
            Tailored itineraries, catering to every budget.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Save time and energy
            </div>
            <p>
            Our ready-made itineraries take the guesswork out of travel, so you can focus on enjoying the journey.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Discover hidden gems
            </div>
            <p>
            Uncover the hidden treasures of each destination and enjoy the unique experiences.
            </p>
          </div>
          <div className="img">
            <img src="./img/herobanner.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


/*<Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>*/
