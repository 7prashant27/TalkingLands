import React, { useState, useEffect } from "react";
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

const parentDiv = {
  height: "100vh",
  width: "100vw",
  backgroundColor: "grey",
  padding: "5px",
  boxSizing: "border-box",
};

const header = {
  backgroundColor: "cyan",
  padding: 10,
  margin: "10px auto",
  textAlign: "center",
};

const clickedLocationDiv = {
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "white",
  padding: 10,
};

const leaflet = { height: "80vh", margin: "10px", position: "relative" };

const MapContainer2 = () => {
  const [pointData, setPointData] = useState([]);
  const [polygonData, setPolygonData] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null);

  useEffect(() => {
    fetchSampleData();
  }, []);

  const fetchSampleData = async () => {
    try {
      const pointResponse = await fetch(
        "https://nominatim.openstreetmap.org/search?q=India&format=json&limit=5"
      );
      const pointData = await pointResponse.json();
      const formattedPointData = pointData.map((item, index) => ({
        id: index + 1,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        name: item.display_name,
      }));
      setPointData(formattedPointData);
    } catch (error) {
      console.error("Error fetching sample point data: ", error);
    }

    try {
      const polygonResponse = await fetch(
        "https://nominatim.openstreetmap.org/search?q=India&format=json&limit=2"
      );
      const polygonData = await polygonResponse.json();
      const formattedPolygonData = polygonData.map((item, index) => ({
        id: index + 1,
        coordinates: [
          [parseFloat(item.lat) - 0.1, parseFloat(item.lon) - 0.1],
          [parseFloat(item.lat) + 0.1, parseFloat(item.lon) - 0.1],
          [parseFloat(item.lat) + 0.1, parseFloat(item.lon) + 0.1],
        ],
      }));
      setPolygonData(formattedPolygonData);
    } catch (error) {
      console.error("Error fetching sample polygon data: ", error);
    }
  };

  const handleMapClick = (event) => {
    const { latlng } = event;
    setClickedLocation(latlng);
  };

  return (
    <div style={parentDiv}>
      <div style={header}>
        <h1>React Map</h1>
      </div>
      <LeafletMap
        center={[20.244, 78.309]}
        zoom={5}
        scrollWheelZoom={true}
        onClick={handleMapClick}
        style={leaflet}
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
              The name of the location is <br /> {point.name}
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
        <div className="card" style={clickedLocationDiv}>
          <h3>Clicked Location</h3>
          <p>Latitude: {clickedLocation.lat}</p>
          <p>Longitude: {clickedLocation.lng}</p>
        </div>
      )}
    </div>
  );
};

export default MapContainer2;