import { useState } from "react";
import { GetOriginalWriters } from "../api/getOriginalWriters";
import authStore from "../zustand/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {PodcastCreateRequest} from "../api/podcastCreateRequest";

const PodcastCreate = () => {
    const navigate = useNavigate();
    const [authToken] = authStore((state) => [state.token]);
    const [userId] = authStore((state) => [state.userId]);

    const [inputData, setInputData] = useState({
        title: "",
        content: "",
        writerId: "",
        file: null, // Added file and image to the state
        image: null,
    });

    const [writerData, setWriterData] = useState([]);

    useEffect(() => {
        GetOriginalWriters({ authToken }).then((response) => {
            if (response.httpResponse === 200) {
                setWriterData(response.data);
            } else {
                throw new Error("Failed to fetch candidates");
            }
        });
    }, []);

    const handleWriterChange = (e) => {
        const selectedWriterId = e.target.value;
        setInputData({
            ...inputData,
            writerId: selectedWriterId,
        });
    };

    const handleFileChange = (e) => {
        setInputData({
            ...inputData,
            file: e.target.files[0],
        });
    };

    const handleImageChange = (e) => {
        setInputData({
            ...inputData,
            image: e.target.files[0],
        });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        if (
            !inputData.title ||
            !inputData.content ||
            !inputData.writerId ||
            !inputData.file ||
            !inputData.image
        ) {
            alert("Please fill out all required fields.");
            return;
        }
        try {
            const response = await PodcastCreateRequest({
                title: inputData.title,
                content: inputData.content,
                writerId: inputData.writerId,
                userId: userId,
                file: inputData.file,
                image: inputData.image,
                authToken: authToken,
            });
            console.log("After PodcastCreateRequest :: ", response)
            if (response.status === 200) {
                navigate("/userdetail");
            } else {
                throw new Error("Failed to upload.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto mt-8 pb-8 max-w-[900px] bg-[#e8efef] dark:bg-cardDark p-6 bg-white rounded-lg shadow-md w-full px-40 y-20 h-full">
            <h1 className="text-2xl font-semibold mb-4 dark:text-white">
                Create a New Podcast
            </h1>
            <form
                action=""
                className="flex flex-col"
                onSubmit={handleCreateSubmit} // Use onSubmit to handle form submission
            >
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 font-medium dark:text-white"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-4 py-2 border dark:border-white text-white rounded-lg focus:outline-none focus:border-blue-400 w-[50%]"
                        required
                        onChange={(e) =>
                            setInputData({ ...inputData, title: e.target.value })
                        }
                        value={inputData.title}
                    />
                    <label htmlFor="" className="text-red text-xs">
                        {inputData.title !== "" ? "" : "Title is required"}
                    </label>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="content"
                        className="block text-gray-700 font-medium dark:text-white"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400 w-[50%]"
                        required
                        onChange={(e) =>
                            setInputData({ ...inputData, content: e.target.value })
                        }
                        value={inputData.content}
                    ></textarea>
                    <label htmlFor="" className="text-red text-xs">
                        {inputData.content !== "" ? "" : "Content is required"}
                    </label>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="audio"
                        className="block text-gray-700 font-medium dark:text-white"
                    >
                        Upload MP3 File
                    </label>
                    <input
                        type="file"
                        id="audio"
                        name="audio"
                        accept=".mp3"
                        className="py-2 focus:outline-none focus:border-blue-400 w-[50%]"
                        onChange={handleFileChange} // Handle file input change
                    />
                </div>
                <div className="mb-4 flex flex-col">
                    <label
                        htmlFor="image"
                        className="block text-gray-700 font-medium dark:text-white"
                    >
                        Upload image file
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept=".jpg, .jpeg, .png, .gif"
                        className="py-2 focus:outline-none focus:border-blue-400"
                        onChange={handleImageChange} // Handle image input change
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="writer"
                        className="block text-gray-700 font-medium dark:text-white"
                    >
                        Select Writer
                    </label>
                    <select
                        id="writer"
                        name="writer"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                        required
                        onChange={handleWriterChange} // Handle writer selection
                        value={inputData.writerId}
                    >
                        <option value="" disabled>
                            Select a writer
                        </option>
                        {writerData.map((writer) => (
                            <option key={writer.id} value={writer.id}>
                                {writer.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="" className="text-red text-xs">
                        {inputData.writerId !== "" ? "" : "Writer is required"}
                    </label>
                </div>
                <div className="mb-4 w-[50%]">
                    <button
                        type="submit"
                        className="bg-gray-500 w-full text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 dark:text-white"
                    >
                        Create Podcast
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PodcastCreate;
