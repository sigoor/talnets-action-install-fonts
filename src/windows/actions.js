const { FONT_REGISTRY, FONTS_DIRECTORY } = require("./constants");
const { execSync } = require("child_process");
const { copyFile } = require("../file-utils");

const copyFontFileToFontsDirectory = async (fontSourcePath, fontFilename) => {
  if (!fontSourcePath) {
    throw new Error(`Font path must be provided`);
  }
  if (!fontFilename) {
    throw new Error(`Font name must be present for path ${fontFilename}`);
  }
  return await copyFile(fontSourcePath, FONTS_DIRECTORY + fontFilename);
};
const fontExistsInRegistry = (fontName) => {
  try {
    execSync(`REG QUERY "${FONT_REGISTRY}" /v "${fontName} (TrueType)"`);
    return true;
  } catch (error) {
    return false;
  }
};

const addFontToRegistry = (fontFilename, fontName) => {
  execSync(
    `REG ADD "${FONT_REGISTRY}" /v "${fontName} (TrueType)" /t REG_SZ /d "${fontFilename}" /f`,
  );
  console.log("Font was successfully added to registry");
  return "Font was successfully added to registry";
};

module.exports = {
  copyFontFileToFontsDirectory,
  fontExistsInRegistry,
  addFontToRegistry,
};
