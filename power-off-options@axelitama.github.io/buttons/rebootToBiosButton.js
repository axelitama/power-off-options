import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class RebootToBiosButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Restart to BIOS', ['systemctl', 'reboot', '--firmware-setup']);
    }

}
