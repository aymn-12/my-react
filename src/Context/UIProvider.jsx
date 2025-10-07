// UIContext.jsx
import { useState } from "react";
import { Snackbar } from "@mui/material";
import { UIContext } from "./UIContext";


export default function UIProvider({ children }) {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const showSnackbar = (message) =>
    setSnackbar({ open: true, message });
  const closeSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <UIContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </UIContext.Provider>
  );
}
