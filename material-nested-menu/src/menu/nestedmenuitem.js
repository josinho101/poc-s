import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useRef, useImperativeHandle } from "react";

const TRANSPARENT = "rgba(0,0,0,0)";
const useMenuItemStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundColor: props.open ? theme.palette.action.hover : TRANSPARENT,
  }),
}));

const NestedMenuItem = React.forwardRef(function NestedMenuItem(props, ref) {
  const {
    parentMenuOpen,
    component = "div",
    label,
    rightIcon = props.arrowIcon,
    children,
    className,
    tabIndex: tabIndexProp,
    MenuProps = {},
    ContainerProps: ContainerPropsProp = {},
    ...MenuItemProps
  } = props;

  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

  const menuItemRef = useRef(null);
  useImperativeHandle(ref, () => menuItemRef.current);

  const containerRef = useRef(null);
  useImperativeHandle(containerRefProp, () => containerRef.current);

  const menuContainerRef = useRef(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleMouseEnter = (event) => {
    setIsSubMenuOpen(true);
    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event);
    }
  };

  const handleMouseLeave = (event) => {
    setIsSubMenuOpen(false);
    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event);
    }
  };

  const open = isSubMenuOpen && parentMenuOpen;
  const menuItemClasses = useMenuItemStyles({ open });

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    <div
      {...ContainerProps}
      ref={containerRef}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MenuItem
        {...MenuItemProps}
        className={[menuItemClasses.root, className]}
        ref={menuItemRef}
      >
        {label}
        {rightIcon}
      </MenuItem>
      <Menu
        style={{ pointerEvents: "none" }}
        anchorEl={menuItemRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={open}
        autoFocus={false}
        disableAutoFocus
        disableEnforceFocus
        onClose={() => {
          setIsSubMenuOpen(false);
        }}
      >
        <div ref={menuContainerRef} style={{ pointerEvents: "auto" }}>
          {children}
        </div>
      </Menu>
    </div>
  );
});

export default NestedMenuItem;
