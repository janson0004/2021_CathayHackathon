import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import styled from "styled-components/macro";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Home() {
  const mapContainerStyle = {
    width: "100%",
    height: "700px",
  };
  const onMapLoad = useCallback((map) => {
    googleMap.current = map;
  }, []);
  const googleMap = useRef();
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
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

  if (loadError) return "";
  if (!isLoaded) return "";
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      options={options}
      ref={googleMap}
      onLoad={onMapLoad}
    />
  );
}

export default Home;
