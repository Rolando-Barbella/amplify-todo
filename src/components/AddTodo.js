import React, { useState } from 'react';

const AddTodo = ({ onCreate }) => {
  const [todo, setTodo] = useState({ name: '', description: '',});

  const handleChange = (name, event) => {
    event.persist();
    setTodo((todo) => {
      return { ...todo, [name]: event.target.value }
    });
  };

  const submit = async() => {
    const input = {
      name: todo.name,
      description: todo.description
    }
    console.log(input);

    try {
    	await onCreate(input)
    } catch (err) {
    	console.error(err);
    }
  }

  return (
    <div>
      <input
        name="name"
        placeholder="name"
        onChange={(event) =>  handleChange('name', event)}
      />
      <input
        name="description"
        placeholder="description"
        onChange={(event) => handleChange('description', event)}
      />
      <button onClick={submit}>
        Add
      </button>
    </div>
  );
};

export default AddTodo;