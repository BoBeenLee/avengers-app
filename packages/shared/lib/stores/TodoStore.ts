import { types } from "mobx-state-tree";
import Todo, { ITodo } from "./Todo";

import { uniqueId } from "@shared/utils/common";

const PREFIX_TODO_ID = "todo";

const TodoStore = types
  .model("TodoStore", {
    todos: types.optional(types.array(Todo), [])
  })
  .views(self => {
    return {
      get todosByOrderDESC() {
        return self.todos.reverse();
      },
      get todoTest() {
        return "todoTest123";
      }
    };
  })
  .actions(self => {
    const reset = () => {
      self.todos.clear();
    };

    const addTodo = (name: string) => {
      self.todos.push(
        Todo.create({
          name,
          id: uniqueId(PREFIX_TODO_ID),
          order: self.todos.length + 1
        })
      );
    };

    const afterAttach = () => {
      addTodo("Hell");
      addTodo("lo");
    };

    return {
      afterAttach,
      addTodo,
      reset
    };
  });

export const getTodoStore = (stores: any) => stores.store.todoStore;
export type ITodoStore = typeof TodoStore.Type;
export default TodoStore;
