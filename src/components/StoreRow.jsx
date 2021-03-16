import { useSelector, useDispatch } from "react-redux";
import { TableCell, TableRow } from "@material-ui/core";

export default function StoreRow({ storeDetails }) {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { name, quantity, price } = storeDetails;

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{quantity}</TableCell>
      <TableCell align="right">{currency.view === "ILS" ? price * currency.value : price}</TableCell>
    </TableRow>
  );
}
