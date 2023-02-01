import React from "react";

function Error({ msg }) {
  return (
    <div>
      <div style={{color: 'red', fontSize: '800'}} role="alert">
        Something went wrong, please try again. {msg}
      </div>
    </div>
  );
}

export default Error;