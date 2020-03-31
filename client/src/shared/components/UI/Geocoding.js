import axios from 'axios';

async function getAddressFromLatLng(lat, lng) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCrCWMafmkZoPvQTa-I5BGWKbjgryBaKWQ`;
  const response = await axios
    .get(url)
    .then(response => response.data.results[0]);
  return response;
}

export const returnAddress = (lat, lng) => {
  return getAddressFromLatLng(lat, lng);
};
