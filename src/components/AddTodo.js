import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions';

const AddTodo = props => {
  const [ state, setState ] = useState({ input: '' });

  const updateInput = event =>
    setState({ input: event.target.value });

  const handleAddTodo = () => {
    props.addTodo(state.input);

    setState({ input : '' });
  };

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

export default connect(
  null,
  { addTodo }
)(AddTodo);