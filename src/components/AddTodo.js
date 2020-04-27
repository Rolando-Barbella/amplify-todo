import React, { useState } from 'react';

const AddTodo = ({ onCreate }) => {
  const [todo, setTodo] = useState({ name: '' });

  const handleChange = (name, event) => {
    event.persist();
    setTodo((todo) => {
      return { ...todo, [name]: event.target.value }
    });
  };

  const submit = async() => {
    const input = {
      name: todo.name,
    }
    try {
      await onCreate(input);
      await setTodo({ name: ''});
    } catch (err) {
    	console.error(err);
    }
  }

  return (
    <div className="add-container">
      <input
        name="name"
        placeholder="todo"
        value={todo.name}
        onChange={(event) =>  handleChange('name', event)}
      />
      <div>
        <button onClick={submit} className="add-btn">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;