import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import ChatPage from "./pages/ChatPage";

function App() {
  const { user } = useSelector((state) => state.user);
  const ProtectedRoute = ({ children }) => {
    if (user) {
      return children;
    }
    return <Navigate to={"/login"} />;
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate to={"/"} /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to={"/"} /> : <SignupPage />}
            />

            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
