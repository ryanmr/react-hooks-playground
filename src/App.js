import React, { Component, useState, useContext } from 'react';

function useInput(initial) {
  const [value, setValue] = useState(initial);
  return {
    value,
    onChange: e => setValue(e.target.value),
  };
}

function FieldComponent({ label, value }) {
  return (
    <div>
      <h1 className="title">{label}</h1>
      <input
        style={{
          border: 0,
          borderBottom: '1px solid #000',
        }}
        className="subtitle"
        {...useInput(value)}
      />
    </div>
  );
}

const ThemeContext = React.createContext('#ff0000');

const AppContext = React.createContext({});

function AppState({ children }) {
  const [username, setUsername] = useState('');
  const [hasAuth, setHasAuth] = useState(false);

  const state = {
    username,
    hasAuth,
  };

  const actions = {
    setUsername,
    setHasAuth,
  };

  return (
    <AppContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function UsernameField() {
  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);
  console.log(appContext);
  console.log(themeContext);

  return <FieldComponent label="Username" value="" />;
}

function SignInFormField({ label, value, onChange, ...props }) {
  return (
    <div>
      <h1 className="title">{label}</h1>
      <input
        {...props}
        style={{
          border: 0,
          borderBottom: '1px solid #000',
        }}
        className="subtitle"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function SignInForm() {
  const appContext = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setValue = setter => e => setter(e.target.value);

  return (
    <div>
      <SignInFormField
        label="Username"
        value={username}
        onChange={setValue(setUsername)}
      />
      <hr />
      <SignInFormField
        label="Password"
        value={password}
        type="password"
        onChange={setValue(setPassword)}
      />
      <br />
      <button className="button">Sign in</button>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppState>
          <section className="section">
            <div className="container">
              <SignInForm />
            </div>
          </section>
        </AppState>
      </div>
    );
  }
}

export default App;
