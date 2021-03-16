import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    maxHeight: "280px",
    overflow: "auto",
  },
}));

export default function StoreTable({ children }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Store Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
