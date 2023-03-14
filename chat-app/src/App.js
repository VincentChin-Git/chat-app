import { useState } from "react";
import RegisterPage from "./pages/Register";
import SignInPage from "./pages/SignIn";
import { handleStateChange } from "./utils/globalFunc";

const App = () => {

  const [state, setState] = useState({
    route: 'signIn',
    user_id: "",
    name: "",
    contact_no: "",
  })

  return (
    <div>
      {state.route === 'register' &&
        <RegisterPage
          gotoSignIn={() => handleStateChange(setState, { route: 'signIn' })}
        />
      }

      {state.route === 'signIn' &&
        <SignInPage
          gotoRegister={() => handleStateChange(setState, { route: 'register' })}
          setStateApp={setState}
        />
      }

      {state.route === 'home' && 'home'}

    </div>
  );
}

export default App;
