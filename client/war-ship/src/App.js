import React, { useState } from 'react';
import { Grid } from './components/grid';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  // handleChange = handleChange.bind(this);
  // handleSubmit = handleSubmit.bind(this);

  const setState = (props) => {
    const { name, greeting } = props;
    setName(name)
    setGreeting(greeting);
  }

  const handleChange = (event) => {
    setState({ name: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
      .then(response => response.json())
      .then(state => setState(state));
  }
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;
