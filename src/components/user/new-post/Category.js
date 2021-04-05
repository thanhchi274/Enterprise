import React from "react";
import { FormCheckbox } from "shards-react";

function Category({ category }) {
  return (
    <FormCheckbox
      className="mb-1"
      value={category}
      defaultChecked
      style={{ marginLeft: "5px" }}
    >
      &nbsp;{category.charAt(0).toUpperCase() + category.slice(1)}
    </FormCheckbox>
  );
}

export default Category;
