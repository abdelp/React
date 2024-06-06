import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import VisibilityFilters from './components/VisibilityFilters';
import './App.css';
import { FormattedDate} from 'react-intl'
import { memo, useState } from 'react';

const Numbers = memo(({ nums, addRandom }) => {
  console.log('Numbers rendered');

  return (
    <div>
      <ul>
        {nums.map((num, i) => {
          <li key={i}>{num}</li>
        })}
      </ul>
      <button onClick={addRandom}>Add random</button>
    </div>
  )
});

const App = () => {
  const [nums, setNums] = useState([]);
  const [count, setCount] = useState(0);

  const increaseCounter = () => {
    setCount(count + 1)
  }

  const addRandom = () => {
    let randNum = parseInt(Math.random() * 1000, 10);
    setNums([...nums, randNum]);
  }

  return (
    <div className='todo-app'>
      <div>
        Count: {count} &nsbp;
        <button onClick={increaseCounter}>+</button>
      </div>
      <hr />
      <Numbers nums={nums} addRandom={addRandom} />
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
};

export default App;
