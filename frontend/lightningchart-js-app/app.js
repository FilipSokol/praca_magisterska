// document.addEventListener("DOMContentLoaded", function () {
//   const dashboard = document.getElementById("dashboard");
//   const plotArea = document.getElementById("plotArea");
//   const emptyMessage = document.getElementById("emptyMessage");

//   let plotData = null;
//   let plotType = "scatter3d";

//   // Dashboard event listeners
//   dashboard.addEventListener("click", function (event) {
//     if (event.target.id === "scatter3dBtn") {
//       setPlotType("scatter3d");
//     } else if (event.target.id === "surfaceBtn") {
//       setPlotType("surface");
//     } else if (event.target.id === "mesh3dBtn") {
//       setPlotType("mesh3d");
//     }
//   });

//   document
//     .getElementById("fileInput")
//     .addEventListener("change", handleFileChange);

//   function handleFileChange(event) {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = function (e) {
//         Papa.parse(e.target.result, {
//           header: true,
//           complete: function (result) {
//             plotData = result.data;
//             renderPlot();
//           },
//         });
//       };

//       reader.readAsText(file);
//     }
//   }

//   function setPlotType(type) {
//     plotType = type;
//     renderPlot();
//   }

//   function renderPlot() {
//     if (plotData) {
//       const scatterChart = {
//         type: plotType,
//         mode: "markers",
//         x: plotData.map((entry) => entry.X),
//         y: plotData.map((entry) => entry.Y),
//         z: plotData.map((entry) => entry.Z),
//         marker: {
//           color: plotData.map(
//             (entry) => `rgb(${entry.Red}, ${entry.Green}, ${entry.Blue})`
//           ),
//           size: 5,
//         },
//       };

//       Plotly.newPlot(plotArea, [scatterChart], {
//         height: 520,
//         title: "Wykres danych obrazu TIFF",
//       });
//       emptyMessage.style.display = "none";
//     } else {
//       plotArea.innerHTML = '<div class="empty"><h2>Załaduj plik</h2></div>';
//     }
//   }
// });

// ! =======================================================
// // import { lightningChart } from "@arction/lcjs";
// const { lightningChart } = lcjs;

// const lc = lightningChart({
//   // Valid until 12/10/2024
//   license:
//     "0002-n4vt0UI2OVmWSrUzfqQzVROdFPiEKwCK7ehWLjNVglK/P6Yc61D6CTyN7rnicFw7F48d8HA82T+LUOv/a0W6S9v0-MEYCIQD/S2ytmbLBdsjr6Vto2gHiTuod6A3qt6XId4Yu9t1FqwIhAK2xOY/1cN2MZCkcu52Fo/IQwRdvM7FV1KCb2kV6UL6P",
//   licenseInformation: {
//     appTitle: "LightningChart JS Trial",
//     company: "LightningChart Ltd.",
//   },
// });
// // const chart = lc.ChartXY();

// const chart = lc.ChartXY();

// const dataSet = { x: 1, y: 1 };
// chart.addLineSeries({ dataPattern: { pattern: "ProgressiveX" } }).add(dataSet); // { x: number, y: number }[]
// ! =======================================================

const { lightningChart, ColorRGBA, PointStyle3D, SolidFill, Themes } = lcjs;

const lc = lightningChart({
  // Valid until 12/10/2024
  license:
    "0002-n4vt0UI2OVmWSrUzfqQzVROdFPiEKwCK7ehWLjNVglK/P6Yc61D6CTyN7rnicFw7F48d8HA82T+LUOv/a0W6S9v0-MEYCIQD/S2ytmbLBdsjr6Vto2gHiTuod6A3qt6XId4Yu9t1FqwIhAK2xOY/1cN2MZCkcu52Fo/IQwRdvM7FV1KCb2kV6UL6P",
  licenseInformation: {
    appTitle: "LightningChart JS Trial",
    company: "LightningChart Ltd.",
  },
});

// Create a new ChartXY.
const chart3D = lightningChart().Chart3D({
  theme: Themes.dark,
});

// Add a line series using default X, Y and Z axes.
var series = chart3D.addPointSeries();

// Set Axis titles
chart3D.getDefaultAxisX().setTitle("Oś X");
chart3D.getDefaultAxisY().setTitle("Oś Y");
chart3D.getDefaultAxisZ().setTitle("Oś Z");

function createColor(cords, color) {
  const newSeries = chart3D.addPointSeries();

  newSeries.setPointStyle(
    new PointStyle3D.Triangulated({
      fillStyle: newSeries.getPointStyle().getFillStyle(),
      size: 5,
      shape: "cube",
    })
  );

  newSeries.add(cords);
}

// ! Jakiś kwadrat się respi
// chart3D.addSurfaceGridSeries({
//   columns: 100,
//   rows: 200,
// });
// ! ========================================

// ! Zabawa ze stylami

// series.setPointStyle(
//   new PointStyle3D.Triangulated({
//     // size: pointSize,
//     size: 3,
//     shape: "sphere",
//     // fillStyle: new SolidFill({ color: ColorHEX(color) }).setA(opacity) })
//     fillStyle: new SolidFill({ color: ColorRGBA("255,1,1") }).setA(100),
//   })
// );
// ! ========================================

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
    // if (plotData) {
    //   const scatterChart = {
    //     type: plotType,
    //     mode: "markers",
    //     x: plotData.map((entry) => entry.X),
    //     y: plotData.map((entry) => entry.Y),
    //     z: plotData.map((entry) => entry.Z),
    //     marker: {
    //       color: plotData.map(
    //         (entry) => `rgb(${entry.Red}, ${entry.Green}, ${entry.Blue})`
    //       ),
    //       size: 5,
    //     },
    //   };

    //   Plotly.newPlot(plotArea, [scatterChart], {
    //     height: 520,
    //     title: "Wykres danych obrazu TIFF",
    //   });
    //   emptyMessage.style.display = "none";
    // } else {
    //   plotArea.innerHTML = '<div class="empty"><h2>Załaduj plik</h2></div>';
    // }
    if (plotData) {
      console.log("plotData", plotData);

      // const scatterChart = plotData.map((data) => {
      //   return {
      // x: data.X,
      // y: data.Y,
      // z: data.Z,
      //     color: ColorRGBA(255, 0, 255),
      //     // ! fillStyle: ColorRGBA(255, 255, 255),
      //   };
      // });

      const TESTDATA = [
        { X: 0, Y: 0, Z: 0, color: ColorRGBA(255, 0, 0) }, // Czerwony
        { X: 1, Y: 1, Z: 1, color: ColorRGBA(0, 255, 0) }, // Zielony
        { X: 2, Y: 2, Z: 2, color: ColorRGBA(0, 0, 255) }, // Niebieski
        { X: 3, Y: 3, Z: 3, color: ColorRGBA(255, 255, 0) }, // Żółty
      ];

      // const scatterChart = plotData.map((data) => {
      const scatterChart = plotData.map((data) => {
        createColor({ x: data.X, y: data.Y, z: data.Z }, null);
      });

      console.log(scatterChart);
      // ? series.add(scatterChart);

      // ? chart3D
      // ?  .getDefaultAxisY()
      // ?  .setInterval({ start: 0, end: 150, animate: 2000 });

      // Dodanie danych do serii punktów
      // series.add(
      //   data.map(({ x, y, z, color }) => ({
      //     x,
      //     y,
      //     z,
      //   }))
      // );
      // series.add(scatterChart);
    } else {
      plotArea.innerHTML = '<div class="empty"><h2>Załaduj plik</h2></div>';
    }
  }
});
