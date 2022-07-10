import React from "react";

const CategoryList = ({ categories, categoryName, _id }) => {
  if (!categories.length) {
    return <h3>No Categories Yet!</h3>
  }

  return (
    <div>
      {categories && categories.map(category => (
        <div key={category._id} id={category._id}>
          {category.categoryName}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
