import { gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import CmdAsyncButton from './_cmdAsyncButton.js';

export default class SettingsButton extends CmdAsyncButton {
    constructor(systemMenu) {
        const uuid = "power-off-options@axelitama.github.io";
        const argv = ['gnome-extensions', 'prefs', uuid];
        super(systemMenu, '☰ ' + _('Customize this menu'), argv);
    }
}
