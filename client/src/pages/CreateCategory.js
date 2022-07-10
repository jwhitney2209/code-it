import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../utils/mutations";
import { QUERY_CATEGORIES, QUERY_ME } from "../utils/queries";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [addCategory, { error }] = useMutation(CREATE_CATEGORY, {
    update(cache, { data: { addCategory } }) {
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, categories: [...me.categories, addCategory] } },
        });
      } catch (e) {
        console.warn("First Note insertion by user!");
      }
      // read what is currently in the cache
      const { categories } = cache.readQuery({ query: QUERY_CATEGORIES });

      // prepend the newest category to the front of the array
      cache.writeQuery({
        query: QUERY_CATEGORIES,
        data: { categories: [addCategory, ...categories] },
      });
    },
  });

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add category to database
      await addCategory({
        variables: { ...name } ,
      });

      // clear form value
      setName("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 w-full bg-cadet md:p-12">
      <div className="md:p-6 sm:p-4 flex flex-wrap">
      <div className="flex flex-col justify-center sm:p-6">
        <form onSubmit={handleFormSubmit} className="max-w-[400px] w-full mx-auto bg-antique p-4">
          <h2 className="text-3xl font-bold text-center py-6">
            Name Your Category
          </h2>
          <div className="flex flex-col py-2">
            <label htmlFor="category">category name:</label>
            <input name="category" 
              onChange={handleChange} 
              value={name}
              className="border p-2" type="text" />
          </div>
          <Link to="/dashboard" type="submit" className="border w-full my-5 p-2 text-center bg-mellow hover:bg-lime">Create!</Link>
        </form>
        {error && <div className="text-red">*Sorry we've encountered an error!</div>}
      </div>
      </div>
    </div>
  );
};

export default CreateCategory;
