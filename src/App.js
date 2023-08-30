import { useRef, useState } from 'react';
import './css/App.css'

function App() {

  const todoVal = useRef();

  const [todo, setTodo] = useState({
    todo: "",
    todos: []
  })



  const addTodo = (event) => {
    event.preventDefault();
    const todoInputVal = todoVal.current.value;
    todoVal.current.value = ""

    let largestId = 0;

    todo.todos.forEach((todo) => {
      if (todo.id > largestId) {
        largestId = todo.id
      }
    })

    setTodo((prevTodo) => ({
      ...prevTodo,
      todo: "",
      todos: [
        ...prevTodo.todos,
        {
          id: largestId + 1,
          todoText: todoInputVal
        }
      ]
    }))
  }

  const handleTodo = () => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      todo: todoVal.current.value
    }))
  }

  const deleteHandle = (id) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      todos: [
        ...prevTodo.todos.filter(item => item.id !== id)
      ]
    }))
  }

  return (
    <>
      <section className="container">
        <div className="todo">
          <div className="todo-header">
            <h1>To-Do List App</h1>
            <form onSubmit={e => addTodo(e)} action='' className="input-group">
              <input type="text" ref={todoVal} onChange={handleTodo} defaultValue={todo.todo} placeholder='Set Todo' />
              <button type='submit'>Add</button>
            </form>
          </div>
          <div className="todo-body">
            <ul>
              {
                todo.todos.length > 0 ? (
                  todo.todos.map((item) => (
                    <li key={item.id}>
                      <div>
                        <input id={`item${item.id}`} type="checkbox" />
                        <label htmlFor={`item${item.id}`} > {item.todoText} </label>
                      </div>
                      <button onClick={() => deleteHandle(item.id)} type='button'>&#x2716;</button>
                    </li>
                  ))
                ) : ""
              }
            </ul>
          </div>
        </div>
      </section>

    </>
  );
}

export default App;
