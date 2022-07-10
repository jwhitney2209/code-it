import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_NOTE } from "../../utils/mutations";

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
        variables: { noteTitle, noteText, noteSnippet, categoryId }
      });
      setNoteTitle('');
      setNoteText('');
      setNoteSnippet('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>

    </div>
  );
};

export default NoteForm;