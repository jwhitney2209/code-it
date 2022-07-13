import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { QUERY_ME, QUERY_NOTES } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { CopyBlock, dracula } from "react-code-blocks";

function Dash() {
  const { data } = useQuery(QUERY_ME);
  const notes = data?.me.notes || [];

  const [searchText, setSearchText] = useState("");

  const handleSearchNote = (event) => {
    setSearchText(event.target.value);
  };

  const searchCode = notes.filter((notes) =>
    notes.noteSnippet.toLowerCase().includes(searchText)
  );

  //need to work on line 36  to add filter to map `.filter((note) => note.noteText.toLowerCase().includes(searchText))`
  return (
    <main className="flex md:flex-row sm:flex-col md:min-h-full md:h-full sd:min-h-fit sm:max-h-fit">
      <div className="basis-1/4 sm:w-full sm:max-h-fit min-h-mostscreen">
        <SideBar 
          handleSearchNote={setSearchText}
          searchText={useState("")}
           />
      </div>

      <div className="flex-col basis-3/4 min-h-mostscreen max-h-mostscreen bg-mellow sm:w-full overflow-auto scrollbar">
        <h3 className="text-center md:text-3xl sm:text-xl m-5 new-note">
          Please select a note to view, or create a new note.
        </h3>
        <div className="flex flex-row flex-wrap gap-4 md:m-5 sm:m-3 md:p-4 sm:p-3">
          {notes &&
            notes
              .map((notes) => (
                <div id={notes._id} className="" key={notes._id}>
                  <div className="m-3 p-3 bg-antique rounded note-view max-w-md max-h-96">
                    <Link
                      key={notes._id}
                      className="hover:text-cadet font-thin text-liver flex items-center transition-colors duration-200 justify-start"
                      to={`/singlenote/${notes._id}`}
                    >
                      <h4 className="text-md font-normal mb-2">
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-lime bg-liver last:mr-0 mr-1 shadow-lg">
                          {notes.tag}
                        </span>{" "}
                        {notes.noteTitle}
                      </h4>
                    </Link>
                    <div className="max-h-64 overflow-y-scroll scrollbar-mini">
                      <CopyBlock
                        text={notes.noteSnippet}
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
