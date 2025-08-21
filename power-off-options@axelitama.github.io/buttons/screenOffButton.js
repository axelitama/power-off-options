import GLib from 'gi://GLib';

import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class ScreenOffButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Turn Off Screen');
    }

    _execute() {
        GLib.spawn_async(
            null,
            ['xset', 'dpms', 'force', 'off'],
            null,
            GLib.SpawnFlags.SEARCH_PATH
        );
    }

}
