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
                const y = (canvas