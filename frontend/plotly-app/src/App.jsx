import { useState } from "react";

import "./App.css";
import Dashboard from "./components/dashboard";
import PlotArea from "./components/plotArea";

function App() {
  const [plotData, setPlotData] = useState(null);
  const [plotType, setPlotType] = useState(null);

  return (
    <main>
      <Dashboard {...{ setPlotData, setPlotType }} />
      <PlotArea {...{ plotData, plotType }} />
    </main>
  );
}

export default App;
