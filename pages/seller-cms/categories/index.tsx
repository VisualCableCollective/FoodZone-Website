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
import {useFoodZone} from "foodzone-api-client";
import {ProductCategory} from "foodzone-api-client/lib/models/ProductCategory";
import {useAppSelector} from "../../../app/hooks";
import {selectIsAuthenticated} from "../../../features/FoodZoneApi/foodZoneSlice";
import {CreateProductCategoryModal} from "../../../components/modals/CreateProductCategoryModal";
import {set} from "immer/dist/utils/common";
import moment from "moment";
import searchNotFoundAnimationData from "../../../public/lotties/empty-box.json";
import Lottie from "lottie-react";

export default function SellerCmsCategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductCategory[]>([]);

  const foodZone = useFoodZone();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    foodZone.getProductCategories().then(res => {
      setData(res.categories);
      setIsLoading(false);
    });
  }, [isAuthenticated]);

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'productsCount', headerName: 'Total products', width: 110 },
    { field: 'updatedAt',
      headerName: 'Updated At',
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }

        return moment(params.value).format('lll');
      },
      minWidth: 160,
    },
    { field: 'buttons',
      headerName: '',
      flex: 1,
      renderCell: (params: GridRenderCellParams<ProductCategory>) => (
        <Box sx={{display: 'flex', alignItems: 'end'}}>
          <IconButton aria-label="edit" color="warning">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="error" onClick={() => deleteCategory(params.id.toString())}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),},
  ];

  function deleteCategory(id: string) {
    setIsLoading(true);

    foodZone.deleteProductCategory(id).then(success => {
      if (!success) {
        setIsLoading(false);
        return;
      }

      // remove deleted category
      setData(data.filter(function(category) {
          return category.id !== id;
        }));

      setIsLoading(false);
    });
  }

  function onCategoryCreated(category) {
    setData([...data, category]);
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
              disableSelectionOnClick
              loading={isLoading}
              components={{
                NoRowsOverlay: CustomNoRowsOverlay
              }}
            />
          </div>
        </Box>
        <CreateProductCategoryModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} onCreated={onCategoryCreated} />
      </Container>
    </SellerLayout>
  )
}

function CustomNoRowsOverlay() {
  return (
    <Box sx={{display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%',}}>
      <Box sx={{maxWidth: "200px"}}>
        <Lottie animationData={searchNotFoundAnimationData} loop={false} />
      </Box>
      <Box sx={{ mt: 1 }}>No Items</Box>
    </Box>
  );
}