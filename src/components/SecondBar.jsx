import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faTruckLoading,
} from "@fortawesome/free-solid-svg-icons";
import { setViewState } from "../actions";

const useStyles = makeStyles((theme) => ({
  tabs: {
    flexGrow: 1,
    background: theme.palette.primary.light,
  },
}));

export default function SecondBar() {
  const viewState = useSelector((state) => state.viewState);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleTabChange = (event, newValue) => {
    dispatch(setViewState(newValue));
  };

  return (
    <>
      <Tabs
        className={classes.tabs}
        variant="fullWidth"
        value={viewState}
        onChange={handleTabChange}
        indicatorColor="secondary"
      >
        <Tab
          icon={<FontAwesomeIcon icon={faShippingFast} />}
          disableRipple
          label="Ongoing"
          value="SHOW_WAITING"
        />
        <Tab
          icon={<FontAwesomeIcon icon={faTruckLoading} />}
          disableRipple
          label="Delivered"
          value="SHOW_DELIVERED"
        />
      </Tabs>
    </>
  );
}
