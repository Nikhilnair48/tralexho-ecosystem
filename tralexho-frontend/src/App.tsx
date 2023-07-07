import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Button } from "@mui/material";

const columns: GridColDef[] = [
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

const rows = [
  {
    id: 1,
    name: "fish1",
    location: "Kochi",
    owner: "Tralexho",
    quantityInGrams: 250,
  },
  {
    id: 2,
    name: "fish2",
    location: "Kochi",
    owner: "Tralexho",
    quantityInGrams: 250,
  },
];

export const App = () => {
  return (
    <Box padding={2}>
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
