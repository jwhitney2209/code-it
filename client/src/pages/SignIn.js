import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

function SignIn() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex md:flex-row sm:flex-col w-full bg-cadet md:p-12 items-center">
      <div className="md:p-3 sm:p-4 flex flex-wrap justify-center sm:w-screen">
        <img
          src={require("../assets/images/logo.png")}
          className="pb-2"
          alt="note icon w code on it"
        />
        <p className="pt-5 sm:text-center sm:text-xl md:text-2xl">
          Code_It is a noting-taking app made specially for your code. Stop
          referencing old projects, repos, scattered sticky notes, and your
          library of notebooks. Here, you get to keep code blocks and notes
          together, all in one place. Create a note to add your code snippet and
          personal notations, then save them for easy and endless reference. Log
          in below or create an account to get started.
        </p>
      </div>

      <div className="flex justify-center md:p-3 sm:p-6 sm:w-screen h-fit">
        <form
          onSubmit={handleFormSubmit}
          className="max-w-[400px] w-full mx-auto bg-antique p-4"
        >
          <h2 className="text-3xl font-bold text-center py-6">
            Welcome to Code_It
          </h2>
          <div className="flex flex-col py-2">
            <label htmlFor="email">email:</label>
            <input
              name="email"
              onChange={handleChange}
              value={formState.email}
              className="border p-2 focus:outline-cadet"
              type="text"
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password">password:</label>
            <input
              name="password"
              onChange={handleChange}
              value={formState.password}
              className="border p-2 focus:outline-cadet"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="border w-full my-5 p-2 text-center bg-mellow hover:bg-lime"
          >
            Sign In
          </button>
          <div className="flex sm:text-sm">
            Don't have an account?
            <Link to="/signup" className="px-2 text-cadet hover:text-mellow">
              Create one here!
            </Link>
          </div>
        </form>
        {error && <div>Login failed</div>}
      </div>
    </div>
  );
}

export default SignIn;
