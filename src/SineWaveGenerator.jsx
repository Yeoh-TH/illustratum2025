import React, { useEffect, useRef, useState } from 'react'

const SineWaveGenerator = ({ frequency, amplitude }) => {
    const canvasRef = useRef(null);
    const [audioContext, setAudioContext] = useState(null);
    const [source, setSource] = useState(null);
    const [isSource, setIsSource] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = 200;

        const drawSineWave = () => {
            const duration = 0.02;
            const sr = 44100;
            const wave = sine_wave(amplitude, frequency, duration, sr);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);

            for (let i = 0; i < wave.length; i++) {
                const x = (canvas.width * i) / wave.length;
                const y = (canvas.height / 2) - wave[i] * (canvas.height / 2);
                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = "#EEEEEE";
            ctx.lineWidth = 3;
            ctx.stroke();
        };

        const sine_wave = (amplitude, frequency, duration, sr) => {
            const samples = duration * sr;
            const wave = [];
            for (let i = 0; i < samples; i++) {
                const sample = amplitude * Math.sin((2 * Math.PI * frequency * i) / sr);
                wave.push(sample);
            }
            return wave;
        };

        drawSineWave();

        return () => {
            if (source) {
                source.stop();
                source.disconnect();
            }
        };
    }, [frequency, amplitude]);

    const playSound = () => {
        if (!audioContext) {
            setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
        }

        if (source) {
            source.stop();
            source.disconnect();
        }

        const duration = 100;
        const sr = 44100;
        const samples = duration * sr;
        const wave = sine_wave(amplitude, frequency, duration, sr);
        const buffer = audioContext.createBuffer(1, samples, sr);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < samples; i++) {
            data[i] = wave[i];
        }

        const newSource = audioContext.createBufferSource();
        newSource.buffer = buffer;
        newSource.connect(audioContext.destination);
        newSource.start();
        setSource(newSource);
        setIsSource(true);
    };

    const stopSound = () => {
        if (source) {
            source.stop();
            source.disconnect();
            setSource(null);
            setIsSource(false);
        }
    };

    return <canvas id="graph" ref={canvasRef}></canvas>;
};

export default SineWaveGenerator;