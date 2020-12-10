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
      {
        label: "Menu 3.1",
        children: [{ label: "Menu 3.1.1" }, { label: "Menu 3.1.2" }],
      },
      { label: "Menu 3.2" },
      { label: "Menu 3.3" },
      {
        label: "Menu 3.4 long item",
        children: [{ label: "Menu 3.4.1" }, { label: "Menu 3.4.3" }],
      },
    ],
  },
  { label: "Menu 4" },
  {
    label: "Menu 5",
    children: [
      {
        label: "Menu 5.1",
        children: [{ label: "Menu 5.1.1" }, { label: "Menu 5.1.2" }],
      },
      { label: "Menu 5.2" },
      { label: "Menu 5.3" },
      {
        label: "Menu 5.4 long item",
        children: [{ label: "Menu 5.4.1" }, { label: "Menu 5.4.3" }],
      },
    ],
  },
];

function App() {
  return (
    <div>
      <Menu
        items={items}
        anchorEl={
          <Button color="primary" variant="contained">
            Show menu
          </Button>
        }
        arrowIcon={
          <ArrowForwardIosIcon style={{ fontSize: 18, marginLeft: "20px" }} />
        }
      />
    </div>
  );
}

export default App;
