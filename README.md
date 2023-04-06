# PNPM example

- producer-mono - repository where `@myorg/pulumi.lib` is developed together with some projects
- consumer-mono - repository where `@myorg/pulumi.lib` is consumed 

We need to ensure following: 

* projects inside `producer-mono` must import `@myorg/pulumi.lib`
* projects inside `producer-mono` can import `@pulumi/pulumi`, `@pulumi/aws` with the version specified by `@myorg/pulumi.lib`
* projects inside `consumer-mono` must import `@myorg/pulumi.lib`
* projects inside `consumer-mono` can import `@pulumi/pulumi`, `@pulumi/aws` with the version specified by `@myorg/pulumi.lib` 
