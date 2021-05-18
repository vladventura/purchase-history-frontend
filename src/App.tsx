import { AuthProvider } from "./context/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { AuthRoute } from "./utils/AuthRoute";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
      </Router>
    </AuthProvider>
  );
};

export default App;
