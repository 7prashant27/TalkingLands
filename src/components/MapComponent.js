import React, { useState, useEffect, useRef } from "react";
import {
    MapContainer as LeafletMap,
    TileLayer,
    Marker,
    Polygon,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { clickedLocationDiv, header, leafletMapStyle, parentDiv } from "../styles/leafletStyle";




const dummyPointData = [
    { id: 1, lat: 23.505, lng: 86.309, name: "Ranchi" },
    { id: 2, lat: 28.51, lng: 77.111, name: "Delhi" },
    { id: 3, lat: 19.51, lng: 74.111, name: "Mumbai" },
    { id: 4, lat: 22.57, lng: 88.36, name: "Kolkata" },
    { id: 5, lat: 17.51, lng: 78.111, name: "Hyderabad" },

];

const dummyPolygonData = [
    {
        id: 1,
        coordinates: [
            [23.244, 70.309],
            [25.244, 80.309],
            [27.51, 74.01],
        ],
    },
    {
        id: 2,
        coordinates: [
            [33.244, 75.309],
            [35.244, 86.309],
            [47.51, 79.01],
        ],
    },
];

const MapContainer = () => {
    const [pointData, setPointData] = useState([]);
    const [polygonData, setPolygonData] = useState([]);
    const [clickedLocation, setClickedLocation] = useState(null);




    useEffect(() => {
        setPointData(dummyPointData);
        setPolygonData(dummyPolygonData);
    }, []);


    const handleMapClick = (event) => {
        const { latlng } = event;
        console.log("Clicked position:", latlng.lat, latlng.lng);
        setClickedLocation(latlng);

    };



    return (
        <div style={parentDiv}>
            <div
                style={header}
            >
                <h1> React Map </h1>
            </div>
            <LeafletMap
                center={[20.244, 78.309]}
                zoom={5}
                scrollWheelZoom={true}
                onClick={handleMapClick}
                style={leafletMapStyle}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pointData.map((point) => (
                    <Marker
                        key={point.id}
                        position={[point.lat, point.lng]}
                        icon={
                            new Icon({
                                iconUrl: markerIconPng,
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                            })
                        }
                    >
                        <Popup>
                            The name of the city is <br /> {point.name}
                        </Popup>
                    </Marker>
                ))}
                {polygonData.map((polygon) => (
                    <Polygon
                        key={polygon.id}
                        pathOptions={{ color: "red" }}
                        positions={polygon.coordinates}
                    />
                ))}
            </LeafletMap>

            {clickedLocation && (
                <div
                    className="card"
                    style={clickedLocationDiv}
                >
                    <h3>Clicked Location</h3>
                    <p>Latitude: {clickedLocation.lat}</p>
                    <p>Longitude: {clickedLocation.lng}</p>
                </div>
            )}
        </div>
    );
};

export default MapContainer;
