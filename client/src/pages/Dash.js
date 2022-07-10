import React from 'react';
import Auth from '../utils/auth';
import CategoryForm from '../components/CategoryForm/index';
import NoteForm from '../components/NoteForm/index';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from '../utils/queries';

function Dash() {
  // queries the user's data - this includes ALL categories and ALL notes by the user
  const { data: userData } = useQuery(QUERY_ME);
  // queries all categories - nested in each category are the notes for each category
  const { loading, data } = useQuery(QUERY_CATEGORIES);

  // all category data
  const categories = data?.categories || [];
  // this should be the correct way to add the categoryId and category name to the html element
  // {categories._id} | {categories.name} 
  // example: <div id={categories._id}>{categories.name}</div> -- I'm praying this works :)

  // try these to generate note data
  // {categories.notes.noteTitle} || {categories.notes.noteText} || {categories.notes.noteSnippet} || {categories.notes.createdAt}..etc...
  // we could also try the code below this to make the prop drilling less
  const noteData = categories.notes; // that way you only have to type 
  // {noteData.noteTitle} || {noteData.noteText} || {noteData.noteSnippet} || {noteData.createdAt} etc...

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div>
      {loggedIn && (
        <div className="col-12 mb-3">
          
        </div>
      )}
      </div>
    </main>
  );
}

export default Dash;
