import React from "react";

const notFoundStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "75%",
  fontSize: "20px",
};

function PageNotFound() {
  return <div style={notFoundStyles}> 404 | This page could not be found.</div>;
}
export { PageNotFound };
