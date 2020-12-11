import React from "react";
import Menu from "./menu";
import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const items = [
  { label: "Menu 1" },
  { label: "Menu 2" },
  {
    label: "Menu 3",
    children: [
      { label: "Menu 3.1" },
      {
        label: "Menu 3.2 long item",
        children: [{ label: "Menu 3.2.1" }, { label: "Menu 3.2.2" }],
      },
      { label: "Menu 3.3" },
      {
        label: "Menu 3.4",
        children: [{ label: "Menu 3.4.1" }, { label: "Menu 3.4.3" }],
      },
    ],
  },
  {
    label: "Menu 4",
    children: [{ label: "Menu 4.1" }, { label: "Menu 4.2" }],
  },
  {
    label: "Menu 5 very long item",
    children: [
      {
        label: "Menu 5.1",
        children: [{ label: "Menu 5.1.1" }, { label: "Menu 5.1.2" }],
      },
      { label: "Menu 5.2" },
      { label: "Menu 5.3" },
      {
        label: "Menu 5.4 long item",
        children: [
          {
            label: "Menu 5.4.1",
            children: [
              { label: "Menu 5.4.1.1" },
              { label: "Menu 5.4.1.2" },
              { label: "Menu 5.4.1.3" },
            ],
          },
          { label: "Menu 5.4.2" },
        ],
      },
    ],
  },
  { label: "Menu 6" },
];

const App = () => {
  const handleMenuItemClick = (e) => {
    console.log("Menu item clicked");
  };

  return (
    <div>
      <Menu
        items={items}
        handleItemClick={handleMenuItemClick}
        anchorEl={
          <Button color="primary" variant="contained">
            Show menu
          </Button>
        }
        arrowIcon={
          <span style={{ width: "100%", textAlign: "right" }}>
            <ArrowForwardIosIcon
              style={{ fontSize: 18, marginLeft: "20px", marginTop: "4px" }}
            />
          </span>
        }
      />
    </div>
  );
};

export default App;
