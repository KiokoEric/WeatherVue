import React, { useEffect, useState } from 'react';
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";
import "../Home/Home.css";

const Home = () => {

    const [Location, setLocation] = useState("")
    const [data, setData] = useState([])
    const [Icon, setIcon] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [WeatherIcon, setWeatherIcon] = useState([])
    const [weatherData2, setWeatherData2] = useState([])
    const [WeatherIcon2, setWeatherIcon2] = useState([])
    const [weatherData3, setWeatherData3] = useState([])
    const [WeatherIcon3, setWeatherIcon3] = useState([])
    const [weatherData4, setWeatherData4] = useState([])
    const [WeatherIcon4, setWeatherIcon4] = useState([])
    const [weatherData5, setWeatherData5] = useState([])
    const [WeatherIcon5, setWeatherIcon5] = useState([])
    const [weatherData6, setWeatherData6] = useState([])
    const [WeatherIcon6, setWeatherIcon6] = useState([])
    const [weatherData7, setWeatherData7] = useState([])
    const [WeatherIcon7, setWeatherIcon7] = useState([])

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
                setWeatherData(Data.list[0])
                setWeatherIcon(Data.list[0].weather[0].icon)
                setWeatherData2(Data.list[1])
                setWeatherIcon2(Data.list[1].weather[0].icon)
                setWeatherData3(Data.list[2])
                setWeatherIcon3(Data.list[2].weather[0].icon)
                setWeatherData4(Data.list[3])
                setWeatherIcon4(Data.list[3].weather[0].icon)
                setWeatherData5(Data.list[4])
                setWeatherIcon5(Data.list[4].weather[0].icon)
                setWeatherData6(Data.list[5])
                setWeatherIcon6(Data.list[5].weather[0].icon)
                setWeatherData7(Data.list[6])
                setWeatherIcon7(Data.list[6].weather[0].icon)
            })
        }   
    
        if (Icon) {
            fetchForecast()
        }

    },[Icon])

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
                    (!weatherData) ?  "" :(
                        <figure>
                            { weatherData.weather ? <h3>{weatherData.weather[0].main}</h3> : null}
                            <img src={`http://openweathermap.org/img/wn/${WeatherIcon}@2x.png`} alt="Weather_Icon" /> 
                            { weatherData.weather ? <p>{weatherData.weather[0].description}</p> : null }
                            { weatherData.main ? <h1>{weatherData.main.temp} °C</h1> : null }
                            <p>{weatherData.dt_txt}</p>
                        </figure>
                    ) 
                }
                {
                    (!weatherData2) ?  "" : (
                        <figure>
                            { weatherData2.weather ? <h3>{weatherData2.weather[0].main}</h3> : null}
                            <img src={`http://openweathermap.org/img/wn/${WeatherIcon2}@2x.png`} alt="Weather_Icon" /> 
                            { weatherData2.weather ? <p>{weatherData2.weather[0].description}</p> : null }
                            { weatherData2.main ? <h1>{weatherData2.main.temp} °C</h1> : null }
                            <p>{weatherData2.dt_txt}</p>
                        </figure>
                    )
                }
                {
                    (!weatherData3) ?  "" : (
                        <figure>
                            { weatherData3.weather ? <h3>{weatherData3.weather[0].main}</h3> : null}
                            <img src={`http://openweathermap.org/img/wn/${WeatherIcon3}@2x.png`} alt="Weather_Icon" /> 
                            { weatherData3.weather ? <p>{weatherData3.weather[0].description}</p> : null }
                            { weatherData3.main ? <h1>{weatherData3.main.temp} °C</h1> : null }
                            <p>{weatherData3.dt_txt}</p>
                        </figure>
                    ) 
                }
                {
                    (!weatherData4) ?  "" : (
                        <figure>
                            { weatherData4.weather ? <h3>{weatherData4.weather[0].main}</h3> : null}
                            <img src={`http://openweathermap.org/img/wn/${WeatherIcon4}@2x.png`} alt="Weather_Icon" /> 
                            { weatherData4.weather ? <p>{weatherData4.weather[0].description}</p> : null }
                            { weatherData4.main ? <h1>{weatherData4.main.temp} °C</h1> : null }
                            <p>{weatherData4.dt_txt}</p>
                        </figure>
                    ) 
                }
                {
                    (!weatherData5) ?  "" : (
                        <figure>
                            { weatherData5.weather ? <h3>{weatherData5.weather[0].main}</h3> : null}
                            <img src={`http://openweathermap.org/img/wn/${WeatherIcon5}@2x.png`} alt="Weather_Icon" /> 
                            { weatherData5.weather ? <p>{weatherData5.weather[0].description}</p> : null }
                            { weatherData5.main ? <h1>{weatherData5.main.temp} °C</h1> : null }
                            <p>{weatherData5.dt_txt}</p>
                        </figure>
                    ) 
                }
                {
                    (!weatherData6) ?  "" : (
                        <figure>
                            { weatherData6.weather ? <h3>{weatherData6.weather[0].main}</h3> : null}
                            <img src={`http://openweathermap.org/img/wn/${WeatherIcon6}@2x.png`} alt="Weather_Icon" /> 
                            { weatherData6.weather ? <p>{weatherData6.weather[0].description}</p> : null }
                            { weatherData6.main ? <h1>{weatherData6.main.temp} °C</h1> : null }
                            <p>{weatherData6.dt_txt}</p>
                        </figure>
                    ) 
                }
                {
                    (!weatherData7) ?  "" : (
                        <figure>
                            { weatherData7.weather ? <h3>{weatherData7.weather[0].main}</h3> : null}
                            <img src={`http://openweathermap.org/img/wn/${WeatherIcon7}@2x.png`} alt="Weather_Icon" /> 
                            { weatherData7.weather ? <p>{weatherData7.weather[0].description}</p> : null }
                            { weatherData7.main ? <h1>{weatherData7.main.temp} °C</h1> : null }
                            <p>{weatherData7.dt_txt}</p>
                        </figure>
                    ) 
                }
            </section> 
        </article>
        </div>
)
}

export default Home