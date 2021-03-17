import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { green, grey, red } from "@material-ui/core/colors";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileSignature,
  faStore,
  faTag,
  faTrashAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useSnackbar } from 'notistack';
import { addProduct } from "../actions";

const useStyles = makeStyles((theme) => ({
  dialog: {
    background: grey[200],
  },
  input: {
    maxWidth: "100%",
  },
  clearButton: {
    marginRight: theme.spacing(3),
    color: red["A700"],
  },
  submitButton: {
    color: green[500],
  },
}));

export default function AddItemDialog({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    store: "",
    estimatedArrivalDate: new Date(),
  });

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChangeFormValues = (event, key) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setFormValues((prev) => ({
      ...prev,
      estimatedArrivalDate: date,
    }));
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFormValues({
      name: "",
      price: "",
      store: "",
      estimatedArrivalDate: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formValues));
    setFormValues({
      name: "",
      price: "",
      store: "",
      estimatedArrivalDate: new Date(),
    });
    handleClose();
  };

  const checkInputs = () => {

  }

  return (
    <Dialog
      PaperProps={{ className: classes.dialog }}
      open={open}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>Add New Item</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2} alignContent="center">
            <Grid item md={6} sm={6} xs={6}>
              <FormControl>
                <TextField
                  className={classes.input}
                  margin="dense"
                  label="Item Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faFileSignature} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChangeFormValues(e, "name")}
                  value={formValues.name}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={6}>
              <FormControl>
                <TextField
                  className={classes.input}
                  margin="dense"
                  label="Store"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faStore} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChangeFormValues(e, "store")}
                  value={formValues.store}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={6}>
              <FormControl>
                <TextField
                  className={classes.input}
                  margin="dense"
                  label="Price"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faTag} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChangeFormValues(e, "price")}
                  value={formValues.price}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={6}>
              <FormControl>
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  margin="dense"
                  variant="inline"
                  inputVariant="outlined"
                  label="Estimated Date of Arrival"
                  value={formValues.estimatedArrivalDate}
                  format="dd/MM/yyyy"
                  disablePast
                  InputAdornmentProps={{
                    position: "start",
                  }}
                  onChange={(date) => handleDateChange(date)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item>
              <Button onClick={() => handleClose()} variant="text">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.clearButton}
                onClick={handleClear}
                variant="text"
                startIcon={<FontAwesomeIcon icon={faTrashAlt} />}
              >
                Clear
              </Button>
              <Button
                className={classes.submitButton}
                type="submit"
                variant="text"
                startIcon={<FontAwesomeIcon icon={faSignInAlt} />}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}
