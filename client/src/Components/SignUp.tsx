import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Person from "@mui/icons-material/Person";
import Email from "@mui/icons-material/Email";
import { useUser } from "../Context/UserContext";
import { useJwt } from "../Context/JwtContext";
import { User } from "../Types";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const SignUp: React.FC = () => {
  const { updateUser } = useUser();
  const { updateJwt } = useJwt();
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFirstName = e.target.value;

    updatedFirstName.trim();

    if (updatedFirstName !== firstName) {
      setFirstName(updatedFirstName);
    }
  };

  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLastName = e.target.value;

    updatedLastName.trim();

    if (updatedLastName !== lastName) {
      setLastName(updatedLastName);
    }
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUsername = e.target.value;

    updatedUsername.trim();

    if (updatedUsername !== username) {
      setUsername(updatedUsername);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEmail = e.target.value;

    updatedEmail.trim();

    if (updatedEmail !== email) {
      setEmail(updatedEmail);
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPassword = e.target.value;

    updatedPassword.trim();

    if (updatedPassword !== password) {
      setPassword(updatedPassword);
    }
  };

  const onShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSignUpClick = async () => {
    const body = {
      email,
      password,
      username,
      firstName,
      lastName,
    };

    try {
      const signUpPromise = await fetch("http://localhost:8080/users", {
        method: "POST",
        mode: "cors",
        cache: "default",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      /*
      * Example signUpResponse 
        {
          "user": {
              "_id": "63f15167eca064932ffde235",
              "username": "conker",
              "email": "brandon@example.com",
              "createdAt": "2023-02-18T22:29:59.882Z",
              "updatedAt": "2023-02-28T16:01:45.151Z",
              "__v": 5
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YxNTE2N2VjYTA2NDkzMmZmZGUyMzUiLCJpYXQiOjE2Nzc2MDAxMDV9.NaLzqUOKvNCx9zo-t-AKbrP9Tp1nZ1g92aioSJdFF7Q"
        }
      */
      const signUpResponse = await signUpPromise.json();

      const user: User = {
        _id: signUpResponse.user._id,
        email: signUpResponse.user.email,
        username: signUpResponse.user.username,
        firstName: signUpResponse.user.firstName,
        lastName: signUpResponse.user.lastName,
        farmId: signUpResponse.user.farmId,
      };

      if (signUpResponse) {
        updateUser(user);
        updateJwt(signUpResponse.token);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <section className="flex flex-col items-center justify-center w-1/3 h-full bg-sky-900">
        <h1 className="text-2xl py-8 text-white">Welcome Back!</h1>
        <p className="pb-4 text-white">
          To stay connected with us, please log in.
        </p>
        <Button
          sx={{ backgroundColor: "white" }}
          variant="outlined"
          size="medium"
          onClick={() => {}}
        >
          <Link to="/login">Sign In</Link>
        </Button>
      </section>
      <section className="flex flex-col w-2/3 h-full">
        <section className="flex flex-row p-4 align-center">
          <span className="flex items-center text-3xl">🐮</span>
          <h1 className="text-3xl">FarmN</h1>
        </section>
        <section className="flex flex-col items-center justify-center w-2/3 h-full">
          <h1 className="text-2xl py-8">Create Your Account</h1>
          <div className="pb-2">
            <TextField
              onChange={onFirstNameChange}
              label="First Name"
              variant="outlined"
              type="text"
              classes={{ root: "w-80" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="pb-2">
            <TextField
              onChange={onLastNameChange}
              label="Last Name"
              variant="outlined"
              type="text"
              classes={{ root: "w-80" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="pb-2">
            <TextField
              onChange={onUsernameChange}
              label="Username"
              variant="outlined"
              type="text"
              classes={{ root: "w-80" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="pb-2">
            <TextField
              onChange={onEmailChange}
              label="Email"
              variant="outlined"
              type="text"
              classes={{ root: "w-80" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="pb-4">
            <TextField
              onChange={onPasswordChange}
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              classes={{ root: "w-80" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onShowPasswordClick}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={onSignUpClick}
          >
            Sign Up
          </Button>
        </section>
      </section>
    </div>
  );
};
