# Tray Gif

Convert video files to GIFs with just a few clicks.

<!-- ADD IMAGE -->
<!-- <p align="center">
  <img src="" alt="app screenshot">
</p> -->

## Features

- Supports macOS desktop
- Fast conversion using WebAssembly ffmpeg
- Drag n' drop capable
- Lives in the menu bar/tray
- 'Low quality' mode for larger files

## How to Use

- Click 'Select File' or drop a file anywhere in the window
- The conversion to GIF will begin automatically
- Click 'Download GIF' and choose where to save it
- Repeat!

## Technologies

This is an `electron` app with a `create-react-app` running inside it. `chakra-ui` is being used as a component library and for styling and it's all `typescript`!

Also including:

- `react-dropzone` for drag n' drop
- `recoil` for state management
- `ffmpeg` (WASM version) for video conversion

## Local Development

To run the application locally:

```terminal
yarn
yarn electron:dev
```
