'use client';

import { useEffect, useRef } from 'react';

export default function SpotlightBackground() {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateSpotlight = (e: MouseEvent) => {
            if (spotlightRef.current) {
                spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
                spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
            }
        };

        window.addEventListener('mousemove', updateSpotlight);

        // Initialize spotlight at center
        if (spotlightRef.current) {
            spotlightRef.current.style.setProperty('--x', '50%');
            spotlightRef.current.style.setProperty('--y', '50%');
        }

        return () => {
            window.removeEventListener('mousemove', updateSpotlight);
        };
    }, []);

    return (
        <>
            <div className="background-base"></div>
            <div className="background" ref={spotlightRef}></div>
        </>
    );
}
