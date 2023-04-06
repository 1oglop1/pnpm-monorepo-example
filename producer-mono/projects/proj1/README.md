# Project which depends on lib

```json5
{
  "name": "@myorg/pulumi.project.proj1",
  "private": true,
  "version": "1.1.42",
  // dependencies specific to the project
  "dependencies": {
    "@pulumi/gitlab": "^4.9.0"
  }
  // pnpmjs file injects dependecies from @myorg/lib so that result is
  //
//  "dependencies": {
//    "@pulumi/gitlab": "^4.9.0",
//      deps below should to be exactly same as lib, especially  @pulumi/pulumi is the most important
//    "@pulumi/aws": "^5.3.0",
//    "@pulumi/awsx": "^1.0.0-beta.9",
//    "@pulumi/pulumi": "3.47.0"  
//  }
}

```
