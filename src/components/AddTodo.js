import React, {useState} from 'react';

const AddTodo = props => {
  const { state, setState } = useState({ input: '' });

  const updateInput = input =>
    setState({ input });

  const handleAddTodo = () => {

  }

  return (
    <>
      <input
        onChange={updateInput}
        value={state.input}
      />
      <button
        className='add-todo'
        onClick={handleAddTodo}
      >
        Add Button
      </button>
    </>
  );
};

export default AddTodo;