import {SellerLayout} from "../../../layouts/SellerLayout";
import {DataGrid, GridRenderCellParams} from '@mui/x-data-grid';
import {
  Box,
  Container,
  IconButton,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText, TextField, DialogActions, Stack
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {useCallback, useState} from "react";
import {Dropzone, FileItem, FileValidated} from "@dropzone-ui/react";
import {useFoodZone} from "foodzone-api-client";

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'productsCount', headerName: 'Total products', width: 110 },
  { field: 'updatedAt', headerName: 'Updated At' },
  { field: 'buttons',
    headerName: '',
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => (
      <Box sx={{display: 'flex', alignItems: 'end'}}>
        <IconButton aria-label="edit" color="warning">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
        {JSON.stringify(params.id)}
      </Box>
    ),},
];

const rows = [
  { id: 123, name: 'Burger', productsCount: 2, updatedAt: 'Yesterday' },
];

export default function SellerCmsCategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [files, setFiles] = useState<FileValidated[]>([]);
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  const foodZone = useFoodZone();

  function onFormSubmit(e) {
    e.preventDefault();
    foodZone.createProductCategory("test", files[0].file);
  }

  return (
    <SellerLayout>
      <Container>
        <Box pt={4}>
          <Box style={{display: "flex", justifyContent: "end", width: "100%"}} mb={2}>
            <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => setIsAddModalOpen(true)}>
              Add
            </Button>
          </Box>
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
        <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <DialogTitle>Add new category</DialogTitle>
          <form onSubmit={onFormSubmit}>
            <DialogContent>
              <DialogContentText>
                You can group offered products into categories. Create a new category below.
              </DialogContentText>
              <Stack spacing={1} mt={2}>
                <TextField
                  autoFocus
                  id="name"
                  label="Name"
                  fullWidth
                  size="small"
                />
                <Dropzone onChange={updateFiles} value={files} accept="image/*" maxFiles={1} minHeight={"100px"} behaviour="replace"
                          label={"Drop Files here or click to browse"}>
                  {files.map((file) => (
                    <FileItem key={file.id} {...file} preview />
                  ))}
                </Dropzone>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </SellerLayout>
  )
}