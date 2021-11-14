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
import LandmarkRes from "../components/LandmarkRes";
import Tab from "./images/Tabs.png";
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

  const panTo = useCallback((pan, zoom) => {
    googleMap.current.panTo(pan);
    googleMap.current.setZoom(zoom);
  }, []);

  const [center, setCenter] = useState({
    lat: 22.300594216049767,
    lng: 114.1732205836626,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });
  const [restaurants, setRestaurant] = useState(null);
  const [landmarks, setLandmarks] = useState(null);

  //   const history = useNavigate();
  useEffect(() => {
    axios
      .get("/restaurant", {
        withCredentials: true,
        params: { lat: center.lat, lng: center.lng },
      })
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.log("Error");
      });
    axios
      .get("/landmark", {
        withCredentials: true,
        params: { lat: center.lat, lng: center.lng },
      })
      .then((response) => {
        setLandmarks(response.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  useEffect(() => {
    try {
      panTo(
        {
          lat: center.lat,
          lng: center.lng,
        },
        17
      );

      console.log(center);
    } catch (error) {
      console.log(error);
    }
  }, [restaurants]);

  if (loadError) return "";
  if (!isLoaded) return "";

  return (
    <Wrapper>
      <NavBar>
        <img src={AsiaMileButton} />
        <CathayLogo src={Logo} />
        <EmptyDiv />
      </NavBar>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
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
        {landmarks
          ? landmarks.map((marker, index) => (
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
      <Title>Popular Restaurants Nearby</Title>
      <RecomendDiv>
        {restaurants
          ? restaurants.map((place, index) => (
              <RecommendRes key={index} restaurant={place} />
            ))
          : ""}
      </RecomendDiv>
      <Title>Popular landmark Nearby</Title>
      <RecomendDiv>
        {landmarks
          ? landmarks.map((place, index) => (
              <LandmarkRes key={index} restaurant={place} />
            ))
          : ""}
      </RecomendDiv>
      <Block />
      <Footer src={Tab} />
    </Wrapper>
  );
};

export default Home;

const RecomendDiv = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 135px;
  padding-left: 16px;
  align-items: center;
  -webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Title = styled.h2`
  padding-top: 35px;
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
  padding-right: 16px;
  justify-content: space-between;
`;
const EmptyDiv = styled.div`
  width: 38px;
  height: 17px;
`;
const CathayLogo = styled.img``;

const Wrapper = styled.div`
  overflow: auto;
`;

const Footer = styled.img`
  position: fixed;
  bottom: 0;
`;

const Block = styled.div`
  height: 100px;
`;
