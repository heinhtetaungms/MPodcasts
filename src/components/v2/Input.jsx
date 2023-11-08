import PropTypes from 'prop-types';

const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

const Input = ({
                   handleChange,
                   value,
                   labelText,
                   labelFor,
                   id,
                   name,
                   type,
                   isRequired = false,
                   placeholder,
                   customClass,
                   icon: IconComponent,
                   iconOnClick,
               }) => {
    return (
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
                {labelText}
            </label>
            <div className="relative myinput">
                <input
                    type={type}
                    className={`${fixedInputClass} ${customClass}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    id={id}
                    name={name}
                    required={isRequired}
                />
                {IconComponent  && (
                    <IconComponent
                        className="icon text-black text-sm absolute right-1 mr-2 top-[50%] translate-y-[-50%] transition duration-200 cursor-pointer"
                        onClick={iconOnClick}
                    />
                )}
            </div>
        </div>
    );
};

Input.propTypes = {
    handleChange: PropTypes.func.isRequired, // Function prop
    value: PropTypes.string.isRequired, // String prop
    labelText: PropTypes.string.isRequired, // String prop
    labelFor: PropTypes.string.isRequired, // String prop
    id: PropTypes.string.isRequired, // String prop
    name: PropTypes.string.isRequired, // String prop
    type: PropTypes.string.isRequired, // String prop
    isRequired: PropTypes.bool, // Boolean prop
    placeholder: PropTypes.string.isRequired, // String prop
    customClass: PropTypes.string, // String prop
    icon: PropTypes.elementType,
    iconOnClick: PropTypes.func , // Function prop
};

export default Input;
