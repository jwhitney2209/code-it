import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import CodeBlock from "./CodeBlock";

const note = [
  {
    title: "Sign In Card",
    description:
      "This is a sign in component that contains the javascript functionality to hande form submissions and handle form state as well as change",
    snippet: `const SignInCard = () => {
      return (
        <>
          <div className="">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
    
          <div className="mt-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-emerald-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-emerald-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
    
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-emerald-600 hover:text-emerald-500"
                    >
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-emerald-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-emerald-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </>
      );
    };
    
    export default SignInCard;
    `,
    category: "React",
    language: "javascript",
  },
  // More people...
];

const NoteCard = () => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <div className="shadow sm:rounded-lg bg-white">
        <div className="px-4 py-6 sm:px-6">
          <div className="md:flex md:items-center md:justify-between md:space-x-5">
            <div className="flex items-start space-x-5">
              <div className="pt-1.5">
                <h1 className="text-2xl font-bold text-gray-900">
                  {note[0].title}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  {note[0].description}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
              <CopyToClipboard text={note[0].snippet} onCopy={() => setIsCopied(true)}>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {isCopied ? "Copied!" : "Copy to Clipboard"}
                </button>
              </CopyToClipboard>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="my-6 border-t border-gray-100">
            <CodeBlock className={note[0].language}>
              {note[0].snippet}
            </CodeBlock>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
