import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const CreateAccount = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex md:flex-row sm:flex-col w-full bg-cadet md:p-12 items-center">
      <div className="md:p-3 sm:p-4 flex flex-wrap justify-center sm:w-screen">
        <img
          src={require("../assets/images/logo.png")}
          className="pb-2"
          alt="note w code on it"
        />
        <p className="sm:text-center sm:text-xl md:text-2xl">
          Code_It is a noting-taking app made especially for your code. When you
          create a note, you can add code snippets and personal notations. You
          can also edit, delete, and share them at any time. Create folders to
          set up an organized directory or keep your notes in a random, piled
          collection. Log in below or create an account to get started.
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
            <label htmlFor="username">username</label>
            <input name="username"
              value={formState.username}
              onChange={handleChange}
              className="border p-2"
              type="text"
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="email">email:</label>
            <input name="email"
              value={formState.email}
              onChange={handleChange}
              className="border p-2"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password">password:</label>
            <input name="password"
              value={formState.password}
              onChange={handleChange}
              className="border p-2"
              type="password"
            />
          </div>
          <button className="border w-full my-5 py-2 bg-mellow">
            Create Account
          </button>
          <div className="flex sm:text-sm">
            Already have an account?<Link to="/" className="px-2 text-cadet hover:text-mellow">Log in here!</Link>
          </div>
        </form>
        {error && <div>Signup failed</div>}
      </div>
    </div>
  );
};

export default CreateAccount;
