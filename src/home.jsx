import React, { useEffect } from 'react'
import { useState } from 'react'
import Create from './create'
import { BsCircleFill, BsTrash } from 'react-icons/bs';
import axios from 'axios'

function Home() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])
    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id) // Corrected the endpoint URL
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))

    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err));
    }
    return (
        <div className='home' style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Todo List</h1>
            <Create />
            {
                todos.length === 0
                    ?
                    <div><h2>No Record</h2></div>
                    :
                    todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)} style={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '360px', justifyContent: 'space-between', backgroundColor: 'black', color: 'white', height: '35px', padding: '2px 5px', marginTop: '14px' }}>
                                {todo.done ? <BsCircleFill></BsCircleFill>
                                    : <BsCircleFill className='icon' style={{ marginRight: '5px', fontSize: '15px' }} />
                                }

                                <span className={todo.done ? "line_through" : ""} style={{ margin: '0px 5px 0px 4px', flex: '1', textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.task}</span>
                                <span><BsTrash className="icon"
                                    onClick={() => handleDelete(todo._id)}
                                    style={{ cursor: 'pointer' }} /></span>

                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default Home
