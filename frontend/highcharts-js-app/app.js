document.addEventListener("DOMContentLoaded", function () {
  const dashboard = document.getElementById("dashboard");
  const plotArea = document.getElementById("plotArea");
  const emptyMessage = document.getElementById("emptyMessage");

  let plotData = null;
  let plotType = "scatter";

  // Dashboard event listeners
  dashboard.addEventListener("click", function (event) {
    if (event.target.id === "scatter3dBtn") {
      setPlotType("scatter");
    } else if (event.target.id === "surfaceBtn") {
      setPlotType("surface");
    } else if (event.target.id === "mesh3dBtn") {
      setPlotType("mesh");
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
      const chartOptions = {
        chart: {
          type: plotType === "surface" ? "surface" : "scatter",
          renderTo: plotArea,
          width: 800,
          height: 600,
        },
        title: {
          text: "Wykres danych obrazu TIFF",
        },
        series: [
          {
            data: plotData.map((entry) => [
              parseFloat(entry.X),
              parseFloat(entry.Y),
              parseFloat(entry.Z),
            ]),
            colorByPoint: plotType !== "surface",
            marker: {
              radius: 5,
              symbol: plotType === "surface" ? "circle" : "circle",
            },
          },
        ],
      };

      // TODO DODAĆ 3D I KOLOR PUNKTU
      // const seriesData = plotData.map((entry) => ({
      //   x: parseFloat(entry.X),
      //   y: parseFloat(entry.Y),
      //   z: parseFloat(entry.Z),
      //   color: `rgb(${entry.Red}, ${entry.Green}, ${entry.Blue})`,
      // }));

      // const chartOptions = {
      //   chart: {
      //     type: plotType === "surface" ? "surface" : "scatter",
      //     renderTo: plotArea,
      //     width: 800,
      //     height: 600,
      //   },
      //   title: {
      //     text: "Wykres danych obrazu TIFF",
      //   },
      //   series: [
      //     {
      //       data: seriesData,
      //       colorByPoint: plotType !== "surface",
      //       marker: {
      //         radius: 5,
      //         symbol: plotType === "surface" ? "circle" : "circle",
      //       },
      //     },
      //   ],
      // };

      if (plotType === "surface") {
        chartOptions.xAxis = {
          title: {
            text: "X",
          },
        };
        chartOptions.yAxis = {
          title: {
            text: "Y",
          },
        };
      }

      const chart = new Highcharts.Chart(chartOptions);
      emptyMessage.style.display = "none";
    } else {
      plotArea.innerHTML = '<div class="empty"><h2>Załaduj plik</h2></div>';
    }
  }
});
