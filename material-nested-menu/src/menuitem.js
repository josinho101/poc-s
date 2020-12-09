import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const CustomMenu = React.forwardRef(
  ({ items, anchorEl: anchorElProp, createOnClick, onClose, isChild }, ref) => {
    let menuRef = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const getOffset = (el) => {
      if (el && el.current) {
        const rect = el.current.getBoundingClientRect();
        return {
          left: rect.left + window.scrollX + el.current.offsetWidth,
          top: rect.top + window.scrollY + el.current.offsetHeight - 30,
        };
      }

      return { top: 0, left: 0 };
    };

    return (
      <div ref={menuRef}>
        <Menu
          ref={ref}
          open={Boolean(anchorElProp)}
          onClose={onClose}
          anchorReference={isChild && "anchorPosition"}
          anchorPosition={isChild && getOffset(menuRef)}
        >
          {items.map((item) => (
            <div key={item.to}>
              <MenuItem onClick={item.items && createOnClick(setAnchorEl)}>
                {item.label}
              </MenuItem>
              {item.items && (
                <CustomMenu
                  key={item.to}
                  items={item.items}
                  anchorEl={anchorEl}
                  createOnClick={createOnClick}
                  onClose={() => {
                    onClose();
                    setAnchorEl(null);
                  }}
                  isChild={true}
                />
              )}
            </div>
          ))}
        </Menu>
      </div>
    );
  }
);

export default CustomMenu;
