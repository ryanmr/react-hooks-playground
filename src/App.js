import React, { Component, useState } from 'react';

function FieldComponent({ label, value }) {
  const [name, setName] = useState('');

  return (
    <div>
      <h1 className="title">{label}</h1>
      <input
        style={{
          border: 0,
          borderBottom: '1px solid #000',
        }}
        className="subtitle"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="section">
          <div className="container">
            <FieldComponent label="First Name" value="Hi" />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
