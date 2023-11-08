import {signupFields} from '../constants/FormFields';
import {useState} from 'react';
import Input from './Input';
import FormAction from './FormAction';
import {RegisterUser} from '../../api/registerRequest';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';


const Signup = () => {
    const fields = signupFields;
    const navigate = useNavigate();
    let fieldsState = {};

    fields.forEach((field) => (fieldsState[field.id] = ''));

    const [signupState, setSignupState] = useState(fieldsState);

    const handleChange = (e) => setSignupState({...signupState, [e.target.id]: e.target.value});

    const createAccount = async () => {
        const {firstName, lastName, email} = signupState;

        await RegisterUser({firstName, lastName, email})
            .then((response) => {
                if (response.data.httpResponse === 200) {
                    toast.success("Registration Success. We've sent a password to your email.");
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
            })
            .catch((error) => toast.error(error.response.data.message));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount();
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={signupState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                        icon={undefined}
                        iconOnClick={undefined}
                    />
                ))}
                <FormAction name="button" type="submit" text="Signup"/>
            </div>
        </form>
    );
};

export default Signup;
