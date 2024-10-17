import 'leaflet/dist/leaflet.css'; // Add this line at the top of the file
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
