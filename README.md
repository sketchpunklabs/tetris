# KayKit Halloween Scene Challenge

[![twitter](https://img.shields.io/badge/Twitter-profile-blue?style=flat-square&logo=twitter)](https://twitter.com/SketchpunkLabs)
[![mastodon](https://img.shields.io/badge/Mastodon-profile-blue?style=flat-square&logo=mastodon)](https://mastodon.gamedev.place/@sketchpunk)
[![bluesky](https://img.shields.io/badge/Bluesky-profile-blue?style=flat-square&logo=threads)](https://bsky.app/profile/sketchpunk.bsky.social)
[![bluesky](https://img.shields.io/badge/Threads-profile-blue?style=flat-square&logo=threads)](https://www.threads.net/@sketchpunklabs)


[![youtube](https://img.shields.io/badge/Youtube-subscribe-red?style=flat-square&logo=youtube)](https://youtube.com/c/sketchpunklabs)
[![github](https://img.shields.io/badge/Sponsor-donate-red?style=flat-square&logo=github)](https://github.com/sponsors/sketchpunklabs)
[![Patreon](https://img.shields.io/badge/Patreon-donate-red?style=flat-square&logo=youtube)](https://www.patreon.com/sketchpunk)

<br><img align='center' src="images/halloween.gif" />

Live Demo: https://sketchpunklabs.github.io/kaykit_halloween/

Assets Uses 
- https://kaylousberg.itch.io/halloween-bits
- https://kaylousberg.itch.io/kaykit-dungeon-remastered
- https://kaylousberg.itch.io/kaykit-skeletons
- https://kaylousberg.itch.io/kaykit-spooktober

### TL;DR ###
Welcome to the the Halloween Scene Challenge. The goal is to take the threejs starter project & fix it up how you see fit to get it nice & creepy. Since the project is built to be easily hosted as a github page without any build steps, it becomes super easy to get it online for anyone to experience your creation.

To make it easy to find your creation, how about tagging your social posts with **#threejshalloween**. After halloween is over, I'll try to find as many awesome ones I can & link them here.

### Ideas for fun additions ###
- Skybox with stars & moon
- Adding spooky lighting
- Add bats to the scene & have them fly around
- Volumetric fog
- Music synced animation of some kind, like a zombie dance

### Development Setup ###
```
git clone --depth=1 https://github.com/sketchpunklabs/kaykit_halloween
cd kaykit_halloween
npm install
npm run dev
```

### Documentation ###

- GridMap is an object made to manage dynamic instancing of 3D models while placing them properly on a grid.

- AssetLibrary just manages bulk downloading of most the assets we need for the scene

- useThreeWebGL2 is nicely wrapped ThreeJS boiler plate.

- usePostEffects modifies the output of useThreeWebGL2 with the boiler plate additions to render the scene using post processing. Bloom example is in the App code but turned off by default.

- FrameTaskQueue allows you to setup bits of code that will run before a frame is rendered. They can be long running tasks like animations or one time executions. This starter uses it to animate our lil skeleton friend.

- RandomLCG is a seeded random number generator, currently not being used but might be useful to anyone who wants to be creative.

- assets.json, lists all the assets that will be loaded by AssetLibrary

- grid.json, handles instancing & placement of assets from the library in the scene 