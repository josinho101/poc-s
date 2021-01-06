import React from "react";
import { useTranslation } from "react-i18next";
import CircularProgress from "@material-ui/core/CircularProgress";

const I18nProvider = ({ children }) => {
  const { ready } = useTranslation(null, { useSuspense: false });
  if (ready) {
    return children;
  }
  return <CircularProgress />;
};

export default I18nProvider;
