import React, { useState } from "react";
import { connect } from "react-redux";
import Beers from "./Beers";
import Particles from "react-tsparticles";
import {
  getBeer,
  onSort,
  setBeers,
  changeCurrentPage,
  changePagesCount,
} from "../redux/bear-reduser";
import { getBeersByFood, getBeersByFoodInPage, getPage } from "../api/api";
import { colorPalette } from "./color";
import spinner from "../assets/Spinner-1s-200px.svg"

let BeersContainer = (props) => {
  const [loading,setLoading]=useState(true)

  let combined = (food) => {
    getBeersByFood(food).then((response) => {
      props.changePagesCount(response.data.length);
      setLoading(false)
    });
    getBeersByFoodInPage(food).then((response) =>{
      props.setBeers(response.data)
      setLoading(false)
    }
    );
  };
  let changePage = (page, food) => {
    getPage(page, food).then((response) => props.setBeers(response.data));
  };

  const particlesInit = (main) => {
    // console.log(main);
    // loadBubblesPreset(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };
  const options = {
    fpsLimit: 60,
    particles: {
      number: {
        value: 0,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 1,
        random: false,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0,
          sync: false,
        },
      },
      size: {
        value: 10,
        random: { enable: true, minimumValue: 6 },
        animation: {
          enable: false,
          speed: 20,
          minimumValue: 6,
          sync: false,
        },
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: -0.5,
        },
        speed: 10,
        direction: "top",
        random: false,
        straight: false,
        outModes: {
          default: "destroy",
          bottom: "none",
        },
        attract: {
          enable: true,
          distance: 300,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        resize: true,
      },
    },
    detectRetina: true,
    background: "none",
    emitters: [
      {
        direction: "top",
        particles: {
          color: colorPalette[4],
        },
        rate: {
          quantity: 1,
          delay: 0.1,
        },
        size: {
          width: 100,
          height: 10,
        },
        position: {
          x: 50,
          y: 100,
        },
      },
      {
        direction: "top",
        particles: {
          color: colorPalette[3],
        },
        rate: {
          quantity: 2,
        },
        size: {
          width: 100,
          height: 10,
        },
        position: {
          x: 50,
          y: 100,
        },
      },
    ],
  };

  return (
    <>
      <Particles
        id="tsparticles"
        options={options}
        init={particlesInit}
        loaded={particlesLoaded}
      />
    {props.beers ?
      <Beers
        beers={props.beers}
        changeCurrentPage={props.changeCurrentPage}
        currentPage={props.currentPage}
        pagesCount={props.pagesCount}
        combined={combined}
        changePage={changePage}
        onSort={props.onSort}
        setLoading={setLoading}
        loading={loading}
      />
    :<div className="spinner_container"><img src={spinner} alt=""/></div> }
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    beers: state.bearReduser.beers,
    currentPage: state.bearReduser.currentPage,
    pagesCount: state.bearReduser.pagesCount,
  };
};

export default connect(mapStateToProps, {
  setBeers,
  getBeer,
  onSort,
  changeCurrentPage,
  changePagesCount,
})(BeersContainer);
