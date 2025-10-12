// UIContext.jsx
import { useState } from "react";
import { Snackbar,Alert } from "@mui/material";
import { UIContext } from "./UIContext";


export default function UIProvider({children}) {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity:'' });

  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });
  const closeSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false })); 
  return (
    <UIContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
      </Snackbar>
    </UIContext.Provider>
  );
}
