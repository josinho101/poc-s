import i18n from "./i18n";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  headerControls: {
    display: "flex",
  },
  languageText: {
    marginTop: ".5em",
  },
}));

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isEspanol, setIsEspanol] = useState(false);

  const handleLanguageChange = (e) => {
    setIsEspanol(e.target.checked);
    if (e.target.checked) {
      i18n.changeLanguage("es");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {t("home.app-title")}
          </Typography>
          <div className={classes.headerControls}>
            <Typography variant="body2" className={classes.languageText}>
              English
            </Typography>
            <Switch
              checked={isEspanol}
              onChange={handleLanguageChange}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            <Typography variant="body2" className={classes.languageText}>
              Spanish
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
