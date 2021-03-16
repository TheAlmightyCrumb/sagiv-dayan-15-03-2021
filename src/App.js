import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileSignature,
  faPlus,
  faStore,
  faTag,
  faTrashAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { addProduct, toggleProduct, updateCurrency } from "./actions";
import "./App.css";

function App() {
  const products = useSelector((state) => state.products);
  const stores = useSelector((state) => state.stores);
  const currency = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    store: "",
    estimatedArrivalDate: "",
  });

  const handleChangeFormValues = (event, key) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const fetchCurrencies = useCallback(() => {
    fetch("https://api.exchangeratesapi.io/latest?base=USD")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatch(updateCurrency(res.rates.ILS));
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchCurrencies, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Button
        onClick={handleClickOpen}
        startIcon={<FontAwesomeIcon icon={faPlus} />}
      >
        Add Item
      </Button>
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
      {products.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Store</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Estimated Arrival Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell component="th" scope="row">
                    {prod.name}
                  </TableCell>
                  <TableCell align="right">{prod.store}</TableCell>
                  <TableCell align="right">{prod.price * currency}</TableCell>
                  <TableCell align="right">
                    {prod.estimatedArrivalDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default App;
