import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task: task })
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="create_form">
            <input
                type="text"
                style={{ width: '300px', padding: '10px', borderBottom: '2px solid', outline: 'none' }}
                className="create_input"
                placeholder='Enter Task'
                onChange={(e) => setTask(e.target.value)}
            />
            <button
                type='button'
                style={{ padding: '10px', backgroundColor: 'black', color: 'white', cursor: 'pointer' }}
                onClick={handleAdd}
                className="button"
            >
                Add
            </button>
        </div>
    );
}

export default Create;
