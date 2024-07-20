const dataPath = "src/data/json/serpData.json";

const dataFile = Bun.file(dataPath);

export const serpData = await dataFile.json();