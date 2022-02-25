import { useRef, useState, useEffect, useMemo } from "react";

import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

import { Box } from "@mantine/core";
import mapboxgl from "mapbox-gl";

export default function Map() {
    const map = useRef(null);
    const map_container = useRef(null);

    const [council_lights, set_council_lights] = useState([]);
    useEffect(() => {
        if (map.current) map.current.getSource("council_lights").setData({
            type: "FeatureCollection",
            features: council_lights.map(light => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: light[1]
                },
                properties: {
                    lux: light[0]
                }
            }))
        })
    }, [map.current, council_lights]);

    useEffect(() => {
        let _map = new mapboxgl.Map({
            container: map_container.current,
            style: "mapbox://styles/mapbox/dark-v10",
            center: { lat: -37.814, lng: 144.963 },
            zoom: 9,
        });
        map.current = _map;

        _map.on("load", () => {
            _map.addSource("council_lights", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            });

            _map.addLayer({
                id: "council_lights",
                type: "circle",
                source: "council_lights",
                paint: {
                    "circle-color": "yellow"
                }
            });

            fetch("/data/council_lights.json").then(async response => {
                let data = await response.json();
                set_council_lights(data);
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
