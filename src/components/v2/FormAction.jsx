import PropTypes from 'prop-types';
import React from "react";

const FormAction = ({type, text, name}) => {

    return (
        <>
            {name === 'button' ? (
                <button
                    type={type}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm text-white font-medium rounded-md bg-[#80B3FF] hover:bg-[#687EFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                >
                    {text}
                </button>
            ) : (
                <></>
            )}
        </>
    );
};

FormAction.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    name: PropTypes.string,
};

export default FormAction;
