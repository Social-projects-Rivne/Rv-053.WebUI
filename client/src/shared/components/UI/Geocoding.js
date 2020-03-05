import axios from 'axios';

async function getAddressFromLatLng(lat, lng) {
  const KEY = 'AIzaSyBm7XQkNxvkDvy1KPfh6R_vxuh2BfsADdE';
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${KEY}`;
  const response = await axios
    .get(url)
    .then(response => response.data.results[0]);
  return response;
}

export const returnAddress = (lat, lng) => {
  return getAddressFromLatLng(lat, lng);
};
