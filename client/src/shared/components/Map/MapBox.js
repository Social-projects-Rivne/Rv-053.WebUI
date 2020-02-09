import React,{useState,useEffect,useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './MapBox.css';


const styles = {
  width: "100%",
  height: "450px"
};

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW5hZnJhbmtvIiwiYSI6ImNrNjk2cjM0ZjAzbHkzbXFjYTVuM3dvYnYifQ.0IFFeaH9kfUpAvpaUt46lw';
const Map = () => {
  const [map, setMap] = useState(null);
  const [view,setView] = useState({lng: 32, lat: 49,zoom: 5})
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer}) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [view.lng, view.lat],
        zoom: view.zoom
      });
      const geocoder =   new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search the place for your event'
        })
      map.addControl(geocoder);
      map.on("load", () => {
        setMap(map);
        map.resize();
        console.log(view);
      });

      map.on('move', () => {
        setView({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
    };
 
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)}  style={styles} />
};
export default Map