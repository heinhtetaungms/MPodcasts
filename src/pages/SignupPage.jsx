import Header from "../components/v2/Header";
import Signup from "../components/v2/Signup";


const LoginPage = () => {
    return(
        <>
            <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/login"
            />
            <Signup/>
        </>
    )
}

export default LoginPage