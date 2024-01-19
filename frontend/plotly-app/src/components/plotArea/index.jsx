/* eslint-disable react/prop-types */

import { useEffect } from "react";
import "./styles.css";
import Plot from "react-plotly.js";

function PlotArea(props) {
  const { plotData, plotType } = props;

  const scatterChart = plotData
    ? {
        type: "scatter3d",
        mode: "markers",
        x: plotData.map((entry) => entry.X),
        y: plotData.map((entry) => entry.Y),
        z: plotData.map((entry) => entry.Z),
        marker: {
          color: plotData.map(
            (entry) => `rgb(${entry.Red}, ${entry.Green}, ${entry.Blue})`
          ),
          size: 5,
        },
      }
    : null;

  useEffect(() => console.log(plotData), [plotData]);
  return (
    <div className="plots">
      <h1>Analiza danych i wykresy</h1>
      {plotData && (
        <Plot
          data={[scatterChart]}
          layout={{ width: 800, height: 600, title: "Wykres 3D" }}
        />
      )}

      {/* <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      /> */}
    </div>
  );
}

export default PlotArea;
