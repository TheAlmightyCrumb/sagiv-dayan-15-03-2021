import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import { updateCurrency } from "./actions";
import ThemeWrapper from "./components/ThemeWrapper";
import ShopByProduct from "./components/ShopByProduct";
import ShopByStore from "./components/ShopByStore";
import FirstBar from "./components/FirstBar";

function App() {
  const products = useSelector((state) => state.products);
  const stores = useSelector((state) => state.stores);
  const currency = useSelector((state) => state.currency);
  const viewState = useSelector((state) => state.viewState);
  const dispatch = useDispatch();

  const fetchCurrencies = useCallback(() => {
    fetch("https://api.exchangeratesapi.io/latest?base=USD")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatch(updateCurrency(res.rates.ILS));
      });
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(fetchCurrencies, 30000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Router>
      <ThemeWrapper>
        <Container maxWidth="md">
          <FirstBar />
          <Switch>
            <Route path="/" exact component={ShopByProduct} />
            <Route path="/stores" exact component={ShopByStore} />
          </Switch>
        </Container>
      </ThemeWrapper>
    </Router>
  );
}

export default App;
