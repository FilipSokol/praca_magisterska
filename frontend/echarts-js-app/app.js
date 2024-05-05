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

  // TODO ====================================================================================================================================
  // TODO 1) Echart posiada wiele innych fajnych rzeczy jak np 3D surface
  // TODO 2) Punkty w środu mają jakąś dziwną przezroczystość
  // TODO ====================================================================================================================================

  function renderPlot() {
    if (plotData) {
      var myChart = echarts.init(document.getElementById("plotArea"));

      const scatterData = plotData.map((p) => ({
        name: "point",
        value: [p.X, p.Y, p.Z],
        itemStyle: {
          color: `rgb(${p.Red},${p.Green},${p.Blue})`,
        },
      }));

      option = {
        tooltip: {},
        visualMap: {
          show: false,
        },
        xAxis3D: {
          type: "value",
        },
        yAxis3D: {
          type: "value",
        },
        zAxis3D: {
          type: "value",
        },
        grid3D: {
          boxWidth: 150,
          boxDepth: 150,
          boxHeight: 150,
          axisLine: {
            lineStyle: { color: "#fff" },
          },
          axisPointer: {
            lineStyle: { color: "#fff" },
          },
        },
        series: [
          {
            type: "scatter3D",
            data: scatterData,
            symbolSize: 7,
          },
        ],
      };

      myChart.setOption(option);
    } else {
      plotArea.innerHTML = '<div class="empty"><h2>Załaduj plik</h2></div>';
    }
  }
});
