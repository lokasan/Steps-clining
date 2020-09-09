import { ADD_TODO } from '../../components/types'
import { REMOVE_TODO } from '../../components/types'

const handlers = {
    [ADD_TODO]: (state, {title, pas}) => ({...state, 
        todos: [
            ...state.todos, 
            {
                id: Date.now().toString(),
                title,
                pas
            }
        ]}),
    [REMOVE_TODO]: (state, {id}) => ({
            ...state, 
            todos: state.todos.filter(todo => todo.id !== id)
    }),
    DEFAULT: state => state
}

export const emploeeReducer = (state, action) => {
   const handler = handlers[action.type] || handlers.DEFAULT
   return handler(state, action)
}