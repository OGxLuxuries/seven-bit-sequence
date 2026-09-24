import React, { useEffect, useMemo, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBSpinner,
} from "mdb-react-ui-kit";

// --- Config -----------------------------------------------------------
// Never hardcode the API key. Read it from an environment variable
// instead (see .env.example). Adjust the access line below to match
// your bundler:
//   Create React App -> process.env.REACT_APP_OWM_KEY
//   Vite              -> import.meta.env.VITE_OWM_KEY
const API_KEY = import.meta.env.VITE_OWM_KEY;

const LAT = "52.229676";
const LON = "21.012229";
const NAME = "Warsaw";

// These two endpoints are included on OpenWeather's free plan with any
// API key — no separate "One Call 3.0" subscription needed.
const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const ICON_BASE_URL = "https://openweathermap.org/img/wn/";
const ICON_FORMAT = ".png";

function buildUrl(base) {
  const params = new URLSearchParams({
    lat: LAT,
    lon: LON,
    units: "metric",
    appid: API_KEY,
  });
  return `${base}?${params.toString()}`;
}

function backgroundForCondition(main) {
  switch (main) {
    case "Snow":
      return "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
    case "Clouds":
      return "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
    case "Fog":
      return "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
    case "Rain":
      return "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
    case "Clear":
      return "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
    case "Thunderstorm":
      return "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
    default:
      return "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
  }
}

function fetchJson(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(
        res.status === 401
          ? "Invalid or unauthorized API key. New keys can take up to ~2 hours to activate after signup."
          : `Weather API error: ${res.status}`
      );
    }
    return res.json();
  });
}

export default function ApiExample() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null); // raw /forecast response
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_KEY) {
      setError(
        "Missing API key. Set REACT_APP_OWM_KEY in your .env file and restart the dev server."
      );
      setLoading(false);
      return;
    }

    let cancelled = false;

    Promise.all([
      fetchJson(buildUrl(CURRENT_URL)),
      fetchJson(buildUrl(FORECAST_URL)),
    ])
      .then(([currentJson, forecastJson]) => {
        if (cancelled) return;
        setCurrent(currentJson);
        setForecast(forecastJson);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // The forecast endpoint returns one entry every 3 hours. Grab the next
  // five entries for the "upcoming hours" strip.
  const upcoming = useMemo(() => {
    if (!forecast) return [];
    return forecast.list.slice(0, 5);
  }, [forecast]);

  // Approximate "today" / "tomorrow" / "day after" by picking the midday
  // (12:00) entry for each of the next three days from the 3-hour list.
  const dailyPicks = useMemo(() => {
    if (!forecast) return [];
    const middays = forecast.list.filter((entry) =>
      entry.dt_txt.includes("12:00:00")
    );
    return middays.slice(0, 3);
  }, [forecast]);

  const bgGif = current
    ? backgroundForCondition(current.weather[0].main)
    : "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";

  const iconUrl = (code) => ICON_BASE_URL + code + ICON_FORMAT;

  const dayLabels = ["Today", "Tomorrow", "Day after tomorrow"];

  return (
    <section className="vh-100">
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="9" lg="7" xl="5">
            {loading && (
              <div className="text-center text-white">
                <MDBSpinner role="status">
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
              </div>
            )}

            {!loading && error && (
              <MDBCard className="text-white bg-danger p-4">
                <strong className="d-block mb-1">Couldn't load weather</strong>
                <span>{error}</span>
              </MDBCard>
            )}

            {!loading && !error && current && (
              <MDBCard
                className="text-white bg-image shadow-4-strong"
                style={{ backgroundImage: bgGif }}
              >
                <MDBCardHeader className="p-4 border-0">
                  <div className="text-center mb-3">
                    <p className="h2 mb-1">{NAME}</p>
                    <p className="mb-1">{current.weather[0].description}</p>
                    <p className="display-1 mb-1">
                      {Math.round(current.main.temp)}°C
                    </p>
                    <span>Pressure: {current.main.pressure}</span>
                    <span className="mx-2">|</span>
                    <span>Humidity: {current.main.humidity}%</span>
                  </div>
                </MDBCardHeader>

                <MDBCardBody className="p-4 border-top border-bottom mb-2">
                  <MDBRow className="text-center">
                    {upcoming.map((entry) => (
                      <MDBCol size="2" key={entry.dt}>
                        <strong className="d-block mb-2">
                          {new Date(entry.dt * 1000).getHours()}
                        </strong>
                        <img
                          src={iconUrl(entry.weather[0].icon)}
                          alt={entry.weather[0].description}
                        />
                        <strong className="d-block">
                          {Math.round(entry.main.temp)}°
                        </strong>
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBCardBody>

                <MDBCardBody className="px-5">
                  {dailyPicks.map((entry, i) => (
                    <MDBRow className="align-items-center" key={entry.dt}>
                      <MDBCol lg="6">
                        <strong>{dayLabels[i] ?? entry.dt_txt}</strong>
                      </MDBCol>
                      <MDBCol lg="2" className="text-center">
                        <img
                          className="w-100"
                          src={iconUrl(entry.weather[0].icon)}
                          alt={entry.weather[0].description}
                        />
                      </MDBCol>
                      <MDBCol lg="4" className="text-end">
                        {Math.round(entry.main.temp)}°
                      </MDBCol>
                    </MDBRow>
                  ))}
                </MDBCardBody>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}