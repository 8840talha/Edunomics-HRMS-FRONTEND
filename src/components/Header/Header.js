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



                <nav class="navbar navbar-expand-sm bg-white navbar-black flex-column flex-sm-row">


                    <a href="/" className="navbar-left ">  <img className="img" alt="headImg" width={95} src={require('../../assets/edunomics.png')} />
                    </a>



                    <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                        <ul class="navbar-nav topnav">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Digital Service</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Initiatives</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>


    );
};