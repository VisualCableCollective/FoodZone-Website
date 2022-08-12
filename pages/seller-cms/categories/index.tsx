import {SellerLayout} from "../../../layouts/SellerLayout";
import {DataGrid, GridRenderCellParams} from '@mui/x-data-grid';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField
} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import {Dropzone, FileItem, FileValidated, UPLOADSTATUS} from "@dropzone-ui/react";
import {useFoodZone} from "foodzone-api-client";
import {ProductCategory} from "foodzone-api-client/lib/models/ProductCategory";

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

export default function SellerCmsCategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [uploadProgess, setUploadProgress] = useState(0);
  const [data, setData] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  const foodZone = useFoodZone();

  useEffect(() => {
    foodZone.getCategories().then(res => {
      console.log(res);
      setData(res.categories);
    });
  }, []);

  function onFormSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    let file = files[0];
    file.uploadStatus = UPLOADSTATUS.uploading;
    setFiles([file]);

    foodZone.createProductCategory("test", files[0].file, {onProgress: onSubmitProgressUpdate})
      .then(res => {
        setIsLoading(false);
        setUploadProgress(0);
        setIsAddModalOpen(false);
        setFiles([]);
      })
      .catch(reason => {
        setIsLoading(false);
      });
  }

  function onSubmitProgressUpdate(progress: number) {
    setUploadProgress(progress);
  }

  function closeModal() {
    if (isLoading) return;
    setIsAddModalOpen(false);
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
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </Box>
        <Dialog open={isAddModalOpen} onClose={closeModal}>
          {isLoading && <LinearProgress variant="determinate" value={uploadProgess} />}
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
                  disabled={isLoading}
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
              <Button onClick={closeModal} disabled={isLoading}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>Create</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </SellerLayout>
  )
}