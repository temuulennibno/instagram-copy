"use client";

import { createContext, useState } from "react";

export const UserContext = createContext({ isSignedIn: false });

export const UserContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
