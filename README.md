# Gif Convert

Convert video files to GIFs with just a few clicks.

**Run in your browser [here](https://gifconvert.com)**

**Download the macOS app [here](https://github.com/trybick/gifconvert/releases)**

<!-- ADD IMAGE -->
<p align="center">
  <img src="https://user-images.githubusercontent.com/39889198/103387935-7d430b00-4ad4-11eb-844a-47d2262c476b.gif" alt="app screenshot" width="450px">
</p>

## Features

- Fast conversion using WebAssembly ffmpeg
- Drag n' drop capable
- Multiple quality modes

## macOS App Installation

You can use the app in your web browser **[here](https://gifconvert.com)** or follow these instructions to install the app for macOS:

- Click **[download link](https://github.com/trybick/gifconvert/releases)** and download the `dmg` file
- Open the `dmg` file and drag Gif Convert to _Applications_
- Open Gif Convert
- **Click 'Cancel' on the security warning that appears**
- Go to _System Preferences --> Security & Privacy_ and click 'Open Anyway'

## How to Use

- Click 'Select File' or drop a file anywhere in the window
- The conversion to GIF will begin automatically
- Click 'Download GIF'
- Repeat!

## Technologies

This is an `electron` app with a `create-react-app` and running inside it. `chakra-ui` is being used for styling and everything is written in `typescript`.

Also including:

- `react-dropzone` for drag n' drop
- `recoil` for state management
- `ffmpeg` (WASM version) for video conversion

## Local Development

To run the application locally:

```terminal
yarn                # install packages
yarn electron:dev   # start electron app
yarn browser:start  # start browser-only mode
```
