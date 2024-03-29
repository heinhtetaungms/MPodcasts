import {useEffect, useState} from "react";
import paymenttwo from "../assets/img/paymenttwo.jpg";
import {useLocation, useNavigate} from "react-router-dom";
import authStore from "../zustand/authStore";
import {Subscribe} from "../api/subscribe";


const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const store = authStore.getState();
    const slectPacket = location.state?.selectedVip || "";
    const [authToken] = authStore((state) => [state.token]);

    const [userId] = authStore((state) => [state.userId]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Visa");
    const [paymentData, setpaymentData] = useState("Visa");

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
        if (e.target.value == "Visa") {
            setpaymentData("Visa");
        } else if (e.target.value === "PayPal") {
            setpaymentData("Paypal");
        }
    };
    console.log(paymentData);

    const handleCreateSubmit = (e) => {
        console.log("blar");
        e.preventDefault();
        Subscribe({
            subscriptionId: slectPacket,
            userId: userId,
            paymentType: paymentData,
            token: authToken,
        })
            .then((response) => {
                console.log(response.data.httpResponse);
                if (response.data.httpResponse === 200) {
                    console.log(response.data.httpResponse);
                    navigate("/", {
                        
                    });
                }
            })
            .catch(() => {
            });
    };

    const handlePayment = () => {
        navigate("/");
    };

    useEffect(() => {
        store.setToggleProfile(false);
    }, []);

    return (
        <div className=" p-10 h-full">
            <div
                className=" border border-black dark:border-white mx-32  h-[600px] relative flex flex-row items-center">
                <div className=" w-[50%] h-full">
                    <img src={paymenttwo} alt="" className="w-full h-full"/>
                    <p className="absolute top-8 left-7">How would you like to pay?</p>
                </div>
                <form action="" onSubmit={handleCreateSubmit}>
                    <div className="ps-5 text-black dark:text-white">
                        <div className="mb-10">
                            <h1 className="text-center font-bold text-xl uppercase">
                                Secure payment info
                            </h1>
                        </div>
                        <div className="mb-3 flex -mx-2">
                            <div className="px-2">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="Visa"
                                        className="form-radio h-5 w-5 text-indigo-500"
                                        name="paymentMethod"
                                        id="visa"
                                        checked={selectedPaymentMethod === "Visa"}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <img
                                        src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                                        className="h-8 ml-3"
                                    />
                                </label>
                            </div>
                            <div className="px-2">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="PayPal"
                                        className="form-radio h-5 w-5 text-indigo-500"
                                        name="paymentMethod"
                                        id="paypal"
                                        checked={selectedPaymentMethod === "PayPal"}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <img
                                        src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                                        className="h-8 ml-3"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                            <div>
                                <input
                                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="John Smith"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                            <div>
                                <input
                                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="0000 0000 0000 0000"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mb-3 -mx-2 flex items-end text-black dark:text-white">
                            <div className="px-2 w-1/2">
                                <label className="font-bold text-sm mb-2 ml-1">
                                    Expiration date
                                </label>
                                <div className="text-black">
                                    <select
                                        className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                        <option value="01">01 - January</option>
                                        <option value="02">02 - February</option>
                                        <option value="03">03 - March</option>
                                        <option value="04">04 - April</option>
                                        <option value="05">05 - May</option>
                                        <option value="06">06 - June</option>
                                        <option value="07">07 - July</option>
                                        <option value="08">08 - August</option>
                                        <option value="09">09 - September</option>
                                        <option value="10">10 - October</option>
                                        <option value="11">11 - November</option>
                                        <option value="12">12 - December</option>
                                    </select>
                                </div>
                            </div>
                            <div className="px-2 w-1/2 text-dark">
                                <select
                                    className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-10">
                            <label className="font-bold text-sm mb-2 ml-1">Security code</label>
                            <div>
                                <input
                                    className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="000"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handlePayment()}
                                    className="block bg-black text-white dark:bg-white dark:text-dark w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700  rounded-lg px-3 py-3 font-semibold">
                                <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
