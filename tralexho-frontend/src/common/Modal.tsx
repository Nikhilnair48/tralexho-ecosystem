import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";

interface IModal {
  open: boolean;
  onClose: () => void;
  row: any;
  operation: string;
  onChange: (e: any) => void;
}

export function Modal(props: IModal) {
  const { open, onClose, row, operation, onChange } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title">
          {`${operation} Product`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Product"
              fullWidth
              variant="standard"
              value={row.name}
              onChange={onChange}
              disabled={operation === "Delete"}
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              fullWidth
              variant="standard"
              value={row.location}
              onChange={onChange}
              disabled={operation === "Delete"}
            />
            <TextField
              margin="dense"
              id="owner"
              label="Owner"
              fullWidth
              variant="standard"
              value={row.owner}
              onChange={onChange}
              disabled={operation === "Delete"}
            />
            <TextField
              margin="dense"
              id="quantityInGrams"
              label="Quantity in grams"
              fullWidth
              variant="standard"
              value={row.quantityInGrams}
              onChange={onChange}
              disabled={operation === "Delete"}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
