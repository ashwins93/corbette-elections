import React, { useState } from "react";
import data from "./data";
import { Link, Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function YTPlayer(props) {
  return (
    <iframe
      {...props}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

const transition = { duration: 0.2 };

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-2xl sm:mx-auto md:w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl text-cyan-600">Corbette House</h1>
          <h2 className="text-2xl text-cyan-600">Know Your Candidates</h2>
          <div className="mt-3">
            <AnimatePresence exitBeforeEnter initial={false}>
              <Switch location={location} key={location.pathname}>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <motion.ul
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      variants={{
                        enter: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      {data.map((candidate) => (
                        <motion.li
                          variants={{
                            initial: { scale: 0.9, opacity: 0, y: 20 },
                            enter: { scale: 1, opacity: 1, y: 0 },
                            exit: { scale: 0.9, opacity: 0, y: -20 },
                          }}
                          transition={transition}
                          key={candidate.name}
                          className="p-2 uppercase tracking-wider text-light-blue-600 cursor-pointer relative hover:bg-cyan-500 hover:text-white rounded-md "
                        >
                          <Link
                            to={`/${candidate.id}`}
                            className="flex justify-between"
                          >
                            <div className="z-10">{candidate.name}</div>
                            <div className="bg-cyan-500 text-white text-xs rounded-full p-1 w-10 text-center">
                              {candidate.position.includes("Web")
                                ? "Web"
                                : "Sec"}
                            </div>
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                />
                <Route
                  exact
                  path="/:id"
                  render={({ match }) => {
                    const id = parseInt(match.params.id);
                    const selected = data.find(
                      (candidate) => candidate.id === id
                    );
                    return (
                      <motion.div
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        transition={transition}
                        variants={{
                          initial: { scale: 0.9, opacity: 0, x: 100 },
                          enter: { scale: 1, opacity: 1, x: 0 },
                          exit: { scale: 0.9, opacity: 0, x: -100 },
                        }}
                      >
                        <Link
                          className="py-1 px-2 text-sm tracking-wider text-cyan-600 border border-cyan-600 hover:bg-cyan-600 hover:text-white rounded-md"
                          to="/"
                        >
                          &larr; Back
                        </Link>
                        {selected && (
                          <div className="space-y-6 mt-7">
                            <h2 className="text-3xl uppercase text-cyan-600 flex justify-between items-center">
                              <span>{selected.name}</span>

                              <span className="ml-1 text-sm bg-cyan-600 text-white p-2 rounded-full uppercase tracking-wider ">
                                {selected.position.includes("Web")
                                  ? "Web Admin"
                                  : "Secretary"}
                              </span>
                            </h2>
                            {selected.video && (
                              <div className="relative aspect-w-16 aspect-h-9">
                                <YTPlayer
                                  src={selected.video}
                                  className="rounded-lg shadow-lg absolute inset-0"
                                />
                              </div>
                            )}
                            <div className="text-xl text-cyan-800">
                              Why should you vote for me?
                            </div>
                            <div className="text-justify">{selected.pitch}</div>
                          </div>
                        )}
                      </motion.div>
                    );
                  }}
                />
              </Switch>
            </AnimatePresence>
            <div className="mt-10 text-center">
              <a
                href="https://forms.gle/KwZC5JH2rdibVJ7L6"
                className="inline-block bg-cyan-500 p-3 text-white rounded-lg shadow-lg text-sm tracking-wider uppercase transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                target="_blank"
              >
                I'm Ready To Vote!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
