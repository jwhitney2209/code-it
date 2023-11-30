import NoteCard from "./NoteCard";

const Notes = () => {
  return (
    <>
      <div className="border-b border-gray-200 py-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              My Code Snippets
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create new snippet
            </button>
          </div>
        </div>
      </div>
      <div className="py-6">
        <NoteCard />
      </div>
    </>
  );
};

export default Notes;
