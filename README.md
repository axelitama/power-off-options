# Power Off Options

Power Off Options is a GNOME Shell extension that adds two additional buttons to the system's power menu:

- **Turn Off Screen** — Instantly powers off the monitor.
- **Hibernate** — Suspends the system to disk.

![screenshot](resources/screenshot.png)

## Requirements

- GNOME Shell (compatible with GNOME 44+)
- Your system must support `xset` and `systemctl hibernate`.

**Note**: Ensure that hibernation is enabled and configured on your system.

## Installation

1. Download or clone this repository;
2. move into the extension directory;
3. run:
    - `make` to install the extension;
    - `make uninstall` to uninstall the extension;
4. restart GNOME Shell to apply the changes (e.g. log out and log back in).

## Preferences

You can enable or disable each button individually using the built-in preferences window:

```bash
gnome-extensions prefs power-off-options@axelitama.github.io
```

The same window is also accessible from the **GNOME Extensions** application.
