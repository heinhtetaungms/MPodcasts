import {useEffect, useState} from "react";
import banner from "../assets/img/banner.png";

import authStore from "../zustand/authStore";
import {FaFlag, FaStar, FaStickyNote} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {VipList} from "../api/VipList";

const VipPage = () => {
    const navigate = useNavigate();

    const [authToken] = authStore((state) => [state.token]);
    const [selectedVip, setSelectedVip] = useState([]);


    const handleCheckboxChange = (vipId) => {
        setSelectedVip(vipId);
    };

    const openSubTaskDetailModal = (selectedVip) => {
        navigate("/payment", {
            state: {selectedVip},
        });
    };

    const [vipData, setvipData] = useState([]);

    useEffect(() => {
        VipList({authToken}).then((response) => {
            if (response.httpResponse === 200) {
                setvipData(response.data);
            } else {
                throw new Error("Failed to fetch candidates");
            }
        });
    }, []);

    return (
        <div className="h-screen relative ">
            <div className="relative ">
                <div className="bg-secondary w-full h-[300px]">
                    <img src={banner} alt="" className="h-[300px] w-full"/>
                </div>
                <div
                    className="absolute bottom-[-10px] py-7  w-full position flex items-center text-white flex-col"
                    style={{
                        background: "linear-gradient( rgba(0,0, 0, 0),rgba(0, 0, 0, 1))",
                    }}
                >
                    <p>VIP Expression</p>
                    <p>Unlock Exclusive benefits and receive</p>
                </div>
            </div>
            <div className=" h-auto text-black dark:bg-black dark:text-white p-10">
                <div className="mb-10">
                    <p className="text-lg">Getting Started</p>
                    <p className="text-sm">Becomeing a VIP is as easy as 1,2,3</p>
                </div>
                <div className="flex mb-5">
                    <p
                        className="bg-orange flex justify-center items-center w-[60px] h-[60px]"
                        style={{borderRadius: "100%"}}
                    >
                        <FaStickyNote size={20}/>
                    </p>
                    <div className="ms-10">
                        <p>Step 1</p>
                        <p>Select your Premium Level</p>
                    </div>
                </div>
                <div className="flex mb-5">
                    <p
                        className="bg-whiteGray flex justify-center items-center w-[60px] h-[60px]"
                        style={{borderRadius: "100%"}}
                    >
                        <FaFlag size={20}/>
                    </p>
                    <div className="ms-10">
                        <p>Step 2</p>
                        <p>Select your payment account</p>
                    </div>
                </div>
                <div className="flex mb-5">
                    <p
                        className="bg-green bg-opacity-60 flex justify-center items-center w-[60px] h-[60px]"
                        style={{borderRadius: "100%"}}
                    >
                        <FaStar size={20}/>
                    </p>
                    <div className="ms-10">
                        <p>Step 3</p>
                        <p>Confirm your payment and get your Vip </p>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-black p-10 text-black dark:text-white">
                <div className="">
                    <p className="text-2xl">Getting Started</p>
                    <p className="text-sm"> Becoming as VIP is as easy as 1,2,3</p>
                </div>
                <div className=" mt-10 pb-20">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left  dark:text-gray-400">
                            <thead className="text-xs uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Premium Level
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tern
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Buy Now
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {vipData.map((type) => (
                                <tr key={type.id}
                                    className="border-b border-gray-200 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                                    >
                                        {type.subscriptionTier}
                                    </th>
                                    <td className="px-6 py-4">{type.month} months</td>
                                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                        {type.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="radio" // Use radio buttons instead of checkboxes
                                            name="selectedVip" // Use the same name for all radio buttons
                                            checked={type.id === selectedVip}
                                            onChange={() => handleCheckboxChange(type.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-full flex flex-wrap  justify-center">
          <span className="bg-secondary px-7 py-3" onClick={() =>
              openSubTaskDetailModal(selectedVip)
          }>
            BUY NOW
          </span>
                </div>
            </div>
        </div>
    );
};

export default VipPage;
