import React, {useEffect, useState} from 'react'
import {WriterListRequest} from '../api/WriterListRequest'
import authStore from '../zustand/authStore'

const BookWriter = () => {
    const [authToken] = authStore((state) => [state.token]);
    const [writerData, setWriterData] = useState([]);

    useEffect(() => {
        WriterListRequest({authToken})
            .then((response) => {
                console.log("Responsponse data ", response.data);
                if (response.data.httpResponse === 200) {
                    console.log("Writer list data", response.data.data);
                    setWriterData(response.data.data);
                }
            })
            .catch((error) => {
                if (error.response.data.httpResponse === 502) {
                    console.log(error.response.data.message);
                    toast.error(error.response.data.message);
                }
            })
    }, [])
    return (
        <>
            <div className='w-full h-screen relative py-20 px-40 dark:bg-dark'>
                <div className=''>
                    <h1 className='text-3xl text-black bold mb-7 dark:text-white'>Writers List</h1>
                    <div className='card-list flex flex-wrap'>
                        {
                            writerData.map((item) =>
                                <div key={item.id}
                                     className='writer text-center md:w-2/12 sm:w-3/12 flex flex-col items-center mx-2 my-4 p-7 shadow-sm shadow-gray-500 dark:bg-cardDark dark:text-white border-gray dark:border-borderDark dark:shadow-lg'>
                                    <img src={item.imageUrl} alt={item.name}
                                         className='mb-3 rounded-full w-[90px] max-w-[91px] h-[90px] rounded-full w-[70px] h-[70px]'/>
                                    <h2 className='text-md textLight'>{item.name}</h2>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
export default BookWriter;