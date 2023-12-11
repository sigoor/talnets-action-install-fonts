const fs = require("fs");
const path = require("path");
const fontkit = require("fontkit");

async function getFontFiles(dir) {
  let results = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nestedResults = await getFontFiles(fullPath);
      results = results.concat(nestedResults);
    } else if (
      entry.isFile() &&
      /\.(ttf|otf|woff|woff2|eot)$/i.test(entry.name)
    ) {
      const fontData = await fontkit.open(fullPath);
      results.push({ path: fullPath, name: fontData.fullName });
    }
  }
  return results;
}

const copyFile = async (source, destination) => {
  if (fileExists(destination)) {
    console.log("File already exists at destination: ", destination);
    return false;
  }
  try {
    await fs.promises.copyFile(source, destination);
    console.log("Successfully copied to destination: ", destination);
    return true;
  } catch (err) {
    console.error("Copying error occurred: ", err);
    throw err;
  }
};

const fileExists = (path) => {
  return fs.existsSync(path);
};

module.exports = {
  getFontFiles,
  fileExists,
  copyFile,
};
