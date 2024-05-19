import React, { useEffect, useState } from 'react'
import axios from '../../config/axios';
import { AuthState } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function Profile() {

    const [profilePicture, setProfilePicture] = useState(null)

    useEffect(() => {
        const dropzone = document.getElementById('dropzone');

        dropzone.addEventListener('dragover', e => {
            e.preventDefault();
            dropzone.classList.add('border-indigo-600');
        });

        dropzone.addEventListener('dragleave', e => {
            e.preventDefault();
            dropzone.classList.remove('border-indigo-600');
        });

        dropzone.addEventListener('drop', e => {
            e.preventDefault();
            dropzone.classList.remove('border-indigo-600');
            const file = e.dataTransfer.files[0];
            displayPreview(file);
        });

        const input = document.getElementById('file-upload');

        input.addEventListener('change', e => {
            const file = e.target.files[0];
            displayPreview(file);
        });

        function displayPreview(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const preview = document.getElementById('preview');
                preview.src = reader.result;
                preview.classList.remove('hidden');
            };
        }
    }, [])

    const { setUserDetails, userDetails } = AuthState()

    const handleUpdateProfile = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('image', profilePicture)

        axios.put('/api/auth/update-user', formData).then(({ data }) => {
            if (data.success) {
                toast.success(data.message)
                localStorage.setItem('user_details', JSON.stringify(data.data))
                setUserDetails(data.data)
            } else {
                toast.error(data.message)
            }
        }).catch((error) => {
            toast.error(error.response ? error.response.data.message : error.toString())
        })
    }

    return (
        <div className="bg-white border-4 rounded-lg shadow relative m-10">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Update Details</h3>
            </div>
            <form onSubmit={(event) => handleUpdateProfile(event)}>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6 mb-4">
                        <div className="col-span-6 sm:col-span-3 relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
                            <input type="file" id="file-upload" className="absolute inset-0 w-full h-full opacity-0 z-50" onChange={(event) => setProfilePicture(event.target.files[0])} />
                            <div className="text-center">
                                <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    <label htmlFor="file-upload" className="relative cursor-pointer">
                                        <span>Drag and drop</span>
                                        <span className="text-indigo-600"> or browse</span>
                                        <span>to upload</span>
                                        {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                                    </label>
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <img src={userDetails?.fileUrl} className={userDetails.fileUrl ? "mx-auto max-h-40" : "mx-auto max-h-40 hidden"} id="preview" alt='' />
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2">
                                Username
                            </label>
                            <input readOnly type="text" value={userDetails?.userName} name="username" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="username" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">
                                Email
                            </label>
                            <input readOnly value={userDetails?.email} type="text" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Electronics" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">
                                User Role
                            </label>
                            <input readOnly value={userDetails?.role} type="text" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Electronics" />
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-200 rounded-b">
                    <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">
                        Update Profile
                    </button>
                </div>
            </form>
        </div>

    )
}
