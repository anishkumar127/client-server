import React, { useEffect, useState } from 'react'
import { Label, Input, Button } from '@fluentui/react-components'
import { Search24Regular, Delete24Regular, Edit24Regular, Add24Regular } from '@fluentui/react-icons';
import axios from 'axios';

const Dashboard = () => {
    const [todo, setTodo] = useState([])
    const [createTodo, setCreateTodo] = useState("")
    const handleCreateTodo = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8000/api/todo',{todo:createTodo}, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        });
        console.log("T", response);

    }
    useEffect(() => {
        ; (async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:8000/api/todo', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            console.log(response);
            const data = response?.data?.data;
            setTodo(data);

        })()
    }, [])
    return (
        <div className='grid gap-4 items-center justify-center mt-10 h-full w-full bg-[#081420]'>
            <h2 className='text-white'> ✅ To Do's</h2>

            <Input contentBefore={<Search24Regular />} placeholder="Search" />

            {todo && todo?.map((item) => {
                console.log(item);
                return (
                    <div className='flex items-center justify-center gap-2' key={item?._id}>
                        <div className='text-white'>{item?.todo}</div>
                        <div>< Delete24Regular className='text-white' /></div>
                        <div><Edit24Regular className='text-white' /></div>
                    </div>
                )
            })}


            {/* pagination */}


            {/* Add Task */}
            <div>
                <Input onChange={(e) => setCreateTodo(e.target.value)} placeholder="Add new task" /> <span><Add24Regular onClick={handleCreateTodo} className='text-white' /></span>

            </div>
        </div>
    )
}

export default Dashboard