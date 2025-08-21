import Gio from 'gi://Gio';
import GLib from 'gi://GLib';

import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class HybridSleepButton extends PowerOffDialogButton {

    constructor(systemMenu, loginManager) {
        super(systemMenu, 'Hybrid Sleep');
        this._loginManager = loginManager;
    }

    _execute() {
        if(!this._loginManager._proxy) {
            return;
        }

        this._loginManager._proxy.call(
            'HybridSleep',
            GLib.Variant.new('(b)', [true]),
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            null
        );
    }
    
}
