import React, { Component, useState, useContext } from 'react';

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
    login: username => {
      setUsername(username);
      setHasAuth(true);
    },
    logout: () => {
      setUsername('');
      setHasAuth(false);
    },
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

function SignInFormField({ label, value, onChange, ...props }) {
  return (
    <div>
      <h1 className="title is-4">{label}</h1>
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

function SignIn() {
  return (
    <section className="section">
      <div className="container">
        <SignInForm />
      </div>
    </section>
  );
}

function SignInForm() {
  const appContext = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setValue = setter => e => setter(e.target.value);

  const handleSignIn = e => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    appContext.actions.login(username);
  };

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
      <button className="button" onClick={handleSignIn}>
        Sign in
      </button>
    </div>
  );
}

function SuperSecret({ children }) {
  const appContext = useContext(AppContext);
  const { hasAuth, username } = appContext.state;

  return hasAuth ? (
    <PermissionGranted username={username}>{children}</PermissionGranted>
  ) : (
    <PermissionDenied />
  );
}

function PermissionGranted({ username, children }) {
  return (
    <section className="section permission-granted">
      <div className="container">
        <div>
          <h3 className="title is-4">Hi {username}!</h3>
          <hr />
        </div>
        <div>{children}</div>
        <div>
          <hr />
          <SignOutButton>Sign out</SignOutButton>
        </div>
      </div>
    </section>
  );
}

function PermissionDenied() {
  return (
    <section className="section super-secret">
      <div className="container">
        <h3 className="title is-4">Super Secret</h3>
        <p>Sign in is required</p>
      </div>
    </section>
  );
}

function SignOutButton({ children }) {
  const appContext = useContext(AppContext);
  const { logout } = appContext.actions;
  return (
    <button className="button" onClick={logout}>
      {children}
    </button>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppState>
          <SignIn />
          <SuperSecret>
            <h3 className="title is-3">Amazing Content</h3>
            <p>You can see this super special secret content now.</p>
          </SuperSecret>
        </AppState>
      </div>
    );
  }
}

export default App;
