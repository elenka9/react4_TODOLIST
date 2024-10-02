import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, addTodo, editTodo } from "./TodoSlice";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null); // начальное значение null означает что изначально никакая задача не редактируется
  const todos = useSelector((state) => state.todos); //хук для получения данных из store, получаем доступ к нужным частям состояния используя функцию выбора
  const dispatch = useDispatch(); // хук для отправки действий в store

  const handleAddTodo = () => {
    if (input.trim()) {
      // если инпут не пустой и без пробелов
      if (editId) {
        dispatch(
          // Отправляет действие в хранилище
          editTodo({
            //обновляет задачу
            id: editId, //id задачи которая редактируется
            text: input, //новый текст задачи взят из инпута
            completed: false,
          })
        );
        setEditId(null); //сбрасывает в null что означает что редактирование завершено и больше никакая задача не редактируется
      } else {
        dispatch(addTodo(input)); //диспатчим наше действие,передаем наш инпут
      }
      setInput(""); // обнуляем наш инпут
    }
  };

  const handleEditTodo = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      ></input>
      <button onClick={handleAddTodo}>{editId ? "Edit" : "Add"}</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span> {todo.text}</span>
            <button onClick={() => handleEditTodo(todo)}>Edit</button>

            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
