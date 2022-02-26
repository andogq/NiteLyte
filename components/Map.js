import { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

import { GeoLocation } from "../context";

import { firestore } from "../lib/firebase";
import {
    getDoc,
    updateDoc,
    doc,
    collection,
    onSnapshot,
} from "firebase/firestore";

// TODO: Waiting on auth to use user's ID
const UID = "LlmWiUVJFYaKjJr5tlGd";

import { Box, useMantineTheme } from "@mantine/core";
import mapboxgl from "mapbox-gl";

const LIGHT_SOURCES = ["council_lights.json", "feature_lights.json"];

const users_collection = collection(firestore, "users");
const share_collection = collection(firestore, "share_urls");

export default function Map({ on_locate }) {
    const map = useRef(null);
    const map_container = useRef(null);

    const [live_location, set_live_location] = useState(true);

    const router = useRouter();
    const theme = useMantineTheme();

    const [lights, set_lights] = useState([]);
    useEffect(() => {
        if (map.current)
            map.current.getSource("lights")?.setData({
                type: "FeatureCollection",
                features: lights.map((light) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: light[1],
                    },
                })),
            });
    }, [map.current, lights]);

    const [share, set_share] = useState(null);

    useEffect(() => {
        if (map.current && share) {
            map.current.getSource("share_location")?.setData({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [share.lon, share.lat],
                },
            });

            map.current.flyTo({center: [share.lon, share.lat]});
        }
    }, [map.current, share]);

    useEffect(async () => {
        let share_id = router.query.share;

        if (share_id) {
            // Get the share object
            let share_ref = await getDoc(doc(share_collection, share_id));
            if (share_ref.exists()) {
                let share = share_ref.data();

                if (Date.now() < share.expiry.toMillis()) {
                    // Monitor user for update (return unsubscribe function)
                    return onSnapshot(
                        doc(users_collection, share.user),
                        (snapshot) => {
                            set_share(snapshot.data().last_location);
                        }
                    );
                } else {
                    // Share link is expired
                    set_share(null);
                }
            }

            // Return unsubscribe function
            return onSnapshot(doc(share_collection, share_id), (snapshot) => {
                let data = snapshot.data();
            });
        }
    }, [map.current, router.query.share]);

    useEffect(() => {
        let _map = new mapboxgl.Map({
            container: map_container.current,
            style: "mapbox://styles/mapbox/dark-v10",
            center: { lat: -37.814, lng: 144.963 },
            zoom: 9,
        });
        map.current = _map;

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
            showAccuracyCircle: true,
        });
        geolocate.on("geolocate", async (position) => {
            on_locate({ lat: position.coords.latitude, lon: position.coords.longitude });

            if (live_location) {
                const user_doc = doc(users_collection, UID);

                await updateDoc(user_doc, {
                    last_location: {
                        accuracy: position.coords.accuracy,
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        time: position.timestamp,
                    },
                });
            }
        });
        _map.addControl(geolocate);

        _map.on("load", () => {
            const label_layer =
                _map.getStyle().layers.find((layer) => layer.type === "symbol")
                    ?.id ?? null;
            
            geolocate.trigger();

            _map.addSource("share_location", {
                type: "geojson",
                data: {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [],
                    },
                },
            });

            _map.addLayer({
                id: "share_location",
                type: "circle",
                source: "share_location",
                paint: {
                    "circle-color": "cyan",
                },
            });

            _map.addSource("lights", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [],
                },
            });

            _map.addLayer(
                {
                    id: "lights",
                    type: "heatmap",
                    source: "lights",
                    paint: {
                        "heatmap-radius": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            13,
                            5,
                            15,
                            10,
                            18,
                            15,
                        ],
                        "heatmap-color": [
                            "interpolate",
                            ["linear"],
                            ["heatmap-density"],
                            0,
                            "rgba(0, 0, 0, 0)",
                            0.1,
                            theme.colors.yellow[0],
                            0.3,
                            theme.colors.yellow[1],
                            0.5,
                            theme.colors.yellow[2],
                            0.7,
                            theme.colors.yellow[3],
                            1,
                            theme.colors.yellow[4],
                        ],
                        "heatmap-opacity": 0.9,
                    },
                },
                label_layer
            );

            for (let source of LIGHT_SOURCES)
                fetch(`/data/${source}`).then(async (response) => {
                    let data = await response.json();
                    set_lights((l) => [...l, ...data]);
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
