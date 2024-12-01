import React, {useContext} from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContext } from "./context/AuthContext";

const Layout = ({children}) => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
