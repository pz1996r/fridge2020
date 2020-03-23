import React from 'react';

function App() {
  const request = () => {
    fetch('/.netlify/functions/routes/api1')
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        console.log(resp);
      });
  };
  const request2 = () => {
    fetch('/.netlify/functions/routes/api2')
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        console.log(resp);
      });
  };
  return (
    <div>
      <button type="button" onClick={request}>
        Sprawdź czy działa
      </button>
      <button type="button" onClick={request2}>
        Sprawdź czy działa2
      </button>
    </div>
  );
}
export default App;
