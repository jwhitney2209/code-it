import React from "react";

const NoteList = (props) => {
  if (!props.length) {
    return <h3>No notes Yet!</h3>
  }

  return (
    <div>
      {props && props.map(notes => (
        <div key={notes._id} id={notes._id}>
          {notes.notesTitle}
        </div>
      ))}
    </div>
  );
};

export default NoteList;