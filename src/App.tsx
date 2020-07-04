import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startCheckInterval } from "./features/Exchange/slice";
import Grid from '@material-ui/core/Grid';

import Board from "./features/Board";

function App() {
  const dispatch = useDispatch();

  //update price indexes
  useEffect(() => {
    dispatch(startCheckInterval());
  }, [dispatch]);

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={11} style={{ maxWidth: 500 }}>
        <Board />
      </Grid>
    </Grid>
  );
}

export default App;
