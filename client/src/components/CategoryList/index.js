import React from "react";

const CategoryList = (props) => {
  const propsData = props.categories;

  if (!propsData.length) {
    return <h3>No Categories Yet!</h3>
  }

  return (
    <div>
      {propsData && propsData.map(categories => (
        <div key={categories._id} id={categories._id}>
          {categories.categoryName}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
