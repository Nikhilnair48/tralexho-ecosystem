import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Typography, Button } from "@mui/material";
import { Modal } from "./common/Modal";
import { useEffect, useState } from "react";

let columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Product", width: 130 },
  { field: "location", headerName: "Location", width: 130 },
  { field: "owner", headerName: "Owner", width: 130 },
  {
    field: "quantityInGrams",
    headerName: "Quantity in grams",
    type: "number",
    width: 150,
  },
];

// const rows = [
//   {
//     id: 1,
//     name: "fish1",
//     location: "Kochi",
//     owner: "Tralexho",
//     quantityInGrams: 250,
//   },
//   {
//     id: 2,
//     name: "fish2",
//     location: "Kochi",
//     owner: "Tralexho",
//     quantityInGrams: 250,
//   },
// ];

export const App = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [operation, setOperation] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(rows)) setRows(data);
      console.log(data);
    };
    fetchData();
  }, [rows]);

  const handleModalClose = () => {
    setShowDialog(false);
    setOperation("");
    setSelectedRow({});
  };

  const handleEdit = (row: any) => {
    setShowDialog(true);
    setOperation("Edit");
    setSelectedRow(row);
  };

  const handleDelete = (row: any) => {
    setShowDialog(true);
    setOperation("Delete");
    setSelectedRow(row);
  };

  const handleChange = (e: any) => {
    setSelectedRow({
      ...selectedRow,
      [e.target.id]: e.target.value,
    });
  };

  columns.push({
    field: "actions",
    headerName: "Actions",
    sortable: false,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <Box>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          EDIT
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => handleDelete(params.row)}
        >
          DELETE
        </Button>
      </Box>
    ),
    width: 300,
  });

  return (
    <Box padding={2}>
      <Modal
        open={showDialog}
        onClose={handleModalClose}
        row={selectedRow}
        operation={operation}
        onChange={handleChange}
      />
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Box display="flex">
          <Typography variant="h4">Tralexho Ecosystem</Typography>
        </Box>
        <Box display="flex">
          <Button variant="contained">Add</Button>
        </Box>
      </Box>
      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};
