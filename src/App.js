import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, IconButton, Tab, Tabs } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faPlus,
  faShekelSign,
  faShippingFast,
  faTruckLoading,
} from "@fortawesome/free-solid-svg-icons";
import { setViewState, updateCurrency, changeCurrencyView } from "./actions";
import "./App.css";
import AddItemDialog from "./components/AddItemDialog";
import ProductRow from "./components/ProductRow";
import ProductTable from "./components/ProductTable";

function App() {
  const products = useSelector((state) => state.products);
  const stores = useSelector((state) => state.stores);
  const currency = useSelector((state) => state.currency);
  const viewState = useSelector((state) => state.viewState);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    dispatch(setViewState(newValue));
  };

  const handleCurrencyChange = (newView) => {
    dispatch(changeCurrencyView(newView));
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

  const visibleItems = getVisibleItems(products, viewState);

  return (
    <div className="App">
      <Tabs
        value={viewState}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab
          icon={<FontAwesomeIcon icon={faShippingFast} />}
          label="Ongoing"
          value="SHOW_WAITING"
        />
        <Tab
          icon={<FontAwesomeIcon icon={faTruckLoading} />}
          label="Delivered"
          value="SHOW_DELIVERED"
        />
      </Tabs>
      <Button
        onClick={handleClickOpen}
        startIcon={<FontAwesomeIcon icon={faPlus} />}
      >
        Add Item
      </Button>
      <AddItemDialog open={open} handleClose={handleClose} stores={stores} />
      <div>
        Currency:
        <ButtonGroup variant="text" color="primary">
          <IconButton
            aria-label="ILS"
            color={currency.view === "ILS" ? "primary" : "secondary"}
            onClick={() => handleCurrencyChange("ILS")}
          >
            <FontAwesomeIcon icon={faShekelSign} />
          </IconButton>
          <IconButton
            aria-label="USD"
            color={currency.view === "USD" ? "primary" : "secondary"}
            onClick={() => handleCurrencyChange("USD")}
          >
            <FontAwesomeIcon icon={faDollarSign} />
          </IconButton>
        </ButtonGroup>
      </div>
      {visibleItems.length > 0 && (
        <ProductTable>
          {visibleItems.map((prod) => (
            <ProductRow key={prod.id} productDetails={prod} />
          ))}
        </ProductTable>
      )}
    </div>
  );
}

export default App;
