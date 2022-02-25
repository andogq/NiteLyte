const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs/promises");

const DATA_DIR = "../public/data";
const PRECISION = 5; // https://wiki.openstreetmap.org/wiki/Precision_of_coordinates
const SOURCES = [
    {
        name: "council_lights",
        url: "https://data.melbourne.vic.gov.au/api/geospatial/hg8j-vcww?method=export&format=GeoJSON",
        handler: raw_data => (
            raw_data.features.map(feature => [
                Number(feature.properties.label), // lux
                [
                    feature.geometry.coordinates[0], // lng
                    feature.geometry.coordinates[1]  // lat
                ]
            ])
        )
    },
    {
        name: "feature_lights",
        url: "https://data.melbourne.vic.gov.au/api/views/4j42-79hg/rows.csv",
        json: false,
        handler: raw_data => (
            raw_data.split("\n").map(light => {
                light = light.split(",");

                return [
                    Number(light[3]), // Lamp wattage,
                    [
                        Number(light[6]), // lng
                        Number(light[5])  // lat
                    ]
                ];
            }).slice(1)
        )
    }
];

async function run() {
    let args = process.argv.slice(2);
    let selected_sources = SOURCES.filter(({ name }) => args.length === 0 || args.includes(name));
    
    for (let source of selected_sources) {        
        // Download the data
        console.log(`Downloading ${source.name}`);
        let response = await fetch(source.url);
        let raw_data = await (source.json === false ? response.text() : response.json());

        // Pass it to the handler
        console.log(`Running handler for ${source.name}`);
        let data = source
            .handler(raw_data)
            .map(([val, coords]) => [
                val,
                coords.map(c => Math.round(c * Math.pow(10, PRECISION)) / Math.pow(10, PRECISION))
            ]);
        
        // Filter nearby coordinates
        let combinations = [];
        let start_count = data.length;
        data = data.filter(([_, coords]) => {
            if (!combinations.includes(coords.join(","))) {
                combinations.push(coords.join(","));

                return true;
            } else return false;
        });
        console.log(`Filtered data from ${start_count} to ${data.length}`);

        // Save as file
        let file_path = path.join(DATA_DIR, `${source.name}.json`);
        console.log(`Saving to file ${file_path}`);
        await fs.writeFile(file_path, JSON.stringify(data));
    }
}

run();
