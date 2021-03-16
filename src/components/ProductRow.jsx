import { useSelector, useDispatch } from "react-redux";
import { Button, TableCell, TableRow } from "@material-ui/core";
import { toggleProduct } from "../actions";

export default function ProductRow({ productDetails }) {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { id: productId, name, store, price, estimatedArrivalDate, delivered } = productDetails;

  const handleToggleClick = (productId) => {
    dispatch(toggleProduct(productId));
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="left">{store}</TableCell>
      <TableCell align="right">{currency.view === "ILS" ? price * currency.value : price}</TableCell>
      <TableCell align="right">{estimatedArrivalDate}</TableCell>
      <TableCell align="center">
        <Button onClick={() => handleToggleClick(productId)} size="small" fullWidth variant="text">{delivered ? "Activate" : "Archive"}</Button>
      </TableCell>
    </TableRow>
  );
}
