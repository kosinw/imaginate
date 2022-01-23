import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div className="PageHeader my-4">
      <h1 className="PageHeader__h1 font-poppins font-bold text-base">{title}</h1>
    </div>
  )
}

export default PageHeader;