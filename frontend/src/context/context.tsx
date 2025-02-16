import { createContext, useState, ReactNode } from "react";

const AppContext = createContext({} as any);

export const AppProvider = ({ children }: { children: ReactNode }) => {

  const [IsSelectWomens, SetIsSelectWomens] = useState(true);
  const [IsSideBarOpen, SetIsSidebarOpen] = useState(false)
  const [IsAuthOpen, SetIsAuthOpen] = useState(false)
  const [IsLogOutOpen, SetIsLogOutOpen] = useState(false)

  const [Carts, SetCarts] = useState(null)

  const [Orders, SetOrders] = useState(null)

  const [user, setUser] = useState(null);

  const loginUser = (userData: any) => {
    setUser(userData);
  };

  const settingCarts = (products) => {
    SetCarts(products)
  }

  const logoutUser = () => {
    setUser(null);
  };


  return (
    <AppContext.Provider value={{
      SetIsSelectWomens, IsSelectWomens, SetIsSidebarOpen, IsSideBarOpen, SetIsAuthOpen,
      IsAuthOpen, loginUser, logoutUser, user, setUser, Carts, SetCarts, settingCarts, SetOrders, Orders, IsLogOutOpen, SetIsLogOutOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
