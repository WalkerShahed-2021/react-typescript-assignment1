import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'


interface Todo {
    id: number;
    text: string;
}

type ActionType =
    | { type: "ADD"; text: string }
    | { type: "DELETE"; id: number }

function Todos() {

    const reducer = (state: Todo[], action: ActionType) => {
        switch (action.type) {
            case "ADD":
                return [
                    ...state,
                    {
                        id: state.length,
                        text: action.text,
                    },
                ];
            case "DELETE":
                return state.filter(({ id }) => id !== action.id)
        }

    }

    const GetData = () => {
       let data:any = localStorage.getItem('MyData')
       data = JSON.parse(data);
       if(data === undefined){
           return []
       } else{
           return data;
       }
    }

    const [todos, dispatch] = useReducer(reducer, GetData())

    useEffect(() => {
        localStorage.setItem('MyData', JSON.stringify(todos))
    }, [todos]);

    const newTodoRef = useRef<HTMLInputElement>(null)

    const onAddTodo = useCallback(() => {
        if (newTodoRef.current) {
            if (newTodoRef.current.value === "") {
                return;
            }
            dispatch({
                type: 'ADD',
                text: newTodoRef.current.value,
            })
            newTodoRef.current.value = "";
            
        }
    }, [])



    return (
        <div className='h-50 m-10'>
            <div className='mt-5 p-10'>
                <h1 className='p-5 bg-stone-500 font-bold text-3xl	 text-white'>TodoList</h1>
                <div className='bg-white min-h-fit  drop-shadow-lg'>
                <input placeholder='Add Item....' className='p-2 border-2 mt-2 px-12' ref={newTodoRef} type="text" />
                <button className='bg-green-600 p-2 px-5 border-separate rounded-sm text-white text-xl' onClick={onAddTodo}>Add</button>
                {
                    todos.map((todo: any, index) => <div key={index} className='text-xl grid grid-cols-6'>
                          <div className='grid grid-cols-4 gap-4 mx-5'>
                              {todo.text}
                          </div> 
                         <span className='mx-2'><button className='bg-red-600 p-2 px-4 m-2 rounded-lg  border-separate text-white' onClick={() => dispatch({ type: "DELETE", id: todo.id })}>Delete</button></span>
                    </div>)
                }
                </div>
            </div>
        </div>

    )
}

export default Todos;
