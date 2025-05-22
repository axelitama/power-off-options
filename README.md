# Power Off Options

Power Off Options is a GNOME Shell extension that adds two additional buttons to the system's power menu:

- **Turn Off Screen** — Instantly powers off the monitor.
- **Hibernate** — Suspends the system to disk using `systemctl hibernate`.

These buttons are integrated into the GNOME system menu, making them easy to access without extra steps or commands.

![screenshot](resources/screenshot.png)

## Features

- Toggle display of "Turn Off Screen" and "Hibernate" buttons independently.
- Simple and lightweight.
- Settings integrated via GNOME Extensions preferences.

## Requirements

- GNOME Shell (compatible with GNOME 44+)
- Your system must support `xset` and `systemctl hibernate`.

> **Note**: Ensure that hibernation is enabled and configured on your system.

## Installation

1. Download or clone this repository;
2. move into the extension directory;
3. type `make` to install or `make uninstall` to uninstall the extension;
4. restart GNOME Shell to apply the changes (e.g. log out and log back in).



