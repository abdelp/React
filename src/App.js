import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import VisibilityFilters from './components/VisibilityFilters';
import './App.css';
import {useIntl, FormattedDate} from 'react-intl'

const App = () => {
  const intl = useIntl();

  return (
    <div className='todo-app'>
      <h1>{intl.formatMessage('Todo List')}</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
};

export default App;
