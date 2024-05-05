document.addEventListener("DOMContentLoaded", function () {
  const dashboard = document.getElementById("dashboard");
  const plotArea = document.getElementById("plotArea");
  const emptyMessage = document.getElementById("emptyMessage");

  let plotData = null;
  let plotType = "scatter3d";

  // Dashboard event listeners
  dashboard.addEventListener("click", function (event) {
    if (event.target.id === "scatter3dBtn") {
      setPlotType("scatter3d");
    } else if (event.target.id === "surfaceBtn") {
      setPlotType("surface");
    } else if (event.target.id === "mesh3dBtn") {
      setPlotType("mesh3d");
    }
  });

  document
    .getElementById("fileInput")
    .addEventListener("change", handleFileChange);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        Papa.parse(e.target.result, {
          header: true,
          complete: function (result) {
            plotData = result.data;
            renderPlot();
          },
        });
      };

      reader.readAsText(file);
    }
  }

  function setPlotType(type) {
    plotType = type;
    renderPlot();
  }

  function renderPlot() {
    if (plotData) {
      const scatterChart = {
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
      };

      Plotly.newPlot(plotArea, [scatterChart], {
        height: 520,
        title: "Wykres danych obrazu TIFF",
      });
      emptyMessage.style.display = "none";
    } else {
      plotArea.innerHTML = '<div class="empty"><h2>Załaduj plik</h2></div>';
    }
  }
});
