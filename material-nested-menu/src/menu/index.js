import React, { useState } from "react";
import NestedMenuItem from "./nestedmenuitem";
import { Menu as MaterialMenu, MenuItem } from "@material-ui/core";

export const Menu = (props) => {
  const [menuPosition, setMenuPosition] = useState(null);

  const handleOnClick = (event) => {
    if (menuPosition) {
      return;
    }

    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX,
    });
  };

  const handleItemClick = (event) => {
    setMenuPosition(null);
  };

  const renderMenuItems = (items, itemClickHandler) => {
    if (items) {
      const menuItems = items.map((item) => {
        if (!item.children) {
          return <MenuItem onClick={itemClickHandler}>{item.label}</MenuItem>;
        } else {
          return (
            <NestedMenuItem
              label={item.label}
              parentMenuOpen={menuPosition}
              onClick={itemClickHandler}
              arrowIcon={props.arrowIcon}
            >
              {renderMenuItems(item.children, itemClickHandler)}
            </NestedMenuItem>
          );
        }
      });

      return menuItems;
    }
  };

  return (
    <div onClick={handleOnClick}>
      {props.anchorEl}
      <MaterialMenu
        open={menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        {renderMenuItems(props.items, handleItemClick)}
      </MaterialMenu>
    </div>
  );
};

export default Menu;
