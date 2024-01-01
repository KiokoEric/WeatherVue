import React from 'react';
import { FaCloudSunRain } from "react-icons/fa6";
import "../Header/Header.css";

export const Header = () => {
return (
    <div className='Header' >
        <section>
            <h1><FaCloudSunRain className='Icon' size="3.5rem" /> WeatherVue</h1>
        </section>
    </div>
)
}