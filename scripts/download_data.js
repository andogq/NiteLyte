const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs/promises");

const DATA_DIR = "../public/data";

const SOURCES = [
    {
        name: "council_lights",
        url: "https://data.melbourne.vic.gov.au/api/geospatial/hg8j-vcww?method=export&format=GeoJSON",
        handler: raw_data => (
            raw_data.features.map(feature => [
                Number(feature.properties.label),
                [
                    feature.geometry.coordinates[0],
                    feature.geometry.coordinates[1]
                ]
            ])
        )
    }
];

async function run() {
    for (let source of SOURCES) {        
        // Download the data
        console.log(`Downloading ${source.name}`);
        let response = await fetch(source.url)
        let raw_data = await response.json();

        // Pass it to the handler
        console.log(`Running handler for ${source.name}`);
        let data = source.handler(raw_data);

        // Save as file
        let file_path = path.join(DATA_DIR, `${source.name}.json`);
        console.log(`Saving to file ${file_path}`);
        await fs.writeFile(file_path, JSON.stringify(data));
    }

}

run();
