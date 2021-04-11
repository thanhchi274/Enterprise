import React from "react";
const Report=({data, name})=> {
  return (
      <div className="blog-comments__item d-flex p-3 hover_item_table">
        <div className="blog-comments__avatar mr-3">
          <i className="material-icons" style={{ fontSize: "50px" }}>
            description
          </i>
        </div>
        <div
          className="blog-comments__content"
          style={{ marginLeft: "10px", width: "100%" }}
        >
          <div className="blog-comments__meta text-mutes">
            <a className="text-secondary" href="#">
              Report of {name} is : {data}
            </a>
          </div>
        </div>
      </div>
  );
}
export default Report