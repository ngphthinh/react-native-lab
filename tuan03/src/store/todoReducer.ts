import { Work, dataTodo } from "../types/work.type";

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string };

interface TodoState {
  works: Work[];
}

export const initialState: TodoState = {
  works: dataTodo,
};

export function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      const work: Work = {
        id: state.works.length + 1 + "",
        title: action.payload,
        completed: false,
      };

      return {
        works: [...state.works, work],
      };
    case "DELETE_TODO": {
      return {
        works: state.works.filter((e) => e.id !== action.payload),
      };
    }
    case "TOGGLE_TODO":
      return {
        works: state.works.map(e=>e.id=== action.payload ? {...e, completed : !e.completed}:e)
      };
    default:
      return state;
  }
}
