import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("useDialog must be used within a DialogProvider");
  return context.openDialog;
};

export default DialogContext;
