import Header from "../components/v2/Header";
import Login from "../components/v2/Login";


const LoginPage = () => {
    return(
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />
            <Login/>
        </>
    )
}

export default LoginPage;
