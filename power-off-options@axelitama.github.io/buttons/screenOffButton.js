import {Extension, gettext as _, ngettext, pgettext} from 'resource:///org/gnome/shell/extensions/extension.js';
import CmdAsyncButton from './_cmdAsyncButton.js';

export default class ScreenOffButton extends CmdAsyncButton {

    constructor(systemMenu) {
        super(systemMenu, _('Turn Off Screen'), ['xset', 'dpms', 'force', 'off']);
    }

}
