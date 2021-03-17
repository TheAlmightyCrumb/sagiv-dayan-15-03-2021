import { useSelector, useDispatch } from "react-redux";
import { Button, TableCell, TableRow, Zoom } from "@material-ui/core";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import { toggleProduct } from "../actions";

export default function ProductRow({ productDetails }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const {
    id: productId,
    name,
    store,
    price,
    estimatedArrivalDate,
    delivered,
  } = productDetails;

  const handleToggleClick = (productId) => {
    dispatch(toggleProduct(productId));
    enqueueSnackbar(
      delivered
        ? "Item has been reactivated"
        : "Item has been marked as delivered",
      {
        variant: "info",
        TransitionComponent: Zoom,
      }
    );
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="left">{store}</TableCell>
      <TableCell align="right">
        {currency.view === "ILS" ? price * currency.value : price}
      </TableCell>
      <TableCell align="right">
        {format(estimatedArrivalDate, "dd/MM/yyyy")}
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => handleToggleClick(productId)}
          size="small"
          fullWidth
          variant="text"
        >
          {delivered ? "Activate" : "Archive"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
