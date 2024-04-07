/* eslint-disable react/prop-types */

import "./styles.css";
import Plot from "react-plotly.js";

function PlotArea(props) {
  const { plotData, plotType } = props;

  const scatterChart = plotData
    ? {
        type: plotType,
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

  return (
    <div className="plots">
      {plotData ? (
        <Plot
          data={[scatterChart]}
          autosize
          layout={{ height: 520, title: "Wykres danych obrazu TIFF" }}
        />
      ) : (
        <div className="empty">
          <h2>Załaduj plik</h2>
        </div>
      )}
    </div>
  );
}

export default PlotArea;
