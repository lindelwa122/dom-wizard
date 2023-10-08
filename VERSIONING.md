# Versioning

1. Version formatting: X.Y.Z (1.4.7). X is the major version, Y is the minor version, and Z is the patch version. Each element MUST increase numerically. For instance: 1.9.0 -> 1.10.0 -> 1.11.0.

2. Once a versioned package has been released, the contents of that version MUST NOT be modified. Any modifications MUST be released as a new version.

3. Initially, the version was set to 1.0.0, which was incorrect. It was intended to be set to 0.0.0 instead, so version 1 should not be considered stable.

4. The public API will be defined by version 2.0.0. The way in which the version number is incremented after this release is dependent on this public API and how it changes.

5. Patch version Z (x.y.Z | x > 0) MUST be incremented if only backward compatible bug fixes are introduced. A bug fix is defined as an internal change that fixes incorrect behavior.
6. Minor version Y (x.Y.z | x > 0) MUST be incremented if new, backward compatible functionality is introduced to the public API. It MUST be incremented if any public API functionality is marked as deprecated. It MAY be incremented if substantial new functionality or improvements are introduced within the private code. It MAY include patch level changes. Patch version MUST be reset to 0 when minor version is incremented.

7. Major version X (X.y.z | X > 0) MUST be incremented if any backward incompatible changes are introduced to the public API. It MAY also include minor and patch level changes. Patch and minor versions MUST be reset to 0 when major version is incremented.

8. A pre-release version MAY be denoted by appending a hyphen and a series of dot separated identifiers immediately following the patch version. Identifiers MUST comprise only ASCII alphanumerics and hyphens [0-9A-Za-z-]. Identifiers MUST NOT be empty. Numeric identifiers MUST NOT include leading zeroes. Pre-release versions have a lower precedence than the associated normal version. A pre-release version indicates that the version is unstable and might not satisfy the intended compatibility requirements as denoted by its associated normal version. Examples: 1.0.0-alpha, 1.0.0-alpha.1, 1.0.0-0.3.7, 1.0.0-x.7.z.92, 1.0.0-x-y-z.--.

9. Precedence refers to how versions are compared to each other when ordered.

   - Precedence MUST be calculated by separating the version into major, minor, patch and pre-release identifiers in that order.
   - Precedence is determined by the first difference when comparing each of these identifiers from left to right as follows: Major, minor, and patch versions are always compared numerically.

     Example: 1.0.0 < 2.0.0 < 2.1.0 < 2.1.1.

   - When major, minor, and patch are equal, a pre-release version has lower precedence than a normal version:

     Example: 1.0.0-alpha < 1.0.0.
