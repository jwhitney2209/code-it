import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CREATE_NOTE } from '../../utils/mutations';

const NoteForm = ({ categoryId }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [noteSnippet, setNoteSnippet] = useState('');
  const [addNote, { error }] = useMutation(CREATE_NOTE);

  const handleNoteTitleChange = event => {
    setNoteTitle(event.target.value);
  };

  const handleNoteTextChange = event => {
    setNoteText(event.target.value);
  };

  const handleNoteSnippetChange = event => {
    setNoteSnippet(event.target.value);
  };

  // might throw errors since we're passing more than one event I think? Good question for offices hours on Monday
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addNote({
        variables: { noteTitle, noteText, noteSnippet, categoryId },
      });
      setNoteTitle('');
      setNoteText('');
      setNoteSnippet('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen sm:p-6 bg-antique">
      <form className="max-w-[600px] w-full mx-auto bg-cadet/80 p-4">
        <h2 className="text-3xl font-bold text-center py-6">Create a Note</h2>

        <div className="flex flex-col py-2">
          <label htmlFor="noteTitle" className="text-lg">
            Title:
          </label>
          <input
            type="text"
            placeholder="Note Title"
            className="border p-2 rounded"
            type="text"
          />
        </div>

        <div className="flex flex-col py-2">
          <label htmlFor="noteText" className="text-lg">
            Code Block(s):{' '}
          </label>
          <textarea
            rows={10}
            className="block border p-2 rounded"
            placeholder="Your Code Here"
          ></textarea>
        </div>

        <div className="flex flex-col py-2">
          <label htmlFor="noteText" className="text-lg">
            Notation(s):{' '}
          </label>
          <textarea
            rows={5}
            className="block border p-2 rounded"
            placeholder="Your Note Here"
          ></textarea>
        </div>

        <button
          to="/dashboard"
          type="submit"
          className="border w-full my-5 p-2 text-center bg-mellow hover:bg-lime"
        >
          Create
        </button>
        {/* share button ? */}
        <div className="flex"></div>
      </form>
    </div>
  );
};

export default NoteForm;
