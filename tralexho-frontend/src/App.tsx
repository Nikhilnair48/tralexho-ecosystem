import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Typography, Button } from "@mui/material";
import { Modal } from "./common/Modal";
import { IProduct } from "tralexho-data-lib/dist";

let columns: GridColDef[] = [
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

export const App = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IProduct>({});
  const [operation, setOperation] = useState("");
  const [rows, setRows] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/products");
      let data: any[] = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(rows)) {
        data = data.map((item) => {
          return { ...item, id: item._id };
        });
        setRows(data);
      }
    };
    fetchData();
  }, [rows]);

  const handleModalClose = () => {
    setShowDialog(false);
    setOperation("");
    setSelectedRow({});
  };

  const handleModalConfirm = async () => {
    console.log(operation);
    if (operation === "Add") {
      const response = await fetch("http://localhost:3001/product", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRow),
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
    } else if (operation === "Edit") {
      const response = await fetch(
        `http://localhost:3001/product/${selectedRow.id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedRow),
        }
      );
      const data = await response.json();
      console.log(JSON.stringify(data));
    } else if (operation === "Delete") {
      const response = await fetch(
        `http://localhost:3001/product/${selectedRow.id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedRow),
        }
      );
      const data = await response.json();
      console.log(JSON.stringify(data));
    }
    setShowDialog(false);
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

  const handleAdd = () => {
    setShowDialog(true);
    setOperation("Add");
    setSelectedRow({
      id: -1,
      name: "",
      location: "",
      owner: "",
      quantityInGrams: 0,
    });
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
        onConfirm={handleModalConfirm}
      />
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Box display="flex">
          <Typography variant="h4">Tralexho Ecosystem</Typography>
        </Box>
        <Box display="flex">
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
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
        />
      </Box>
    </Box>
  );
};
