
import React, { useState, useEffect } from 'react';
import { getAllUser, deleteUser, updateUser_1 } from '../helper/helper';

export default function ShowUsers() {
    const [data, setData] = useState([]);
    const [updatedUserData, setUpdatedUserData] = useState({});

    const [showModal, setShowModal] = useState(false);


    const handleChange = (event) => {
        setUpdatedUserData({ ...updatedUserData, [event.target.name]: event.target.value });

    }
    const fetchData = async () => {
        const response = await getAllUser();
        setData(await response.data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await deleteUser(userId);
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (user) => {
        setUpdatedUserData(user);
        setShowModal(true);
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const response = await updateUser_1(updatedUserData._id, updatedUserData); // Call your update function to update the user data
            setShowModal(false);
            fetchData()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container mx-10 px-5 py-10'>
            <div className='max-w-4x2 mx-auto'>
                <table className='w-full whitespace-nowrap bg-white overflow-hidden rounded-lg shadow-sm mb-8'>
                    <thead>
                        <tr className='text-left font-bold'>
                            <th className='px-6 pt-5 pb-4'>Name</th>
                            <th className='px-6 pt-5 pb-4'>Email</th>
                            <th className='px-6 pt-5 pb-4'>Role</th>
                            <th className='px-6 pt-5 pb-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {data.map((user) => (
                            <tr key={user._id}>
                                <td className='px-6 py-4'>{user.username}</td>
                                <td className='px-6 py-4'>{user.email}</td>
                                <td className='px-6 py-4'>{user.roleId}</td>
                                <td className='px-6 py-4'>
                                    <button
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showModal ? (
                    <>
                        <div

                            className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-1 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Update User
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <form>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Name:</label>
                                            <input type="text" name="username" value={updatedUserData.username} onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Email:</label>
                                            <input type="text" name="email" value={updatedUserData.email} onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Role:</label>
                                            <input type="text" name="role" value={updatedUserData.roleId} onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={(event) => handleUpdate(event)}                                        >
                                                Save Changes
                                            </button>
                                        </div>
                                        {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Update
                                    </button> */}
                                    </form>
                                    {/*footer*/}

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}

            </div >
        </div>
    )
}