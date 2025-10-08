import {Extension, gettext as _, ngettext, pgettext} from 'resource:///org/gnome/shell/extensions/extension.js';
import CmdAsyncButton from './_cmdAsyncButton.js';

export default class SoftRebootButton extends CmdAsyncButton {

    constructor(systemMenu) {
        super(systemMenu, _('Restart user space (Soft Reboot)'), ['systemctl', 'soft-reboot']);
    }

}
