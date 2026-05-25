# Changelog

## [Unreleased]

### Added
- **Live Countdown Timer:** Added a dynamic countdown overlay using `countdown.png` on the landing page targeting May 26, 2026, at midnight. The timer automatically hides itself once the deadline is reached.
- **Local Video Playback:** Switched from a YouTube iframe embed to a local HTML5 `<video>` for `/videos/Persona_5_Royal_Intro.mp4`, ensuring true full-screen scaling and seamless playback without external branding.
- **3D Joker Mask Intro:** Implemented a smooth 2.5-second `card-intro` 3D rotation animation on the initial page load, showcasing a subtle Joker Mask background image.
- **Cinematic Video Transition:** Engineered a dramatic multi-stage full-screen transition. The main card now scales up (`scale-125`), blurs heavily, and fades out into a deep red gradient background before the video mounts.
- **Calling Card "Slap" Animation:** Replaced generic fade-ins with a custom, high-impact `slap` keyframe animation for the birthday message card to mimic the game's aggressive UI style.

### Changed
- **Animation Timings:** Extended the reading time for the birthday message by increasing the transition delay to ~3.5 seconds after the signature drops.
- **Landing Page Button Styling:** Removed the exclamation mark circle and hover pulse effects from the "READ ME" button to keep the focus entirely on the Joker Mask.
- **Background Effects:** Removed the `animate-pulse` effect from the background stars to reduce visual noise and prevent them from overlapping or distracting from the main calling cards.

### Fixed
- **3D Animation Rendering:** Migrated the custom 3D rotation keyframes from arbitrary Tailwind classes to standard inline React styling to prevent the compiler from dropping the animation.