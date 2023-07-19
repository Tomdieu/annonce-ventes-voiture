import "mapbox-gl/dist/mapbox-gl.css";
import { Analytics } from "@vercel/analytics/react";
import Routes from "./routes";

function App() {
  return (
    <>
      <Routes />
      <Analytics />
    </>
  );
}

export default App;
