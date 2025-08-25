import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import { Close, Error, Delete } from "@mui/icons-material";
import { formatDate } from "../../utils/DateFormatter";

interface IFailedAnalysisDialogProps {
  open: boolean;
  onClose: () => void;
  onDeleteRecord: () => void;
  reportUrl?: string;
  reportTime: string;
}

const FailedAnalysisDialog = ({
  open,
  onClose,
  onDeleteRecord,
  reportUrl,
  reportTime,
}: IFailedAnalysisDialogProps) => {
  const handleDelete = () => {
    onDeleteRecord();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <Error color="error" />
            <Typography variant="h6" component="span">
              Analysis Failed
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: "grey.500" }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            The analysis for this website could not be completed successfully.
          </Typography>
          {reportUrl && (
            <>
              <Typography variant="body2" color="text.secondary">
                URL: {reportUrl}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created: {formatDate(reportTime).fullDate}@
                {formatDate(reportTime).fullTime}
              </Typography>
            </>
          )}
        </Alert>

        <Typography variant="body2" color="text.secondary">
          This could be due to various reasons such as network issues, website
          accessibility problems, or server errors. You can try running the
          analysis again or remove this failed record.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          Keep Record
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          startIcon={<Delete />}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Delete Record
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FailedAnalysisDialog;
