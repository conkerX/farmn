import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Email from "@mui/icons-material/Email";
import { useUser } from "../Context/UserContext";
import { useJwt } from "../Context/JwtContext";
import { User } from "../Types";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Login: React.FC = () => {
  const { updateUser } = useUser();
  const { updateJwt } = useJwt();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isLoginError, setIsLoginError] = React.useState<boolean>(false);
  const [loginHelperText, setLoginHelperText] = React.useState<string>("");
  const navigate = useNavigate();

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

  const onSignInClick = async () => {
    const body = {
      email,
      password,
    };

    try {
      const signInPromise = await fetch("http://localhost:8080/users/login", {
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
      * Example signInResponse 
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
      const signInResponse = await signInPromise.json();

      const user: User = {
        _id: signInResponse.user._id,
        email: signInResponse.user.email,
        username: signInResponse.user.username,
        firstName: signInResponse.user.firstName,
        lastName: signInResponse.user.lastName,
        farmId: signInResponse.user.farmId,
      };

      if (signInResponse) {
        updateUser(user);
        updateJwt(signInResponse.token);
        navigate("/");
      }
    } catch (e) {
      setIsLoginError(true);
      setLoginHelperText("Email or Password is incorrect");
    }
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <section className="flex flex-col w-2/3 h-full">
        <section className="flex flex-row p-4 align-center">
          <span className="flex items-center text-3xl">🐮 </span>
          <h1 className="text-3xl">FarmN</h1>
        </section>
        <section className="flex flex-col items-center justify-center w-2/3 h-full">
          <h1 className="text-2xl py-8">Log In To Your Account</h1>
          <div className="pb-2">
            <TextField
              onChange={onEmailChange}
              label="Email"
              variant="outlined"
              type="text"
              classes={{ root: "w-80" }}
              error={isLoginError}
              helperText={loginHelperText}
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
              error={isLoginError}
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
            onClick={onSignInClick}
          >
            Sign In
          </Button>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center w-1/3 h-full bg-sky-900">
        <h1 className="text-2xl py-8 text-white">New Here?</h1>
        <p className="pb-4 text-white">
          Sign up to manage your farm the way you want it!
        </p>
        <Button
          sx={{ backgroundColor: "white" }}
          variant="outlined"
          size="medium"
          onClick={() => {}}
        >
          <Link to="/signup">Sign Up</Link>
        </Button>
      </section>
    </div>
  );
};
