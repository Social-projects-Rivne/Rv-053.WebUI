import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./MapBox.css";

const Map = () => {
  const [map, setMap] = useState(null);
  const [view, setView] = useState({ lng: 10, lat: 34, zoom: 2 });
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFyaW5hZnJhbmtvIiwiYSI6ImNrNjk2cjM0ZjAzbHkzbXFjYTVuM3dvYnYifQ.0IFFeaH9kfUpAvpaUt46lw";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: "map_wrapper",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [view.lng, view.lat],
        zoom: view.zoom
      });

      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          placeholder: "Search the place for your event"
        })
      );

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      map.on("move", () => {
        setView({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} id="map_wrapper" />;
};

export default Map;
