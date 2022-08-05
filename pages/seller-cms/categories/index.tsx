import {SellerLayout} from "../../../layouts/SellerLayout";
import {DataGrid, GridRenderCellParams} from '@mui/x-data-grid';
import {Box, Container, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'productsCount', headerName: 'Total products', width: 110 },
  { field: 'updatedAt', headerName: 'Updated At' },
  { field: 'buttons',
    headerName: '',
    flex: 1,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <Box sx={{display: 'flex', alignItems: 'end'}}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </Box>
    ),},
];

const rows = [
  { id: 1, name: 'Burger', productsCount: 2, updatedAt: 'Yesterday' },
];

export default function SellerCmsCategoriesPage() {
  return (
    <SellerLayout>
      <Container>
        <Box pt={4}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </Box>
      </Container>
    </SellerLayout>
  )
}