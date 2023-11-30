import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";
const Hero = () => {
  // switch between sign in and sign up
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 justify-between gap-8">
        <div className="mx-auto flex-shrink-0 lg:mx-0 lg:w-2/3 lg:pt-8">
          <img
            className="h-11"
            src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=500"
            alt="Your Company"
          />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold leading-6 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                What&apos;s new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>Just shipped v1.0</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Code.log
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Stop wasting time going through old repos to find code you want to reuse. With Code.log you can save your code snippets and grab them easily whenever you want.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="lg:w-2/3">
          {isSignUp ? <SignUpCard /> : <SignInCard />}
            <p className="mt-10 text-center text-sm text-white">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleSignUp}
            className="font-semibold leading-6 text-emerald-500 hover:text-emerald-400"
          >
            {isSignUp ? "Sign in here." : "Create one here." }
          </button>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
