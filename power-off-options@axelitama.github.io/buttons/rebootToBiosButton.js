import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class RebootToBiosButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Restart to BIOS');
    }

    _execute() {
        GLib.spawn_async(
            null,
            ['systemctl', 'reboot', '--firmware-setup'],
            null,
            GLib.SpawnFlags.SEARCH_PATH
        );
    }

}
