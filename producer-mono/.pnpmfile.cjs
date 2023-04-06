// hooks.readPackage(pkg, context): pkg
const fs = require("node:fs/promises");

async function getPkg() {
  return JSON.parse(await fs.readFile(PACKAGE_FILE, FS_OPTIONS));
}

const PACKAGE_FILE = "lib/package.json";
const FS_OPTIONS = { encoding: "utf-8" };

async function readPackage(pkg, context) {
  if (pkg.name.startsWith("@stekz/pulumi.project")) {
    //context.log(`Messing with ${pkg.name}`);
    const libPkg = await getPkg();
    pkg.dependencies = {
      "@stekz/pulumi.lib": "workspace:*",
      ...pkg.dependencies,
      ...libPkg.dependencies,
    };
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
