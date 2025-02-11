import React from 'react';

const Slider = ({ id, value, min, max, step, onChange }) => {
    return (
        <input
            id={id}
            className="slider"
            type="range"
            min={min}
            max={max}
            value={value}
            step={step}
            onChange={onChange}
        />
    );
};

export default Slider;