import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CheckboxList } from "./CheckBoxList";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

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

export const RenderAllTask = ({ search, GetingUserTododata }) => {
  const data = useSelector((state) => state?.todos);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <AppBar position="static" style={{width:"60%"}} className="appbar">
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
            label={`Active (${
              data.filter((x) => x.status === "Active").length
            })`}
            {...a11yProps(1)}
          />
          <Tab
            label={`Completed (${
              data.filter((x) => x.status === "Completed").length
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
              data
                .filter(
                  (x) =>
                    x.todo.includes(search) ||
                    x.category.includes(search) ||
                    x.date.includes(search)
                )
                .map((todo, i) => (
                  <CheckboxList
                    key={i}
                    todo={todo}
                    id={todo.id}
                    getingdata={GetingUserTododata}
                  />
                ))
            ) : (
              <center>
                <h3>You did'nt created any todos</h3>
              </center>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {data.filter((x) => x.status === "Active")[0] ? (
              data
                .filter((x) =>
                  x.status === "Active"
                    ? x.todo.includes(search) ||
                      x.category.includes(search) ||
                      x.date.includes(search)
                    : null
                )
                .map((todo, i) => (
                  <CheckboxList
                    key={i}
                    todo={todo}
                    id={todo.id}
                    getingdata={GetingUserTododata}
                  />
                ))
            ) : (
              <center>
                <h3>No active task</h3>
              </center>
            )}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {data.filter((x) => x.status === "Completed")[0] ? (
              data
                .filter((x) =>
                  x.status === "Completed"
                    ? x.todo.includes(search) ||
                      x.category.includes(search) ||
                      x.date.includes(search)
                    : null
                )
                .map((todo, i) => (
                  <CheckboxList
                    key={i}
                    todo={todo}
                    id={todo.id}
                    getingdata={GetingUserTododata}
                  />
                ))
            ) : (
              <center>
                <h3>You did'nt completed any task</h3>
              </center>
            )}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};
