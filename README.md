# Gif Convert

Convert video files to GIFs with just a few clicks.

<!-- ADD IMAGE -->
<p align="center">
  <img src="https://user-images.githubusercontent.com/39889198/103387935-7d430b00-4ad4-11eb-844a-47d2262c476b.gif" alt="app screenshot" width="500px">
</p>

## Features

- Supports macOS desktop
- Fast conversion using WebAssembly ffmpeg
- Drag n' drop capable
- Lives in the menu bar/tray
- Multiple quality modes

## Download & Installation

- Click **[download link](https://drive.google.com/drive/folders/1zjXSYnS3oQuC_QNdmfFgwpM21LPnaus5?usp=sharing)** and download the app
- Open the `dmg` file and drag Gif Convert to _Applications_
- Open Gif Convert
- **Click 'Cancel' on the security warning that appears**
- Go to _System Preferences --> Security & Privacy_ and click 'Open Anyway'

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
