import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddItemDialog from "./AddItemDialog";
import ProductRow from "./ProductRow";
import ProductTable from "./ProductTable";
import SecondBar from "./SecondBar";
import FakeStoreOptions from "./FakeStoreOptions";

export default function ShopByProduct() {
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
    console.log("HELLO!");
    fetchStoreItems();
    setIsWaiting(false);
  }, []);

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
        <Typography align="center" variant="h5" style={{ marginTop: "10px" }}>
          {viewState === "SHOW_DELIVERED"
            ? "Delivered items"
            : "Awaiting items"}{" "}
          list is empty, add items to fill it
        </Typography>
      )}
      <Button
        onClick={handleClickOpen}
        startIcon={<FontAwesomeIcon icon={faPlus} />}
      >
        Add Item
      </Button>
      {isWaiting ? (
        <LinearProgress color="secondary" variant="query" />
      ) : fakeStoreItems.length > 0 ? (
        <FakeStoreOptions items={fakeStoreItems} />
      ) : null}
    </>
  );
}
