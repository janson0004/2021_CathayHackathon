import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import styled from "styled-components/macro";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { RestaurantsContext } from "../contexts/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./images/Cathay_logo.png";
import AsiaMileButton from "./images/AsiaMileButton.png";
import RecommendRes from "../components/RecommendRes";
import HorizontalScroll from "react-scroll-horizontal";

const Home = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "390px",
  };
  const onMapLoad = useCallback((map) => {
    googleMap.current = map;
  }, []);
  const googleMap = useRef();
  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };
  const [libraries] = useState(["places"]);
  const [center, setCenter] = useState({
    lat: 22.310993034714123,
    lng: 114.24018913494935,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });
  const [restaurants, setRestaurant] = useState(null);
  //   const history = useNavigate();
  useEffect(() => {
    axios
      .get("/restaurant", { withCredentials: true })
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  if (loadError) return "";
  if (!isLoaded) return "";

  return (
    <>
      <NavBar>
        <img src={AsiaMileButton} />
        <CathayLogo src={Logo} />
        <div />
      </NavBar>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        ref={googleMap}
        onLoad={onMapLoad}
      >
        {restaurants
          ? restaurants.map((marker, index) => (
              <Marker
                key={marker.name}
                position={{
                  lat: marker.coordinates.lat,
                  lng: marker.coordinates.lng,
                }}
              />
            ))
          : ""}
      </GoogleMap>
      <Title>Recommend for you</Title>
      <RecomendDiv>
        {restaurants
          ? restaurants.map((place, index) => (
              <RecommendRes restaurant={place} />
            ))
          : ""}
      </RecomendDiv>
    </>
  );
};

export default Home;

const RecomendDiv = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 135px;
  padding-left: 16px;
  align-items: center;
`;
const Title = styled.h2`
  padding-top: 37px;
  font-weight: 500;
  font-size: 18px;
  color: #4c4c4c;
  padding-left: 16px;
`;
const Text = styled.p``;

const NavBar = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  padding-left: 16px;
  justify-content: space-between;
`;

const CathayLogo = styled.img``;
