import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  ButtonGroup,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faShekelSign } from "@fortawesome/free-solid-svg-icons";
import { changeCurrencyView } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    background: theme.palette.primary.dark,
  },
  activeLink: {
    color: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.light}`,
    cursor: "pointer",
    textDecoration: "none",
    padding: "5px 0",
    marginRight: theme.spacing(2),
  },
  inactiveLink: {
    color: theme.palette.primary.light,
    cursor: "pointer",
    textDecoration: "none",
    padding: "5px 0",
    marginRight: theme.spacing(2),
  },
  activeCurrency: {
    color: theme.palette.secondary.main,
    borderBottom: `2px dashed ${theme.palette.secondary.light}`,
    borderRadius: "0",
    padding: "5px 0",
  },
  inactiveCurrency: {
    color: theme.palette.primary.light,
    padding: "5px 0",
  },
  currencyTitle: {
    padding: "5px 0",
    marginRight: theme.spacing(1),
  },
}));

export default function FirstBar() {
  const classes = useStyles();
  const currency = useSelector((state) => state.currency);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCurrencyChange = (newView) => {
    dispatch(changeCurrencyView(newView));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar variant="dense">
          <Grid container justify="space-between">
            <Grid item>
              <NavLink
                className={
                  location.pathname === "/"
                    ? classes.activeLink
                    : classes.inactiveLink
                }
                to="/"
              >
                Shop by Product
              </NavLink>
              <NavLink
                className={
                  location.pathname === "/stores"
                    ? classes.activeLink
                    : classes.inactiveLink
                }
                to="/stores"
              >
                Shop by Stores
              </NavLink>
            </Grid>
            <Grid item>
              <Typography
                align="left"
                className={classes.currencyTitle}
                display="inline"
              >
                Currency:
              </Typography>
              <ButtonGroup>
                <IconButton
                  aria-label="ILS"
                  className={
                    currency.view === "ILS"
                      ? classes.activeCurrency
                      : classes.inactiveCurrency
                  }
                  size="small"
                  edge="end"
                  onClick={() => handleCurrencyChange("ILS")}
                >
                  <FontAwesomeIcon icon={faShekelSign} />
                </IconButton>
                <IconButton
                  aria-label="USD"
                  className={
                    currency.view === "USD"
                      ? classes.activeCurrency
                      : classes.inactiveCurrency
                  }
                  size="small"
                  edge="end"
                  onClick={() => handleCurrencyChange("USD")}
                >
                  <FontAwesomeIcon icon={faDollarSign} />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
