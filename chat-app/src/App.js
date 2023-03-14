import { useState } from "react";
import RegisterPage from "./pages/Register";

const App = () => {

  const { state, setState } = useState({
    route: 'register'
  })

  return (
    <div>
      {state.route === 'register' && <RegisterPage />}
      {/* {state.route === 'signIn' && <SignInPage />} */}

    </div>
  );
}

export default App;
