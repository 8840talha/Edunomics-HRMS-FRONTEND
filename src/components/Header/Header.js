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



                <nav className="navbar navbar-expand-sm bg-white navbar-black flex-column flex-sm-row"
                    style={{ boxShadow: "0px 2px 4px grey" }}>


                    <a href="/" className="navbar-left "><img className="img" alt="headImg" width={95} src={require('../../assets/edunomics.png')} />
                    </a>



                    <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                        <ul className="navbar-nav topnav">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Digital Service</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Initiatives</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};