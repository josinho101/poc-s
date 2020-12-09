import React from "react";
import Button from "@material-ui/core/Button";
import CustomMenu from "./menuitem";

const items = [
  { label: "Menu 1" },
  { label: "Menu 2" },
  { label: "Menu 3" },
  { label: "Menu 4" },
  {
    label: "Menu 5",
    items: [
      {
        label: "Menu 5.1",
      },
      { label: "Menu 5.2" },
      { label: "Menu 5.3" },
      {
        label: "Menu 5.4 long menu item",
        items: [{ label: "Menu 5.4.1" }, { label: "Menu 5.4.3" }],
      },
    ],
  },
];

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const createOnClick = (callback) => {
    return (e) => {
      return callback(e.currentTarget);
    };
  };

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={createOnClick(setAnchorEl)}
      >
        Show menu
      </Button>
      <CustomMenu
        items={items}
        anchorEl={anchorEl}
        createOnClick={createOnClick}
        onClose={() => setAnchorEl(null)}
      />
    </div>
  );
}

export default App;
