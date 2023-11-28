import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { CopyBlock, dracula } from 'react-code-blocks';
import Auth from '../utils/auth';



function Dash() {
  const navigate = useNavigate();
  const { data } = useQuery(QUERY_ME);
  const notes = data?.me.notes || [];

  if (!Auth.loggedIn()) {
    navigate('/')
  }
  return (
    <main className="flex md:flex-row sm:flex-col md:min-h-full md:h-full sd:min-h-fit sm:max-h-fit">
      <div className="basis-1/4 sm:w-full sm:max-h-fit min-h-mostscreen">
        <SideBar />
      </div>

      <div className="flex-col basis-3/4 min-h-mostscreen max-h-mostscreen bg-mellow sm:w-full overflow-auto scrollbar">
        <h3 className="text-center md:text-3xl sm:text-xl m-5 new-note">
          Please select a note to view, or create a new note.
        </h3>
        <div className="flex flex-row flex-wrap gap-4 md:m-5 sm:m-3 md:p-4 sm:p-3">
          {notes &&
            notes.map(notes => (
              <div id={notes.id} className="" key={notes.id}>
                <div className="m-3 p-3 bg-antique rounded note-view max-w-md max-h-96">
                  <Link
                    className="hover:text-cadet font-thin text-liver flex items-center transition-colors duration-200 justify-start"
                    to={`/singlenote/${notes.id}`}
                  >
                    <h4 className="text-md font-normal mb-2">
                      {/* <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-lime bg-liver last:mr-0 mr-1 shadow-lg">
                        {notes.category.name}
                      </span>{' '} */}
                      {notes.title}
                    </h4>
                  </Link>
                  <div className="max-h-64 overflow-y-scroll scrollbar-mini">
                    <CopyBlock
                      text={notes.snippet}
                      language="markup"
                      theme={dracula}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default Dash;
