import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FakeStoreOptions({ items }) {
  return (
    <Autocomplete
      id="combo-box-items"
      options={items}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Items..." variant="outlined" />
      )}
    />
  );
}
