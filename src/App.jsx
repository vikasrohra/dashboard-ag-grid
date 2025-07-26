import { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { DATA } from "./assets/data";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const employees = DATA.employees;

function App() {
  const gridRef = useRef(null);

  const [pageSize, setPageSize] = useState(10);

  const columnDefs = useMemo(
    () => [
      { field: "id", filter: true },
      { field: "firstName", filter: true },
      { field: "lastName", filter: true },
      { field: "email", filter: true },
      { field: "department", filter: true },
      { field: "position", filter: true },
      { field: "salary", filter: "agNumberColumnFilter" },
      { field: "hireDate", filter: true },
      { field: "age", filter: "agNumberColumnFilter" },
      { field: "location", filter: true },
      { field: "performanceRating", filter: "agNumberColumnFilter" },
      { field: "projectsCompleted", filter: "agNumberColumnFilter" },
      { field: "isActive", filter: "agSetColumnFilter" },
      {
        field: "skills",
        filter: true,
        valueFormatter: (params) => params.value?.join(", ") || "",
      },
      { field: "manager", filter: true },
    ],
    []
  );

  const onGridReady = (params) => {
    gridRef.current = params.api;
    params.api.paginationSetPageSize(pageSize);
  };

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setPageSize(size);
    gridRef.current.paginationSetPageSize(size);
  };

  return (
    <div style={{ width: "99%", margin: "auto" }}>
      <div className="header-container">
        <h1 className="header">Employee List</h1>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>
          Page Size:&nbsp;
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <div className="ag-theme-quartz" style={{ height: 528 }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={employees}
          pagination={true}
          paginationPageSize={pageSize}
          animateRows={true}
        />
      </div>
    </div>
  );
}

export default App;
