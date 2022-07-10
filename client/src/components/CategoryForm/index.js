import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../../utils/mutations";
import { QUERY_CATEGORIES, QUERY_ME } from "../../utils/queries";

const CategoryForm = () => {
  const [name, setName] = useState('');
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
        console.warn('First Note insertion by user!')
      }
      // read what is currently in the cache
      const { categories } = cache.readQuery({ query: QUERY_CATEGORIES });

      // prepend the newest category to the front of the array
      cache.writeQuery({
        query: QUERY_CATEGORIES,
        data: { categories: [addCategory, ...categories] }
      });
    }
  });

  const handleChange = event => {
    setName(event.target.value);
  }
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      // add category to database
      await addCategory({
        variables: { name }
      });

      // clear form value
      setName('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      
    </div>
  );
};

export default CategoryForm;