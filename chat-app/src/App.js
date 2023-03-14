import { useState } from "react";
import RegisterPage from "./pages/Register";
import SignInPage from "./pages/SignIn";

const App = () => {

  const [state, setState] = useState({
    route: 'register',
    user_id: "",
    name: "",
    contact_no: "",
  })

  return (
    <div>
      {state.route === 'register' && <RegisterPage gotoSignIn={() => setState(prev => { return { ...prev, route: 'signIn' } })} />}
      {state.route === 'signIn' && <SignInPage gotoRegister={() => setState(prev => { return { ...prev, route: 'register' } })} />}

    </div>
  );
}

export default App;
