import React, { useEffect, useState } from 'react';
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";
import "../Home/Home.css";

const Home = () => {

    const [Location, setLocation] = useState("")
    const [data, setData] = useState({})
    const [weatherData, setWeatherData] = useState([]);
    const [WeatherIcon, setWeatherIcon] = useState([])
    const [Icon, setIcon] = useState([])

    const handleSearch = (e) => {
        setLocation(e.target.value)
    }

    const fetchData = async(e) => {
        e.preventDefault()

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=630ec6679e5afaa746a4d818be324ae1&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            setData(data)
            setIcon(data.weather[0])
        })
    }

    useEffect(() => {
        
        const fetchForecast = async () => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${Location}&units=metric&cnt=7&appid=630ec6679e5afaa746a4d818be324ae1`) 
            .then((response) => response.json())
            .then((Data) => {
                setWeatherData(Data.list)
                setWeatherIcon(Data.list.weather[0])
                console.log(Data.list)
            })
        }   
    
        if (data) {
            fetchForecast()
        }
    },[data])

return (
    <div className='Home' >
        <article>
            <form onSubmit={fetchData} >
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="" id="" placeholder='Search Location...' value={Location} onChange={handleSearch}  />
                <button onClick={fetchData} >Search</button>
            </form>
        </article>
        <article className='DayHighlights' >
            <section>
                <figure>
                    <h2>Present</h2>
                    {data.weather ? <h3 className="Description">{data.weather[0].main}</h3> : null }
                    <img src={`http://openweathermap.org/img/wn/${Icon.icon}@2x.png`} alt="Weather_Icon" /> 
                    {data.weather ? <p className="Description">{data.weather[0].description}</p> : null }
                    {data.main ? <h1>{data.main.temp} °C</h1> : null}
                    <figcaption>
                        <FaMapLocationDot size="2rem" /> {data.main ? <h3>{data.name} </h3> : null}, {data.main ? <h3>{data.sys.country} </h3> : null}
                    </figcaption>
                </figure>
            </section>
            <section>
                <h2>Today's Highlights</h2>
                <div>
                    <figure>
                        <i class="fa-solid fa-temperature-half"></i>
                        <figcaption>
                            <p>Temperature</p>
                            {data.main ? <h3>{data.main.temp} °C</h3> : null}
                        </figcaption>
                    </figure>
                    <figure>
                        <i class="fa-solid fa-temperature-high"></i>
                        <figcaption>
                            <p>Highest Temperature</p>
                            { data.main ? <p>{data.main.temp_max.toFixed()} °C</p> : null }
                        </figcaption>
                    </figure>
                    <figure>
                        <i class="fa-solid fa-temperature-low"></i>
                        <figcaption>
                            <p>Lowest Temperature</p>
                            { data.main ? <p>{data.main.temp_min.toFixed()} °C</p> : null }
                        </figcaption>
                    </figure>
                    <figure>
                        <LiaTemperatureHighSolid size="2rem" />
                        <figcaption>
                        <p>Feels Like</p>
                        { data.main ? <p>{data.main.feels_like.toFixed()} °C</p> : null }
                        </figcaption>
                    </figure>
                </div>
                <div>
                    <figure>
                        <i class="fa-solid fa-droplet"></i>
                        <figcaption>
                            <p>Humidity</p>
                            { data.main ? <p>{data.main.humidity.toFixed()} %</p> : null }
                        </figcaption>
                    </figure>
                    <figure>
                        <i class="fa-solid fa-gauge"></i>
                        <figcaption>
                            <p>Pressure</p>
                            { data.main ? <p>{data.main.pressure.toFixed()} hPa </p> : null }
                        </figcaption>
                    </figure>
                    <figure>
                        <i class="fa-solid fa-wind"></i>
                        <figcaption>
                            <p>Wind</p>
                            { data.wind ? <p>{data.wind.speed.toFixed()} m/s</p> : null }
                        </figcaption>
                    </figure>
                    <figure>
                        <i class="fa-solid fa-eye"></i>
                        <figcaption>
                            <p>Visibility</p>
                            { data.wind ? <p>{data.visibility} km</p> : null }
                        </figcaption>
                    </figure>
                </div>
            </section>
        </article>
        <article className='ForecastHighlights'>
            <h2>5 Days Forecast</h2>
            <section>
                {
                    weatherData.map((Data) => {
                        return(
                            <figure>
                                { Data.weather ? <h3>{Data.weather[0].main}</h3> : null}
                                <img src={`http://openweathermap.org/img/wn/${WeatherIcon.icon}@2x.png`} alt="Weather_Icon" /> 
                                { Data.weather ? <p>{Data.weather[0].description}</p> : null }
                                { Data.main ? <h1>{Data.main.temp} °C</h1> : null}
                            </figure>
                        )
                    })
                }
            </section> 
        </article>
        </div>
)
}

export default Home