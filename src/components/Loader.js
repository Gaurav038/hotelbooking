import React, { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{ marginTop: "150px" }}>
      <div style={{display : 'flex', justifyContent: 'center'}}>
        <FadeLoader color="#000" loading={loading} css="" size={25} />
      </div>
    </div>
  );
}

export default Loader;