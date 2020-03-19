import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './MapBox.css';
import axios from 'axios';

const Map = () => {
  const [map, setMap] = useState(null);
  const [view, setView] = useState({ lng: 31.16558, lat: 48.379433, zoom: 5 });
  const mapContainer = useRef(null);
  const getGetCoordinate = async () => {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/rivne.json?access_token=pk.eyJ1IjoibWFyaW5hZnJhbmtvIiwiYSI6ImNrNjk2cjM0ZjAzbHkzbXFjYTVuM3dvYnYifQ.0IFFeaH9kfUpAvpaUt46lw&autocomplete=true&proximity=${view.lng}%2C48.379433`
    );
    console.log(res);
  };
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWFyaW5hZnJhbmtvIiwiYSI6ImNrNjk2cjM0ZjAzbHkzbXFjYTVuM3dvYnYifQ.0IFFeaH9kfUpAvpaUt46lw';
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: 'map_wrapper',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [view.lng, view.lat],
        zoom: view.zoom
      });

      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          placeholder: 'Search the place for your event'
        })
      );

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
      map.on('move', () => {
        setView({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
    };
    getGetCoordinate();
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} id="map_wrapper" />;
};

export default Map;
