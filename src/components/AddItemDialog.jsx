import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { addProduct } from "../actions";

export default function AddItemDialog({ open, handleClose, stores }) {
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    store: "",
    estimatedArrivalDate: "",
  });

  const dispatch = useDispatch();

  const handleChangeFormValues = (event, key) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: event.target.value,
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
      estimatedArrivalDate: "",
    });
    handleClose();
    console.log(stores);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add a New Item</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <FormControl>
            <TextField
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
          <FormControl>
            <TextField
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
          <FormControl>
            <TextField
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
          <FormControl>
            <TextField
              label="Estimated Date of Arrival"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                handleChangeFormValues(e, "estimatedArrivalDate")
              }
              value={formValues.estimatedArrivalDate}
              variant="outlined"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item>
              <Button onClick={() => handleClose()} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleClear}
                variant="contained"
                startIcon={<FontAwesomeIcon icon={faTrashAlt} />}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
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
