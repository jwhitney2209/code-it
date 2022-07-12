import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_NOTE } from '../utils/queries';

import SideBar from '../components/SideBar';

const SingleNote = props => {
  console.log(props);
  const { id: noteId } = useParams();

  const { loading, data } = useQuery(QUERY_NOTE, {
    variables: { id: noteId },
  });
  console.log(data);
  const note = data?.note || {};

  if (loading) {
    return (
      <div class="flex justify-center items-center">
        <div
          class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center h-screen w-full text-liver bg-mellow">
        <div className="sm:p-6">
          <div className="max-w-[400px] w-full mx-auto bg-antique p-4">
            <h1>{note.noteTitle}</h1>
            <h1>{note.noteText}</h1>
            <h1>{note.noteSnippet}</h1>
            <h1>{note.tag}</h1>
            <h1>{note.createdAt}</h1>
            <Link
              to="/dashboard"
              className="border w-[6.5rem] inline-block px-6 my-2 py-2.5 bg-mellow hover:bg-lime text-liver font-medium text-xs leading-tight uppercase transition duration-150 ease-in-out"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleNote;
