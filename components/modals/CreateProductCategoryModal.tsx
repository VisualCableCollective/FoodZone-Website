import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import {useState} from "react";
import {Dropzone, FileItem, FileValidated, UPLOADSTATUS} from "@dropzone-ui/react";
import {useFoodZone} from "foodzone-api-client";

export default function SellerCmsCategoriesPage({setIsOpen, isOpen}) {
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const foodZone = useFoodZone();

  function onFormSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    if (files.length > 0) {
      let file = files[0];
      file.uploadStatus = UPLOADSTATUS.uploading;
      setFiles([file]);
    }

    foodZone.createProductCategory("test", files[0].file, {onProgress: onSubmitProgressUpdate})
      .then(res => {
        setIsLoading(false);
        setUploadProgress(0);
        setIsOpen(false);
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
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      {isLoading && <LinearProgress variant="determinate" value={uploadProgress} />}
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
            <Dropzone onChange={(files) => setFiles(files)} value={files} accept="image/*" maxFiles={1} minHeight={"100px"} behaviour="replace"
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
  )
}