import css from "./map.module.css";
import { useRef, useState, useEffect } from "react";

import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

import { Box } from "@mantine/core";
import mapboxgl from "mapbox-gl";

export default function Map() {
    const mapbox = useRef(null);
    const map_container = useRef(null);

    useEffect(() => {
        mapbox.current = new mapboxgl.Map({
            container: map_container.current,
            style: "mapbox://styles/mapbox/dark-v10",
            center: { lat: -37.814, lng: 144.963 },
            zoom: 9
        })
    }, []);

    return <Box className={css.container} ref={map_container} />;
}
