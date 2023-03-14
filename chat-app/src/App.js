import { useEffect, useState } from "react";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import SignInPage from "./pages/SignIn";
import { handleStateChange } from "./utils/globalFunc";

const App = () => {

  const [state, setState] = useState({
    route: 'signIn',
    user_id: "",
    name: "",
    contact_no: "",
    profile_image: "",

    chat_list: [],
  })

  useEffect(() => {
    if (state.route === 'home') {

    }
  }, [state.route])

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

      {state.route === 'home' &&
        <HomePage
          user_id={state.user_id}
          name={state.name}
          contact_no={state.contact_no}
          profile_image={state.profile_image}
        />
      }

    </div>
  );
}

export default App;
