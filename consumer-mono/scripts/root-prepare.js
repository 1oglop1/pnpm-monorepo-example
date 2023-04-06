/**
 * Update pulumi version in .gitlab-ci.yaml file from the lib/package.json
 */

const fs = require("fs");

const PACKAGE_FILE = "lib/package.json";
const FS_OPTIONS = { encoding: "utf-8" };

const command = process.env["npm_command"];
const EVENT = process.env["npm_lifecycle_event"];

switch (EVENT) {
  // case 'prepublishOnly': {
  //   main()
  //   break;
  // }
  // case 'postversion': {
  //   postversion()
  //   break;
  // }
  case [
    // 'postversion',
    // 'version',
    // 'prepublishOnly',
    // "prepublish",
    "prepare",
  ].find((e) => e === EVENT): {
    main();
    break;
  }
  default:
    break;
}

function getPkg() {
  return JSON.parse(fs.readFileSync(PACKAGE_FILE, FS_OPTIONS));
}

function writePkg(pkg) {
  console.log("----writing------>", pkg.publishConfig.tag);
  fs.writeFileSync(PACKAGE_FILE, JSON.stringify(pkg, undefined, 2));
}

function main() {
  const pkg = getPkg();

  const pulumi = pkg.dependencies["@pulumi/pulumi"];
  pkg.publishConfig.tag = `${pkg.version}+pulumi-${pulumi}`;
  const re = /(PULUMI_VERSION: )(.+)/;
  // PULUMI_VERSION: 3.47.1
  const ci = fs.readFileSync(".gitlab-ci.yml", FS_OPTIONS);
  const updatedCi = ci.replace(re, `$1${pulumi}`);
  // console.log()

  fs.writeFileSync(".gitlab-ci.yml", updatedCi);
}
