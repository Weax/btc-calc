import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBtcInput,
  setBtcInputValue,
  selectActiveCurrencies,
  selectCurrenciesDropdown,
  addToDropdown,
  removeFromDropdown,
} from "./slice";
import { selectIsLoading } from "../Exchange/slice";
import NumberFormat from "react-number-format";
import { roundToCents } from "./utils";
import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  TextField,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { grey } from "@material-ui/core/colors";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: `16px !important`,
    },
    currencyList: {
      marginTop: theme.spacing(2),
    },
    center: {
      display: "flex",
      "& > *": {
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    list: {
      backgroundColor: grey[100],
    },
    btn: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default function Board() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const loading = useSelector(selectIsLoading);
  const inputValue = useSelector(selectBtcInput);
  const currenciesList = useSelector(selectActiveCurrencies);
  const currenciesDropdown = useSelector(selectCurrenciesDropdown);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBtcInputValue(event.target.value));
  };

  const removeCurrency = (code: string) => () => {
    dispatch(addToDropdown(code));
  };

  const addCurrency = (code: string) => () => {
    dispatch(removeFromDropdown(code));
    closeMenu();
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        ฿ calculator
      </Typography>
      <Card>
        <CardContent className={classes.card}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="amount"
              label="Enter amount in BTC"
              variant="outlined"
              value={inputValue}
              onChange={handleChange}
              type="number"
            />
          </FormControl>

          <div className={classes.currencyList}>
            {loading ? (
              <div className={classes.center}>
                <CircularProgress />
              </div>
            ) : (
              <>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6">Conversion rate</Typography>
                  </Grid>
                  <Grid item xs={6} container justify="flex-end">
                    <Button
                      aria-controls="curr-menu"
                      aria-haspopup="true"
                      onClick={openMenu}
                      variant="contained"
                      color="primary"
                      disableElevation
                      className={classes.btn}
                      style={{
                        visibility:
                          currenciesDropdown.length > 0 ? "visible" : "hidden",
                      }}
                    >
                      Add currency
                    </Button>
                    <Menu
                      id="curr-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={closeMenu}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      {currenciesDropdown.map((code) => (
                        <MenuItem onClick={addCurrency(code)}>{code}</MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                </Grid>

                {currenciesList.length > 0 && (
                  <List className={classes.list}>
                    {currenciesList.map((curr) => (
                      <ListItem>
                        <ListItemText
                          primary={
                            <NumberFormat
                              value={roundToCents(
                                curr.rate_float * Number(inputValue)
                              )}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={curr.symbol}
                              renderText={(value) => (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `<span title="${curr.description}">${curr.code} <b>${value}</b></span>`,
                                  }}
                                />
                              )}
                            />
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="Remove"
                            title="Remove"
                            onClick={removeCurrency(curr.code)}
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
