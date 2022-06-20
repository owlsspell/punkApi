import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { colorPalette } from "./color";

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

const Header = (props) => {
  const tabs = ["With pizza", "With steak", "All beers"];

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    props.setLoading(true)
    setValue(newValue);
  };

  React.useEffect(() => {
    value === 0
      ? props.combinedWithPizza()
      : value === 1
      ? props.combinedWithSteak()
      : props.showAllBear(props.currentPage);
  }, [value]);

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{ backgroundColor: "#42281c" }}
          TabIndicatorProps={{ style: { backgroundColor: colorPalette[2] } }}
        >
          {tabs.map((item,i) => (
            <Tab
            key={tabs[i]}
              label={item}
              {...a11yProps(0)}
            />
          ))}
        </Tabs>
      </AppBar>
      
    </div>
  );
};

export default Header;
