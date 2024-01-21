/* eslint-disable react/prop-types */

import "./styles.css";
import Papa from "papaparse";

function Dashboard(props) {
  const { setPlotData, setPlotType } = props;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        Papa.parse(e.target.result, {
          header: true,
          complete: (result) => {
            setPlotData(result.data);
          },
        });
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className="dashboard">
      <div className="buttons">
        <div className="plotTypes">
          <button onClick={() => setPlotType("scatter3d")}>Scatter 3D</button>
          <button onClick={() => setPlotType("surface")}>Surface 3D</button>
          <button onClick={() => setPlotType("mesh3d")}>Mesh 3D</button>
        </div>
        <div className="dataInput">
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
