import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CopyBlock, dracula } from "react-code-blocks";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_NOTE } from "../utils/queries";

import { REMOVE_NOTE } from "../utils/mutations";
import SideBar from "../components/SideBar";

import Auth from "../utils/auth";

const SingleNote = (props) => {
  const navigate = useNavigate();
  const { id: noteId } = useParams();

  const [removeNote] = useMutation(REMOVE_NOTE);

  const { loading, data } = useQuery(QUERY_NOTE, {
    variables: { noteId: noteId },
  });

  const note = data?.note || {};
  
  const deleteNote = async (event) => {
    event.preventDefault();
    try {
      const response = await removeNote({
        variables: { noteId: noteId },
      });

      navigate("/dashboard");
      window.location.reload();
      console.log("response from server:", response);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-mostscreen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!Auth.loggedIn()) {
    navigate("/");
  }
  return (
    <main className="flex md:flex-row sm:flex-col sm:items-center md:items-start md:min-h-full sm:w-full content-start sm:min-h-fit sm:max-h-fit items-stretch">
      <div className="basis-1/5 sm:w-full items-stretch md:max-h-max md:min-h-mostscreen sm:max-h-fit sm-hidden">
        <SideBar />
      </div>

      <div className="basis-4/5 min-h-mostscreen bg-mellow sm:w-full p-3">
        <div className="sm:px-6 text-s text-liver hover:text-cadet">
          <Link to="/dashboard">
            <p>&#60; All Notes</p>
          </Link>
        </div>

        <div className="flex flex-col gap-4 bg-antique note-view rounded m-4 p-4 note-height overflow-y-auto scrollbar sm:p-6">
          <div className="flex flex-row md:text-3xl sm:text-lg">
            <p className="note-border">{note.title}</p>
          </div>

          <div>
            <h1>
              <strong>Notes:</strong>
            </h1>
            <p>{note.description}</p>
          </div>

          <div>
            <h1>
              <strong>Code Snippet:</strong>
            </h1>
            <CopyBlock text={note.snippet} theme={dracula} />
          </div>

          <button
            onClick={deleteNote}
            className="border w-[6.5rem] inline-block px-2 my-2 py-2.5 bg-red/70 hover:bg-red text-black text-sm leading-tight transition duration-150 ease-in-out"
          >
            DELETE NOTE
          </button>
        </div>
      </div>
    </main>
  );
};

export default SingleNote;
