import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class SoftRebootButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Restart user space (Soft Reboot)', ['systemctl', 'soft-reboot']);
    }

}
