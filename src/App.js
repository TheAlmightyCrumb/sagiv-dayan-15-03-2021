import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Container } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { updateCurrency } from "./actions";
import ThemeWrapper from "./components/ThemeWrapper";
import ShopByProduct from "./components/ShopByProduct";
import ShopByStore from "./components/ShopByStore";
import FirstBar from "./components/FirstBar";

function App() {
  const dispatch = useDispatch();

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
    <Router>
      <SnackbarProvider dense maxSnack={2}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeWrapper>
            <Container maxWidth="md">
              <FirstBar />
              <Switch>
                <Route path="/" exact component={ShopByProduct} />
                <Route path="/stores" exact component={ShopByStore} />
              </Switch>
            </Container>
          </ThemeWrapper>
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
