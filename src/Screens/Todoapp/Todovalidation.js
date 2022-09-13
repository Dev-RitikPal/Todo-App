import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CheckboxList } from "./data";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { useEffect } from "react";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const AllTaskList = ({ search, getingUserdata }) => {
  const data = useSelector((state) => state.todos);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const filterData = data?.filter(
    (x) =>
      x?.taskName?.includes(search) ||
      x?.category?.includes(search) ||
      x?.date?.includes(search)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // React.useEffect(() => {
  //   getingUserdata()
  // }, [data, getingUserdata])

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <AppBar position="static" style={{ width: "60%" }} className="appbar">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={`All (${data.length})`} />
          <Tab
            label={`Active (${data?.filter((x) => x.status === false).length})`}
            {...a11yProps(1)}
          />
          <Tab
            label={`Completed (${
              data?.filter((x) => x.status === true).length
            })`}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <Box className="main-box">
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {/* Item One */}
            {data[0] ? (
              filterData && filterData.length > 0 ? (
                filterData.map((todo, i) => (
                  <CheckboxList
                    key={i}
                    // type="all"
                    todo={todo}
                    id={todo._id}
                    getingdata={getingUserdata}
                  />
                ))
              ) : (
                "No match found"
              )
            ) : (
              "You did'nt created any todos"
            )}
            {/* <CheckboxList/> */}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {/* <CheckboxList/> */}
            {data?.filter((x) => x.status === false)[0] ? (
              filterData && filterData.length > 0 ?
              filterData.map((todo, i) => (!todo.status &&
                  <CheckboxList
                    key={i}
                    // type="all"
                    todo={todo}
                    id={todo._id}
                    getingdata={getingUserdata}
                  />
                )): (
                  "No match found"
                )
            ) : (
              "No active task"
            )}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {data?.filter((x) => x.status === true)[0] ? (
              filterData && filterData.length > 0 ? 
                filterData.map((todo, i) => (todo.status &&
                  <CheckboxList
                    key={i}
                    // type="all"
                    todo={todo}
                    id={todo._id}
                    getingdata={getingUserdata}
                  />
                )): (
                  "No match found"
                )
            ) : (
              "You did'nt completed any task"
            )}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};
