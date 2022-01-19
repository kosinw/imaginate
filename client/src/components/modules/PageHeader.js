import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="PageHeader my-4">
      <h1 className="PageHeader__h1 text-2xl font-black">{title}</h1>
      <h2 className="PageHeader__h2 text-xl">{subtitle}</h2>
    </div>
  )
}

export default PageHeader;