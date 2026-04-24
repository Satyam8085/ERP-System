import { useState } from "react";
import DashboardLayout from "./components/DashboardLayout";
import LoginPage from "./components/LoginPage";
import {
  clearStoredUser,
  getStoredUser,
  storeUser,
} from "./services/authStorage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());

  if (!currentUser) {
    return (
      <LoginPage
        onLogin={(user) => {
          storeUser(user);
          setCurrentUser(user);
        }}
      />
    );
  }

  return (
    <DashboardLayout
      currentUser={currentUser}
      onLogout={() => {
        clearStoredUser();
        setCurrentUser(null);
      }}
    />
  );
};

export default App;
