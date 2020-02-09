import React,{useState,useEffect,useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './MapBox.css';

const styles = {
  width: "100%",
  heigh: "400px"
};

  // mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW5hZnJhbmtvIiwiYSI6ImNrNjk2cjM0ZjAzbHkzbXFjYTVuM3dvYnYifQ.0IFFeaH9kfUpAvpaUt46lw';
  
// const Map = (props) => {

  // const [view,setView] = useState({lng: 5, lat: 34,zoom: 2})


//   useEffect((view) => {
//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-79.4512, 43.6568],
//       zoom: 13
//     });

// map.addControl(
// new MapboxGeocoder({
// accessToken: mapboxgl.accessToken,
// mapboxgl: mapboxgl
// })
// );
  //   map.on('move', () => {
  //     setView({
  //       lng: map.getCenter().lng.toFixed(4),
  //       lat: map.getCenter().lat.toFixed(4),
  //       zoom: map.getZoom().toFixed(2)
  //     });
  //   });
  //  })

//     return (
//       <div>
//         <div className='sidebarStyle'>
//           <div>Longitude: {view.lng} | Latitude: {view.lat} | Zoom: {view.zoom}</div>
//         </div>
//         <div className='map' />
//       </div>
//     )
// }

const Map = () => {
  const [map, setMap] = useState(null);
  const [view,setView] = useState({lng: 5, lat: 34,zoom: 2})
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW5hZnJhbmtvIiwiYSI6ImNrNjk2cjM0ZjAzbHkzbXFjYTVuM3dvYnYifQ.0IFFeaH9kfUpAvpaUt46lw';
    const initializeMap = ({ setMap, mapContainer}) => {
      const map = new mapboxgl.Map({
        container: 'map_wrapper',
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
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
      
      map.on("load", () => {
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

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} id = "map_wrapper" style={styles} />;
};

export default Map



// class Map extends React.Component {
//   constructor(props) {
//   super(props);
//     this.state = {
//       lng: 5,
//       lat: 34,
//       zoom: 2
//     };
//   }


//   componentDidMount() {
//     const map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [this.state.lng, this.state.lat],
//       zoom: this.state.zoom
//     });

// map.addControl(
// new MapboxGeocoder({
// accessToken: mapboxgl.accessToken,
// mapboxgl: mapboxgl
// })
// );

//     map.on('move', () => {
//       this.setState({
//         lng: map.getCenter().lng.toFixed(4),
//         lat: map.getCenter().lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2)
//       });
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div className='sidebarStyle'>
//           <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
//         </div>
//         <div ref={el => this.mapContainer = el} className='mapContainer' />
//       </div>
//     )
//   }
// }
