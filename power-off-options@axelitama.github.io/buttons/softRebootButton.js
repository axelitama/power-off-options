import CmdAsyncButton from './_cmdAsyncButton.js';

export default class SoftRebootButton extends CmdAsyncButton {

    constructor(systemMenu) {
        super(systemMenu, 'Restart user space (Soft Reboot)', ['systemctl', 'soft-reboot']);
    }

}
