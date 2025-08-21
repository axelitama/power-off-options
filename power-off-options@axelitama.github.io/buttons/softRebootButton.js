import GLib from 'gi://GLib';

import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class SoftRebootButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Restart user space (Soft Reboot)');
    }

    _execute() {
        GLib.spawn_async(
            null,
            ['systemctl', 'soft-reboot'],
            null,
            GLib.SpawnFlags.SEARCH_PATH
        );
    }

}
