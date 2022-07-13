import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import SideBar from "../components/SideBar";
import Auth from "../utils/auth";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [noteTitle, setnoteTitle] = useState("");
  const [noteText, setnoteText] = useState("");
  const [noteSnippet, setnoteSnippet] = useState("");
  const [tag, setTag] = useState("");
  const [addNote, { error }] = useMutation(CREATE_NOTE, {
    update(cache, { data: { addNote } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, notes: [...me.notes, addNote] } },
        });
      } catch (e) {
        console.log("First note insertion by user");
      }
    },
  });

  const handleTitleChange = (event) => {
    setnoteTitle(event.target.value);
  };
  const handleTextChange = (event) => {
    setnoteText(event.target.value);
  };
  const handleSnippetChange = (event) => {
    setnoteSnippet(event.target.value);
  };
  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add category to database
      await addNote({
        variables: { noteTitle, noteText, noteSnippet, tag },
      });

      setnoteTitle("");
      setnoteText("");
      setnoteSnippet("");
      setTag("");
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex flex-row  min-h-full md:h-full sm:w-full content-start items-stretch">
      <div className="basis-1/5 h-full sm:w-full items-stretch max-h-max min-h-mostscreen">
        <SideBar />
      </div>

      <div className="basis-4/5 max-h-mostscreen bg-mellow sm:w-full p-3">
        <div className="bg-antique rounded m-4 p-4 note-height note-view overflow-y-auto scrollbar">
          <form onSubmit={handleFormSubmit} className=" ">
            <h2 className="text-3xl font-bold text-center pt-6">
              Create a Note
            </h2>

            <div className="flex w-full pb-2 ">
              <input
                name="noteTitle"
                onChange={handleTitleChange}
                value={noteTitle.noteTitle}
                type="text"
                placeholder="Add Title Here"
                className="p-2 outline-none bg-antique note-border md:text-3xl sm:text-lg"
              />
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="noteText" className="text-lg">
                Code Notes:{" "}
              </label>
              <textarea
                name="noteText"
                rows={5}
                onChange={handleTextChange}
                value={noteText.noteText}
                className="block border p-2 rounded mx-w-full focus:outline-cadet"
                placeholder="Describe your code..."
              ></textarea>
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="noteSnippet" className="text-lg">
                Code:{" "}
              </label>
              <textarea
                name="noteSnippet"
                rows={10}
                onChange={handleSnippetChange}
                value={noteSnippet.noteSnippet}
                className="block border p-2 rounded bg-code text-antique focus:outline-cadet"
                placeholder="Add Your Code Here"
              ></textarea>
            </div>

            <div className="flex flex-col py-2">
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
            </div>

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

export default CreateCategory;
