/**
 * Set npm dist tag so dependent including pulumi version
 * @stekz/pulumi
 */

const fs = require("fs");

const PACKAGE_FILE = "package.json";
const BACKUP_FILE = `BAK_${PACKAGE_FILE}`;
const FS_OPTIONS = { encoding: "utf-8" };

const command = process.env["npm_command"];
const EVENT = process.env["npm_lifecycle_event"];

switch (EVENT) {
  case "prepublishOnly": {
    main();
    break;
  }
  // case [
  //   'postversion',
  //   'version',
  //   'prepublishOnly',
  //   "prepublish",
  //   'prepare'
  // ].find(e=>e===EVENT): {
  //   version()
  //   break;
  // }
  default:
    break;
}

function getPkg() {
  return JSON.parse(fs.readFileSync(PACKAGE_FILE, FS_OPTIONS));
}

function writePkg(pkg) {
  fs.writeFileSync(PACKAGE_FILE, JSON.stringify(pkg, undefined, 2));
}

function main() {
  const pkg = getPkg();
  const pulumi = pkg.dependencies["@pulumi/pulumi"];
  pkg.publishConfig.tag = `${pkg.version}+pulumi-${pulumi}`;
  writePkg(pkg);
}
