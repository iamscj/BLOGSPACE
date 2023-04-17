import { Box, TextField, Button, styled, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled('img')({
    width: 140,
    margin: "auto",
    display: "flex",
    padding: "50px 0 0"

})

const LoginButton = styled(Button)`
    text-transform:none;
    background: black;
    height:48px;
    border-radius:2px;
`
const SignupButton = styled(Button)`
    text-transform:none;
    background: #fff;
    color:#2874f0;
    height:48px;
    border-radius:2px;
    box-shadow: 0px 2px 4px 0 rgb(0 0 0/20%);
`
const Text = styled(Typography)`
    color:#878787;
    font-size:16px;
`
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div, &> button {
        margin:20px;
    }
`

const Error = styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
    margin:auto;
`

const signupInitialValues = {
    name: "",
    username: "",
    password: "",
}
const loginInitialValues = {
    username: "",
    password: "",
}
const Login = (props) => {
    const imageURL = 'https://cdn.discordapp.com/attachments/1097624247544852583/1097624277458632854/image.png';

    const [account, toggleaccount] = useState("login");
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setlogin] = useState(loginInitialValues)
    const [error, seterror] = useState("");
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignUp = () => {
        if (account === "login") {
            toggleaccount("signup")
        }
        else {
            toggleaccount("login")
        }
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const signupUser = async () => {
        try {
            let response = await API.userSignup(signup)
            if (response.isSuccess) {
                seterror('');
                setSignup(signupInitialValues);
                toggleaccount("login");
            }
            else {
                seterror("Something Went Wrong")
            }
        }
        catch (error) {
            seterror("Something Went Wrong")
        }
    }
    const loginUser = async () => {
        try {
            let response = await API.userLogin(login)
            if (response.isSuccess) {
                seterror('');
                setlogin(loginInitialValues);

                sessionStorage.setItem("accessToken", `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem("refreshToken", `Bearer ${response.data.refreshToken}`);
                setAccount({ username: response.data.username, name: response.data.name });
                props.isUserAuthenticated(true);
                navigate('/')
            }
            else {
                seterror("Something Went Wrong")
            }
        }
        catch (error) {
            seterror("Something Went Wrong")
        }
    }
    const onValueChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value });
    }
    return (
        <Component>
            <Image src={imageURL} alt="login" />
            {
                account === "login" ?
                    <Wrapper>
                        <TextField variant='standard' value={login.username} onChange={(e) => onValueChange(e)} name="username" placeholder='username' />
                        <TextField variant='standard' value={login.password} onChange={(e) => onValueChange(e)} name="password" placeholder='password' />
                        {error && <Error>{error}</Error>}
                        <LoginButton variant='contained' text-transform="none" onClick={() => loginUser()}>Login</LoginButton>
                        <Text textAlign={"center"}>
                            OR
                        </Text>
                        <SignupButton onClick={() => toggleSignUp()}>Create an account?</SignupButton>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="name" placeholder='name' />
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="username" placeholder='username' />
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="password" placeholder='password' />
                        {error && <Error>{error}</Error>}
                        <SignupButton text-transform="none" onClick={() => signupUser()}>SignUp</SignupButton>
                        <Text textAlign={"center"}>
                            OR
                        </Text>
                        <LoginButton variant='contained' onClick={() => toggleSignUp()}>Already have an account?</LoginButton>
                    </Wrapper>
            }
        </Component>
    )
}

export default Login
