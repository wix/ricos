---
id: release_instructions
title: Release Instructions
sidebar_label: Release Instructions
---

**Note**: this doc is relevant to ricos team only

_In both cases make sure your starting point is on latest master_

## Normal version:
* update the changelog - add a new version with the unreleased
* `npm run createVersion` and follow script instruction (this should push to github, double check by running `git push` after this command)
* The release will start automatically. Go to [Github actions](https://github.com/wix/ricos/actions?query=workflow%3Arelease) to see that it passed without errors.
* post to #rich-content-dev and #rich-content slack channels
* Move asana tickets from merged to complete

## Alpha version:
Same as normal version, except changes should not be merged to `master` but to a `release-v<current major>.<current minor>.<current patch>-alpha` branch.

## Semantic Versioning
> Choose the right version number:
> - MAJOR version when you make incompatible API changes, 
> - MINOR version when you add functionality in a backwards compatible manner, and 
> - PATCH version when you make backwards compatible bug fixes. 

## Hotfix version:
1. After updating master w/ changelog (including hotfix changelog in the right version), checkout `version-7`
2. `git cherry-pick {md5-of-hotfix-from-master}`
3. update the changelog with the new version and commit
4. `npm run createVersion` and follow script instruction (this should push to github)
5. The release will start automatically. Go to [Github actions](https://github.com/wix/ricos/actions?query=workflow%3Arelease) to see that it passed without errors.
6. `git checkout master`
7. update the changelog in the master. (either git cherry-pick {md5-of-commit-from-step-3}  or update manually)
8. post to #rich-content-dev and #rich-content slack channels
