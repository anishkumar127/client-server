import { Button, Input } from '@fluentui/react-components';
import { Add24Regular, Delete24Regular, Edit24Regular, Search24Regular } from '@fluentui/react-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [todo, setTodo] = useState([]) // get from backend all todos and store into this then render it using map.
    const [createTodo, setCreateTodo] = useState(""); // store the all created todo into this
    const navigate = useNavigate();

    // State of edit 
    const [isEditMode, setIsEditMode] = useState<boolean>(false); // state handle one form make it edit and not edit.
    const [editTodoId, setEditTodoId] = useState<boolean>(null);  // store edit item id.
    const [updater, setUpdater] = useState<boolean>(false);  // every time changes make it update the ui.


    // create todo. & send to server.
    const handleCreateTodo = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.post('http://localhost:8000/api/todo', { todo: createTodo }, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        });
        console.log("T", response);
        setUpdater(!updater);
        setCreateTodo("");


    }

    // fetch all the todos from the server.
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
    }, [updater])

    // handle if not logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }

    }, []);

    // log out user.
    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    // handle edit mode.
    const editTodo = (e: any, item: any) => {
        console.log(item);
        setCreateTodo(item.todo)
        setIsEditMode(true);
        setEditTodoId(item._id);
    }

    // update todo main code.
    const handleUpdateTodo = async () => {
        const token = localStorage.getItem("token");
        const updatedTodo = await axios.put(`http://localhost:8000/api/todo/${editTodoId}`, { todo: createTodo }, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        });
        console.log("T", updatedTodo);
        setIsEditMode(false);
        setUpdater(!updater);
        setCreateTodo("");

    }
    // handle delete 
    const handleDelete = async (e: any, item: any) => {
        const token = localStorage.getItem("token");
        const deletedTodo = await axios.delete(`http://localhost:8000/api/todo/${item._id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        });
        console.log("T", deletedTodo);
        setUpdater(!updater);
    }

    // handle search
    const handleSearch = async (e: any) => {
        console.log(e.target.value);
        const token = localStorage.getItem("token");
        const search = await axios.get(`http://localhost:8000/api/search?q=${e.target.value}`, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        });
        console.log("T", search);
        const data = search?.data?.data;
        setTodo(data);
        if (e.target.value === "") { // if "" then should so the real todo. else show the according to the searched todo.
            setUpdater(!updater);
        }
    }

    return (
        <div className='grid gap-4 items-center justify-center mt-10 h-full w-full bg-[#081420]'>
            <h2 className='text-white text-center text-4xl'> ✅ To Do's</h2>

            <Input contentBefore={<Search24Regular />} onChange={handleSearch} placeholder="Search" className='!bg-[#384F6B] !text-white' />

            {todo && todo?.map((item) => {
                // console.log(item);
                return (
                    <div className='flex items-center justify-center gap-2 min-w-[600px]' key={item?._id}>
                        <div className={`text-white p-5 rounded-md bg-[#192431] min-w-[600px] !w-[600px] ${isEditMode && item._id === editTodoId ? "text-black !bg-white" : ""}`}>{item?.todo}</div>
                        <div>< Delete24Regular className='text-white' onClick={(e) => handleDelete(e, item)} /></div>
                        <div><Edit24Regular className='text-white' onClick={(e) => editTodo(e, item)} /></div>
                    </div>
                )
            })}


            {/* Add Task */}
            <div className='flex gap-2'>
                <Input onChange={(e) => setCreateTodo(e.target.value)} value={createTodo} placeholder="Add new task" className='min-w-full  !text-white !p-2 !rounded-sm' /> <span className='!w-[10px]' ><Add24Regular onClick={isEditMode ? handleUpdateTodo : handleCreateTodo} className='text-white ' /></span>

            </div>

            {/* Logged out  */}
            <div className='text-center'><Button onClick={handleLogOut}>Logout</Button></div>
        </div>
    )
}

export default Dashboard