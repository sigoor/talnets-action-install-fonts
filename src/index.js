const os = require("os");
const fileUtils = require("./file-utils");
const windowsActions = require("./windows/actions");
const path = require("path")

module.exports = async (job, settings, { fontsDirectory }, type) => {
  if (type !== "prerender") {
    throw new Error(
      `Action ${name} can be only run in prerender mode, you provided: ${type}.`,
    );
  }
  if (os.type() !== "Windows_NT") {
    console.log("This action only runs under windows");
    return Promise.resolve(job);
  }
  if (!fontsDirectory) {
    fontsDirectory = job.workpath;
  }
  console.log("Looking for fonts in ", fontsDirectory);

  const discoveredFonts = await fileUtils.getFontFiles(fontsDirectory);
  for (let { path:fontPath, name } of discoveredFonts) {
    let filename = path.basename(fontPath, path.extname(fontPath));
    let filenameWithExtension = path.basename(fontPath);
    if (windowsActions.fontExistsInRegistry(filename)) {
      console.log("Font exists in registry", name);
      continue;
    }
    console.log("Installing font: ", name);
    const copied = await windowsActions.copyFontFileToFontsDirectory(
      fontPath,
      filenameWithExtension,
    );
    // extract filename from path
    if (copied) {
      console.log("Font copied, adding to registry: ", name);
      windowsActions.addFontToRegistry(filenameWithExtension, name);
    }
    console.log("Font installed", name);
  }
  return job;
};
