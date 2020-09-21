import React, { useState } from 'react';

function Example() {
  const [text, setText] = useState(0);

  return (
    <div>
      <input type="text" onChange={(event) => setText(event.target.value)}></input>
      <h1>{text}</h1>
     </div>
  );
}
export default Example