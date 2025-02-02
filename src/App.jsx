import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState([]);
  const totalPages = Math.ceil(totalData.length / 5);
  const startIndex = (currentPage - 1) * 5;
  const lastIndex = startIndex + 5;
  const pageData = totalData.slice(startIndex, lastIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const response = await data.json();
        setTotalData(response);
      } catch (e) {
        console.error("Failed to fetch data:", e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Frontend Assignment</h1>
      <div className="container">
        <div className="table-container">
          <table aria-label="Assignment table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Percentage funded</th>
                <th>Amount pledged</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((data) => (
                <tr key={data["s.no"]}>
                  <td>{data["s.no"]}</td>
                  <td>{data["percentage.funded"]}</td>
                  <td>{data["amt.pledged"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="btn-group">
          <button
            className="page-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ⬅️ Previous
          </button>
          <span className="page-indicator">{currentPage}</span>
          <button
            className="page-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
