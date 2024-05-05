var chart = null;

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
      chart = new Highcharts.Chart({
        chart: {
          renderTo: "plotArea",
          margin: 100,
          type: "scatter3d",
          animation: false,
          options3d: {
            enabled: true,
            alpha: 10,
            beta: 30,
            // ! depth: 250,
            depth: 1000,
            viewDistance: 5,
            fitToPlot: true,
            frame: {
              bottom: { size: 1, color: "rgba(0,0,0,0.02)" },
              back: { size: 1, color: "rgba(0,0,0,0.04)" },
              side: { size: 1, color: "rgba(0,0,0,0.06)" },
            },
          },
        },
        title: {
          text: "Wykres danych TIFF",
        },
        plotOptions: {
          scatter: {
            width: 10,
            height: 10,
            depth: 10,
          },
        },

        // ! JAK NIE WYŚWIETLA PUNKTY TO TUTAJ COŚ POGRZEBAĆ
        // yAxis: {
        //   min: 0,
        //   max: 100,
        //   title: null,
        // },
        // xAxis: {
        //   min: 0,
        //   max: 100,
        //   gridLineWidth: 1,
        // },
        // zAxis: {
        //   min: 0,
        //   max: 100,
        //   showFirstLabel: false,
        // },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "Data",
            colorByPoint: true,
            accessibility: {
              exposeAsGroupOnly: true,
            },
            turboThreshold: 50000, // ! ŻEBY BYŁO WIĘCEJ PUNKTÓW
            data: plotData.map((data) => {
              return {
                x: parseFloat(data.X),
                y: parseFloat(data.Y),
                z: parseFloat(data.Z),
                color: `rgb(${data.Red},${data.Green},${data.Blue})`,
              };
            }),
            // data: [
            //   { x: 0, y: 1, z: 1, color: "rgb(100,20,100)" },
            //   { x: 10, y: 20, z: 1, color: "rgb(1,100,100)" },
            //   { x: 1, y: 1, z: 20, color: "rgb(1,20,200)" },
            //   { x: 35, y: 1, z: 10, color: "rgb(100,100,0)" },
            // ],
          },
        ],
      });

      // Add mouse and touch events for rotation
      (function (H) {
        function dragStart(eStart) {
          eStart = chart.pointer.normalize(eStart);

          const posX = eStart.chartX,
            posY = eStart.chartY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            sensitivity = 5, // lower is more sensitive
            handlers = [];

          function drag(e) {
            // Get e.chartX and e.chartY
            e = chart.pointer.normalize(e);

            chart.update(
              {
                chart: {
                  options3d: {
                    alpha: alpha + (e.chartY - posY) / sensitivity,
                    beta: beta + (posX - e.chartX) / sensitivity,
                  },
                },
              },
              undefined,
              undefined,
              false
            );
          }

          function unbindAll() {
            handlers.forEach(function (unbind) {
              if (unbind) {
                unbind();
              }
            });
            handlers.length = 0;
          }

          handlers.push(H.addEvent(document, "mousemove", drag));
          handlers.push(H.addEvent(document, "touchmove", drag));

          handlers.push(H.addEvent(document, "mouseup", unbindAll));
          handlers.push(H.addEvent(document, "touchend", unbindAll));
        }
        H.addEvent(chart.container, "mousedown", dragStart);
        H.addEvent(chart.container, "touchstart", dragStart);
      })(Highcharts);
    } else {
      plotArea.innerHTML = '<div class="empty"><h2>Załaduj plik</h2></div>';
    }
  }
});
