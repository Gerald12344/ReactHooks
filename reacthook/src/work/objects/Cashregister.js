import React, { useState } from 'react';


function Objects() {
  const [data, setData] = useState("");
  const [price, setPrice] = useState(0);
  const [output, setOutput] = useState([]);
  const [editing, setEditing] = useState(0);
  const [totalCost, setCost] = useState(0);
  const [objectForm, setObject] = useState([]);


  let onClick = (event) => {
    event.preventDefault()
    let out = output
    let out2 = objectForm
    if(data === '' || price === 0) return
    out.push(`${data}    ${price}`)
    out2.push(price)
    setObject(out2)
    let prices = 0
    objectForm.forEach((value) => {
      prices = parseInt(prices) + parseInt(value)
    })
    setCost(prices)
    setEditing(editing + 1)
    setOutput(out)
  }

  return (
    <div style={{display:"block"}}>
      <br></br>
      <h1>Current cost is {totalCost}</h1>
      <ul>
        {output.map(item => (
          <li>{item} </li>
          ))}
      </ul>
      <form onSubmit={onClick}>
        <input  placeholder="Enter Name" type="text" onChange={(event) => {setData(event.target.value)}}></input>
        <input placeholder="Enter Price" type="text" onChange={(event) => {setPrice(event.target.value)}}></input>
        <button onClick={onClick} >{'Set '+editing}</button>
      </form>
     </div>
  );
}
export default Objects