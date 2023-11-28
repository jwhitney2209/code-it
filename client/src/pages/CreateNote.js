import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import SideBar from "../components/SideBar";
import Auth from "../utils/auth";

const initialState = {
  title: "",
  description: "",
  snippet: "",
};

const CreateNote = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    snippet: "",
  });
  const [addNote] = useMutation(CREATE_NOTE, {
    refetchQueries: [QUERY_ME],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if (!Auth.loggedIn()) {
    navigate("/");
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add category to database
      await addNote({
        variables: { ...formState },
      });

      // clear form values
      setFormState(initialState);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex md:flex-row  md:min-h-full md:h-full sm:w-full sm:flex-col content-start items-stretch">
      <div className="basis-1/5 h-full sm:w-full items-stretch md:max-h-max md:min-h-mostscreen sm-hidden">
        <SideBar />
      </div>

      <div className="basis-4/5 md:max-h-mostscreen sm:max-h-fit bg-mellow sm:w-full p-3">
        <div className="sm:px-6 md:text-xl sm:text-s text-liver hover:text-cadet">
          <Link to="/dashboard">
            <p>&#60; Exit</p>
          </Link>
        </div>

        <div className="bg-antique rounded m-4 p-4 note-height note-view overflow-y-auto scrollbar">
          <form onSubmit={handleFormSubmit} className=" ">
            <h2 className="text-3xl font-bold text-center pt-6">
              Create a Note
            </h2>

            <div className="flex w-full pb-2 ">
              <input
                name="title"
                onChange={handleChange}
                value={formState.title}
                type="text"
                placeholder="Add Title Here"
                className="p-2 outline-none bg-antique new-note md:text-3xl sm:text-lg"
              />
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="noteText" className="text-lg">
                Code Notes:{" "}
              </label>
              <textarea
                name="description"
                rows={5}
                onChange={handleChange}
                value={formState.description}
                className="block border p-2 rounded mx-w-full focus:outline-cadet"
                placeholder="Describe your code..."
              ></textarea>
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="noteSnippet" className="text-lg">
                Code:{" "}
              </label>
              <textarea
                name="snippet"
                rows={10}
                onChange={handleChange}
                value={formState.snippet}
                className="block border p-2 rounded bg-code text-antique focus:outline-cadet"
                placeholder="Add Your Code Here"
              ></textarea>
            </div>
            {/* Change to a dropdown of categories */}
            {/* <div className="flex flex-col py-2">
              <label htmlFor="tag" className="text-lg">
                Add a tag:{" "}
              </label>
              <textarea
                name="tag"
                onChange={handleTagChange}
                value={tag.tag}
                className="block border p-2 rounded focus:outline-cadet"
                placeholder="Add a tag"
              ></textarea>
            </div> */}

            <button
              type="submit"
              className="border min:w-fill my-5 p-2 text-center bg-lime hover:bg-cadet"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateNote;
