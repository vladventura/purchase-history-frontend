import { AuthProvider } from "./context/auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConfirmAccount, Home, Login, NotFound, Register } from "./pages";
import { AuthRoute } from "./utils/AuthRoute";
import "semantic-ui-css/semantic.min.css";
import { ItemsProvider } from "./context/items";

const App = () => {
  return (
    <AuthProvider>
      <ItemsProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute
              exact
              path="/confirm-account"
              component={ConfirmAccount}
            />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </ItemsProvider>
    </AuthProvider>
  );
};

export default App;
