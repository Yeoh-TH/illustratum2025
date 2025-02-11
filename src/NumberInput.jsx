import React from 'react';

const NumberInput = ({ id, value, min, max, step, onChange }) => {
    return (
        <input
            id={id}
            className="numberOption"
            type="number"
            min={min}
            max={max}
            value={value}
            step={step}
            onChange={onChange}
        />
    );
};

export default NumberInput;