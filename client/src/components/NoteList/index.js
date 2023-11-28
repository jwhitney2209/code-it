import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = props => {
  const noteData = props.notes;
  //console.log(props)

  if (!noteData.length) {
    return (
      <p>
        No notes Yet! Please click "Add Note" above to create your first note.
      </p>
    );
  }

  return (
    <div>
      {noteData &&
        noteData.map(notes => (
          <div key={notes.id}>
            <Link
              key={notes._id}
              className="hover:text-lime font-thin text-liver flex items-center transition-colors duration-200 justify-start"
              to={`/singlenote/${notes.id}`}
            >
              <ul className="text-md font-normal">
                {/* <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-lime bg-liver last:mr-0 mr-1 shadow-lg">
                  {notes.category.name}
                </span>{' '} */}
                {notes.title}
              </ul>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NoteList;
