import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CopyBlock, dracula } from 'react-code-blocks';

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
          <h1><strong>Title:</strong></h1>
            <p>{note.noteTitle}</p>
            <h1><strong>Description:</strong></h1>
            <p>{note.noteText}</p>
            <div>
              <h1><strong>Code Snippet:</strong></h1>
              <CopyBlock 
                text={note.noteSnippet}
                theme={dracula}
                />
            </div>
            <h1>Created {note.createdAt}</h1>
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
