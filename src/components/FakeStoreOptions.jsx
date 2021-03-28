import { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, IconButton, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { add } from "date-fns";
import { addProduct } from "../actions";

export default function FakeStoreOptions({ items }) {
  const [value, setValue] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleOptionChange = (e, newValue) => {
    console.log("value: ", value);
    console.log("newValue: ", newValue);
    setValue(newValue);
  };

  const handleAddClick = (e) => {
    if (value === null) {
      enqueueSnackbar("No item has been chosen", {
        variant: "error",
      });
      return;
    }
    dispatch(
      addProduct({
        name: value.title,
        price: parseInt(value.price),
        store: "FakeStoreAPI",
        estimatedArrivalDate: add(new Date(), { weeks: 3, days: 4 }),
      })
    );
    enqueueSnackbar("Item has been added successfully", {
      variant: "success",
    });
  };

  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Autocomplete
          id="combo-box-items"
          value={value}
          onChange={handleOptionChange}
          options={items}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText="Estimated arrival date is approximately 25 days from placing an order"
              label="Our Store's Items..."
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item>
        <IconButton aria-label="add from shop options" onClick={handleAddClick}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
