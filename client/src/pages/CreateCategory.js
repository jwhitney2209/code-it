import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY } from '../utils/mutations';
import { QUERY_CATEGORIES, QUERY_ME } from '../utils/queries';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [addCategory, { error }] = useMutation(CREATE_CATEGORY, {
    update(cache, { data: { addCategory } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, categories: [...me.categories, addCategory] } },
        });
      } catch (e) {
        console.log('First Category insertion by user');
      }
    },
  });

  const handleChange = event => {
    setCategoryName(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      // add category to database
      await addCategory({
        variables: { categoryName },
      });
      console.log(categoryName)
      setCategoryName('');
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 w-full h-screen bg-cadet md:p-12">
      <div className="flex flex-col justify-center sm:p-6">
        <form
          onSubmit={handleFormSubmit}
          className="max-w-[400px] w-full mx-auto bg-antique p-4"
        >
          <h2 className="text-3xl font-bold text-center py-6">
            Name Your Category
          </h2>
          <div className="flex flex-col py-2">
            <label htmlFor="categoryName">category name:</label>
            <input
              name="categoryName"
              onChange={handleChange}
              value={categoryName.categoryName}
              className="border p-2"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="border w-full my-5 p-2 text-center bg-mellow hover:bg-lime"
          >
            Create!
          </button>
        </form>
        {error && (
          <div className="text-red">*Sorry we've encountered an error!</div>
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
