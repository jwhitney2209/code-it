import React, { useState } from "react";
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
    <div className="grid grid-cols-2 sm:grid-cols-1 w-full bg-cadet md:p-12">
      <div className="md:p-6 sm:p-4 flex flex-wrap justify-center">
        <img
          src={require("../assets/images/logo.png")}
          className="pb-2"
          alt="note w code on it"
        />
        <p className="sm:text-center sm:text-xl md:text-left md:text-3xl">
          Code_It is a noting-taking app made especially for your code. When you
          create a note, you can add code snippets and personal notations. You
          can also edit, delete, and share them at any time. Create folders to
          set up an organized directory or keep your notes in a random, piled
          collection. Log in below or create an account to get started.
        </p>
      </div>
      <div className="flex flex-col justify-center sm:p-6">
        <form
          onSubmit={handleFormSubmit}
          className="max-w-[400px] w-full mx-auto bg-antique p-4"
        >
          <h2 className="text-3xl font-bold text-center py-6">
            Welcome to Code_It
          </h2>
          <div className="flex flex-col py-2">
            <label>username</label>
            <input
              value={formState.username}
              onChange={handleChange}
              className="border p-2"
              type="text"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>email:</label>
            <input
              value={formState.email}
              onChange={handleChange}
              className="border p-2"
              type="text"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>password:</label>
            <input
              value={formState.password}
              onChange={handleChange}
              className="border p-2"
              type="password"
            />
          </div>
          <button className="border w-full my-5 py-2 bg-mellow">
            Create Account
          </button>
        </form>
        {error && <div>Signup failed</div>}
      </div>
    </div>
  );
};

export default CreateAccount;
