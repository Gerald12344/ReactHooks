import React, { useState } from 'react';

function Objects() {
    const [data, setData] = useState(0);
    const [valid, setvalidiaty] = useState(false);



    let onClicks = React.useCallback((event) => {
        setData(event.target.value)
        let digits = event.target.value
        if(digits.length === 16){
            if(isNaN(digits)){
                setvalidiaty(false)
                return
            }else{
                if(parseInt(digits[digits.length-1]) % 2 === 0){
                    let object = {}
                    let total = 0
                    let array = digits.split('')
                    array.forEach(element => {
                        object[element] = parseInt[element] + 1
                        total = total + parseInt(element)
                    });
                    Object.keys(object).forEach(element => {
                        if(object[element] > 7){
                            setvalidiaty(false)
                            return
                        }
                    })
                    if(total > 15){
                        setvalidiaty(true)
                        return
                    }
                }else{
                    setvalidiaty(false)
                    return
                }
            }
        }else{
            setvalidiaty(false)
            return
        }
    }, [setvalidiaty, setData]);

    let upgradesPeople = React.useCallback(() => {
        if (valid) {
            return `The Card ${data} Credit Card is Valid`
        }
        else {
            return `The Card ${data} Credit Card is Not Valid`
        }
    }, [valid, data]);

    return (
        <div style={{ display: "block" }}>
            <br></br>
            <h1>Credit Card Validator</h1>
            <h3>{upgradesPeople()}</h3>
            <input placeholder="Enter Card Number" type="text" onChange={onClicks}></input>
        </div>
    );
}
export default Objects