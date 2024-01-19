/* eslint-disable react/prop-types */

import "./styles.css";
import Papa from "papaparse";

function Dashboard(props) {
  const { setPlotData, setPlotType } = props;

  // const handleFileChange = (e) => {
  //   console.log(e.target.files[0]);

  //   if (e.target.files) {
  //     setPlotData(e.target.files[0]);
  //   }
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Parsuj dane z pliku CSV
        Papa.parse(e.target.result, {
          header: true,
          complete: (result) => {
            setPlotData(result.data);
          },
        });
      };

      // Odczytaj zawartość pliku
      reader.readAsText(file);
    }
  };

  return (
    <div className="dashboard">
      <div className="buttons">
        <button onClick={() => console.log("test")}>1</button>
        <button onClick={() => console.log("test")}>1</button>
        <button onClick={() => console.log("test")}>1</button>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        {/* <input type="file" accept=".csv" onChange={() => console.log("test")} /> */}
      </div>
    </div>
  );
}

export default Dashboard;
