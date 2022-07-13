import React from "react";
import { Link } from "react-router-dom";

const NoteList = (props) => {
  const noteData = props.notes;
  //console.log(props)

  if (!noteData.length) {
    return <p>No notes Yet! Please click "Add Note" above to create your first note.</p>;
  }

  return (
    <div>
      {noteData &&
        noteData.map((notes) => (
          <div key={notes._id}>
            <Link
              key={notes._id}
              className="hover:text-lime font-thin text-liver flex items-center transition-colors duration-200 justify-start"
              to={`/singlenote/${notes._id}`}
            >
              <span className="text-left"></span>
              <span className="text-md font-normal">[{notes.tag}] {notes.noteTitle}</span>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NoteList;
