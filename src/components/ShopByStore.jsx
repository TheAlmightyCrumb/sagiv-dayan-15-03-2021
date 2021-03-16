import { useSelector } from "react-redux";
import StoreRow from "./StoreRow";
import StoreTable from "./StoreTable";
import { Typography } from "@material-ui/core";

export default function ShopByStore() {
  const stores = useSelector((state) => state.stores);

  return (
    <>
      {stores.length > 0 ? (
        <StoreTable>
          {stores.map((store) => (
            <StoreRow key={store.name} storeDetails={store} />
          ))}
        </StoreTable>
      ) : (
        <Typography align="center" variant="h5" style={{ marginTop: "10px" }}>
            Store list is empty, add items to fill it
        </Typography>
      )}
    </>
  );
}
