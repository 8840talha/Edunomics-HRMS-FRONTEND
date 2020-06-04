import React, { useEffect, useRef, useState } from 'react';
import './Header.css'

export default () => {
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            setSticky(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    return (


        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
            <div className="sticky-inner">
                <header className="header">
                    <nav>
                        <img alt="headImg" src={require('../../assets/output-onlinepngtools.png')} />
                    </nav>
                    <div className='links'>
                        <ul>
                            <a href="/">Home|</a>
                            <a href="/">Digital Services|</a>
                            <a href="/">Initiatives</a>
                        </ul>

                    </div>
                </header>
            </div>
        </div>


    );
};