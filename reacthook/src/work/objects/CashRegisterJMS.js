import React from 'react';

// All actions are assumed to be new items
const reducer = (state, action) => {
    return {
        totalCost: state.totalCost + action.price,
        editing: state.editing + 1,
        items: [
            action,
            ...state.items
        ]
    }
}

const defaultState = {
    totalCost: 0,
    editing: 0,
    items: []
}

export default () => {
    const [newName, setNewName] = React.useState('Some Item');
    const [newPrice, setNewPrice] = React.useState(0);

    // I am destructuring the state of the reducer into the variables you had in separate state values before...
    const [{totalCost, items, editing}, addItem] = React.useReducer(reducer, defaultState);

    // I am memo-ising the name change hander, note the use of destructuring in the callback...natty
    const onNewNameChange = React.useCallback(({target:{value}}) => setNewName(value), [setNewName]);
    const onPriceChange = React.useCallback(({target:{value}}) => setNewPrice(parseFloat(value)), [setNewPrice]);
    const onClick = React.useCallback((e) => {
        e.preventDefault();
        addItem({name: newName, price: newPrice});
    }, [addItem, newName, newPrice]);

    return (<div style={{display:"block"}}>
        <br></br>
        <h1>Current cost is {totalCost}</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
        {/* JMS: This is where you need to use the index as well as the item to generate a key */}
        {items.map(({name, price}, i) => (
            <tr key={i}>
                <td>{name}</td>
                <td>{price}</td>
            </tr>
            ))}
            </tbody>
        </table>
        <form onSubmit={onClick}>
        <input  placeholder="Enter Name" type="text" onChange={onNewNameChange}></input>
        <input placeholder="Enter Price" type="number" onChange={onPriceChange}></input>
        <button onClick={onClick} >{'Set '+editing}</button>
        </form>
    </div>)
} 