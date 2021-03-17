import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography } from "@material-ui/core";
import StoreTable from "./StoreTable";
import StoreRow from "./StoreRow";

const useStyles = makeStyles((theme) => ({
  separator: {
    height: "15px",
    background: theme.palette.primary.light,
  },
}));

export default function ShopByStore() {
  const classes = useStyles();
  const stores = useSelector((state) => state.stores);
  const currency = useSelector((state) => state.currency);

  return (
    <>
      <div className={classes.separator}></div>
      {stores.list.length > 0 ? (
        <StoreTable>
          {stores.list.map((store) => (
            <StoreRow key={store.name} storeDetails={store} />
          ))}
        </StoreTable>
      ) : (
        <Typography align="center" variant="h5" style={{ marginTop: "20px" }}>
          Store list is empty, add items to fill it
        </Typography>
      )}
      <br />
      <Divider />
      <br />
      <Typography align="right" style={{ fontWeight: "bold" }}>
        Total:{" "}
        {currency.view === "ILS"
          ? stores.totalPrice * currency.value
          : stores.totalPrice}
      </Typography>
    </>
  );
}
