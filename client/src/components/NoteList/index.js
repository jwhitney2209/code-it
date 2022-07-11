import React from "react";

const NoteList = (props) => {
  const propsData = props.categories.notes;

  if (!propsData.length) {
    return <h3>No notes Yet!</h3>
  }

  return (
    <div>
      {propsData && propsData.map(notes => (
        <div key={notes._id} id={notes._id}>
          {notes.notesTitle}
        </div>
      ))}
    </div>
  );
};

export default NoteList;