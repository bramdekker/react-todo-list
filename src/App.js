import './App.css';
import TodoList from './TodoList';
import AddTodoField from './AddTodoField';
import ClearButtons from './ClearButtons';
import Legend from './Legend.js';
import { useState, useEffect, useRef } from 'react';

// Todos is an object with title, description, due date, category (work, etc), isCompleted.

// First show in list and be able to add new todos!
const STORAGE_KEY = "react-todo-list-todos-34yncvo35";
const TODO_KEY = "react-todo-list-keycount-28hjbdvf34675wr";

function App() {
  const [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
  const [keyCount, setKeyCount] = useState(JSON.parse(localStorage.getItem(TODO_KEY)) || 0);
  const [sortDir, setSortDir] = useState("dueDate_asc");

  const sortTodos = useRef(() => {});

  sortTodos.current = () => {
    let reversed = false;
    let prop = sortDir.split("_")[0];

    if (sortDir.endsWith("desc")) {
      reversed = true;
    }

    // For future, just use a function on setAllTodo -> cleaner and no linter warnings!
    const newTodos = allTodos.slice();
    newTodos.sort((a, b) => sortOnProp(a, b, prop, reversed));

    setAllTodos(newTodos);
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTodos));
  }, [allTodos]);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(keyCount));
  }, [keyCount]);

  useEffect(() => {
    sortTodos.current();
  }, [sortDir]); // with allTodos it will render infinitly!
  // Try with useRef() like Ben Awad.

  // Check when it is rendered again.
  useEffect(() => {
    console.log("Rendered again!");
  }, [allTodos, keyCount, sortDir]);

  function sortOnProp(b, a, prop, reversed) {
    // Date is a string in the form dd/mm/yyyy.
    if (prop === "dueDate") {
      const aDateSplitted = a.dueDate.split("/");
      const aDate = new Date(aDateSplitted[2], aDateSplitted[1], aDateSplitted[0]);
      const bDateSplitted = b.dueDate.split("/");
      const bDate = new Date(bDateSplitted[2], bDateSplitted[1], bDateSplitted[0]);      

      if (reversed) {
        return (aDate > bDate) - (aDate < bDate);
      }

      return (bDate > aDate) - (bDate < aDate);
    }

    if (reversed) {
        return (a[prop] > b[prop]) - (a[prop] < b[prop]);
    }

    return (b[prop] > a[prop]) - (b[prop] < a[prop]);
  }

  return (
    <>
      <h2 className="appTitle">My TODO list</h2>
      <div className="gridContainer">
        <AddTodoField 
          setTodos={setAllTodos}
          keyCount={keyCount}
          setKeyCount={setKeyCount}
        />
        <div>
          <Legend />
          <ClearButtons setTodos={setAllTodos} todos={allTodos}/>
          <TodoList setTodos={setAllTodos} todos={allTodos || []} sortDir={sortDir} setSortDir={setSortDir}/>
        </div>
      </div>
    </>
  );
}

export default App;
