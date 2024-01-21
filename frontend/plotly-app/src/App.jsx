import { useState } from "react";

import "./App.css";
import Dashboard from "./components/dashboard";
import PlotArea from "./components/plotArea";

function App() {
  const [plotData, setPlotData] = useState(null);
  const [plotType, setPlotType] = useState("scatter3d");

  return (
    <main>
      <Dashboard {...{ setPlotType, setPlotData }} />
      <PlotArea {...{ plotData, plotType, setPlotData }} />
    </main>
  );
}

export default App;
