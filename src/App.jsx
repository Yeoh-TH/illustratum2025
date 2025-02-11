import React, { useState } from 'react';
import SineWaveGenerator from './SineWaveGenerator';
import Slider from './Slider';
import NumberInput from './NumberInput';
import './App.css'

function App() {
  const [generators, setGenerators] = useState([]);

  const addGenerator = () => {
    setGenerators([
      ...generators,
      { id: Date.now(), amplitude: 50, frequency: 444, showGraph: true },
    ]);
  };

  const updateGenerator = (id, key, value) => {
    setGenerators(generators.map(gen => gen.id === id ? { ...gen, [key]: value } : gen));
  };

  const toggleGraphVisibility = (id) => {
    setGenerators(generators.map(gen => gen.id === id ? { ...gen, showGraph: !gen.showGraph } : gen));
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10);
  };

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
      {generators.map(({ id, amplitude, frequency, showGraph }) => (
        <div key={id} className="generator">
          {showGraph ? (
            <button className="visibleButtons" onClick={() => toggleGraphVisibility(id)}>
              <i className='fas fa-eye-slash'></i>
            </button>
          ) : (
            <button className="visibleButtons" onClick={() => toggleGraphVisibility(id)}>
              <i className='fas fa-eye'></i>
            </button>
          )}

          {showGraph && (
            <>
              <SineWaveGenerator
                frequency={frequency}
                amplitude={amplitude / 100}
              />
              <h1>
                Frequency:
                <NumberInput
                  className="numberOption"
                  value={frequency}
                  min="110"
                  max="880"
                  step="1"
                  onChange={(e) => updateGenerator(id, 'frequency', e.target.value)}
                />
                hz
              </h1>
              <Slider
                className="slider"
                value={frequency}
                min="110"
                max="880"
                step="1"
                onChange={(e) => updateGenerator(id, 'frequency', e.target.value)}
              />
              <h1>
                Amplitude:
                <NumberInput
                  className="numberOption"
                  value={amplitude}
                  min="0"
                  max="100"
                  step="1"
                  onChange={(e) => updateGenerator(id, 'amplitude', e.target.value)}
                />
                %
              </h1>
              <Slider
                className="slider"
                value={amplitude}
                min="0"
                max="100"
                step="1"
                onChange={(e) => updateGenerator(id, 'amplitude', e.target.value)}
              />
            </>
          )}
        </div>
      ))}
      <button onClick={addGenerator} className="addButton">
        <i className='fas fa-plus'></i>
      </button>
    </div>
  );
}

export default App;