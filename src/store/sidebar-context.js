import { createContext, useContext, useState } from "react";

const SideBarContext = createContext(null);

export function SideBarContextProvider({ children }) {
  // State
  const [sideBarVisible, setSideBarVisible] = useState(false);

  return (
    <SideBarContext.Provider value={{ sideBarVisible, setSideBarVisible }}>
      {children}
    </SideBarContext.Provider>
  );
}

export const useSide = () => useContext(SideBarContext);
