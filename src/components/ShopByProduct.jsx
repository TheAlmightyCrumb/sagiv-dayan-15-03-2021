import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Divider,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddItemDialog from "./AddItemDialog";
import ProductRow from "./ProductRow";
import ProductTable from "./ProductTable";
import SecondBar from "./SecondBar";
import FakeStoreOptions from "./FakeStoreOptions";

const useStyles = makeStyles((theme) => ({
  addItemButton: {
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    borderRadius: "10px",
    "&:hover": {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.dark,
    },
  },
}));

export default function ShopByProduct() {
  const classes = useStyles();
  const products = useSelector((state) => state.products);
  const viewState = useSelector((state) => state.viewState);

  const [open, setOpen] = useState(false);
  const [fakeStoreItems, setFakeStoreItems] = useState([]);
  const [isWaiting, setIsWaiting] = useState(true);

  const fetchStoreItems = useCallback(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => setFakeStoreItems(res));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getVisibleItems = (items, filter) => {
    switch (filter) {
      case "SHOW_WAITING":
        return items.filter((item) => !item.delivered);
      case "SHOW_DELIVERED":
        return items.filter((item) => item.delivered);
      default:
        return;
    }
  };

  const visibleItems = getVisibleItems(products, viewState);

  useEffect(() => {
    fetchStoreItems();
    setIsWaiting(false);
  }, [fetchStoreItems]);

  return (
    <>
      <AddItemDialog open={open} handleClose={handleClose} />
      <SecondBar />
      {visibleItems.length > 0 ? (
        <ProductTable>
          {visibleItems.map((prod) => (
            <ProductRow key={prod.id} productDetails={prod} />
          ))}
        </ProductTable>
      ) : (
        <Typography align="center" variant="h5" style={{ marginTop: "20px" }}>
          {viewState === "SHOW_DELIVERED"
            ? "Delivered items"
            : "Awaiting items"}{" "}
          list is empty, add items to fill it
        </Typography>
      )}
      <br />
      <Divider />
      <br />
      <Grid container justify="space-between">
        <Grid item>
          <Button
            onClick={handleClickOpen}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            className={classes.addItemButton}
          >
            Add Item
          </Button>
        </Grid>
        <Grid item>
          {isWaiting ? (
            <CircularProgress disableShrink />
          ) : fakeStoreItems.length > 0 ? (
            <FakeStoreOptions items={fakeStoreItems} />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
