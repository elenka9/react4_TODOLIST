import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  // редьюсеры тип действий, который будут происходить в нашем слайсе: создание, зачеркивание, удаление
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    editTodo: (state, action) => {
      const { id, text, completed } = action.payload; //деструктуризация свойств объекта action.payload
      const todo = state.find((todo) => todo.id === id); // ищет задачу по id
      if (todo) {
        //если находит
        todo.text = text; // обновляет текст
        todo.completed = completed; // и статус выполнения
      }
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, editTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
