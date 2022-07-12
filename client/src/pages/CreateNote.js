import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [noteTitle, setnoteTitle] = useState('');
  const [noteText, setnoteText] = useState('');
  const [noteSnippet, setnoteSnippet] = useState('');
  const [tag, setTag] = useState('');
  const [addNote, { error }] = useMutation(CREATE_NOTE, {
    update(cache, { data: { addNote } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, notes: [...me.notes, addNote] } },
        });
      } catch (e) {
        console.log('First note insertion by user');
      }
    },
  });

  const handleTitleChange = event => {
    setnoteTitle(event.target.value);
  };
  const handleTextChange = event => {
    setnoteText(event.target.value);
  };
  const handleSnippetChange = event => {
    setnoteSnippet(event.target.value);
  };
  const handleTagChange = event => {
    setTag(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      // add category to database
      await addNote({
        variables: { noteTitle, noteText, noteSnippet, tag },
      });

      setnoteTitle('');
      setnoteText('');
      setnoteSnippet('');
      setTag('');
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center h-full sm:p-6 bg-antique">
        <form
          onSubmit={handleFormSubmit}
          className="max-w-[600px] w-full mx-auto bg-cadet/80 p-4"
        >
          <h2 className="text-3xl font-bold text-center py-6">Create a Note</h2>

          <div className="flex flex-col py-2">
            <label htmlFor="noteTitle" className="text-lg">
              Title:
            </label>
            <input
              name="noteTitle"
              onChange={handleTitleChange}
              value={noteTitle.noteTitle}
              type="text"
              placeholder="Title"
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="noteText" className="text-lg">
              Code Description:{' '}
            </label>
            <textarea
              name="noteText"
              rows={5}
              onChange={handleTextChange}
              value={noteText.noteText}
              className="block border p-2 rounded"
              placeholder="Describe your code..."
            ></textarea>
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="noteSnippet" className="text-lg">
              Code:{' '}
            </label>
            <textarea
              name="noteSnippet"
              rows={10}
              onChange={handleSnippetChange}
              value={noteSnippet.noteSnippet}
              className="block border p-2 rounded"
              placeholder="Your Code Here"
            ></textarea>
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="tag" className="text-lg">
              Tag:{' '}
            </label>
            <textarea
              name="tag"
              onChange={handleTagChange}
              value={tag.tag}
              className="block border p-2 rounded"
              placeholder="Your Note Here"
            ></textarea>
          </div>

          <button
            type="submit"
            className="border w-full my-5 p-2 text-center bg-mellow hover:bg-lime"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
