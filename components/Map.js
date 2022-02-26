import { useRef, useState, useEffect, useMemo } from "react";

import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

import { Box, useMantineTheme } from "@mantine/core";
import mapboxgl from "mapbox-gl";

const LIGHT_SOURCES = [
    "council_lights.json",
    "feature_lights.json"
];

export default function Map() {
    const map = useRef(null);
    const map_container = useRef(null);

    const theme = useMantineTheme();

    const [lights, set_lights] = useState([]);
    useEffect(() => {
        if (map.current) map.current.getSource("lights").setData({
            type: "FeatureCollection",
            features: lights.map(light => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: light[1]
                }
            }))
        });
    }, [map.current, lights]);

    useEffect(() => {
        let _map = new mapboxgl.Map({
            container: map_container.current,
            style: "mapbox://styles/mapbox/dark-v10",
            center: { lat: -37.814, lng: 144.963 },
            zoom: 9,
        });
        map.current = _map;

        _map.on("load", () => {
            const label_layer = _map.getStyle().layers.find(layer => layer.type === "symbol")?.id ?? null;

            _map.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true,
                    showUserHeading: true,
                    showAccuracyCircle: true
                })
            );
            
            _map.addSource("lights", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            });

            _map.addLayer({
                id: "lights",
                type: "heatmap",
                source: "lights",
                paint: {
                    "heatmap-radius": [
                        "interpolate",
                        ["linear"], ["zoom"],
                        13, 5,
                        15, 10,
                        18, 15
                    ],
                    "heatmap-color": [
                        "interpolate",
                        ["linear"], ["heatmap-density"],
                        0, "rgba(0, 0, 0, 0)",
                        0.1, theme.colors.yellow[0],
                        0.3, theme.colors.yellow[1],
                        0.5, theme.colors.yellow[2],
                        0.7, theme.colors.yellow[3],
                        1, theme.colors.yellow[4]
                    ],
                    "heatmap-opacity": 0.9
                }
            }, label_layer);

            for (let source of LIGHT_SOURCES) fetch(`/data/${source}`).then(async response => {
                let data = await response.json();
                set_lights(l => [...l, ...data]);
            });
        });
    }, []);

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,

                height: "100%",
                width: "100%",
            }}
            ref={map_container}
        />
    );
}
