export default function toSearchString(obj) {
  return Object.entries(obj)
    .map(entry => entry.join('='))
    .join('&');
}
