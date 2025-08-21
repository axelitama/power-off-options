import CmdAsyncButton from './_cmdAsyncButton.js';

export default class RebootToBiosButton extends CmdAsyncButton {

    constructor(systemMenu) {
        super(systemMenu, 'Restart to BIOS', ['systemctl', 'reboot', '--firmware-setup']);
    }

}
