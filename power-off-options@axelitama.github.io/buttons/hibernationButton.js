import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class HibernationButton extends PowerOffDialogButton {

    constructor(systemMenu, loginManager) {
        super(systemMenu, 'Hibernate');
        this._loginManager = loginManager;
    }

    _execute() {
        if (!this._loginManager._proxy) {
            throw new Error('No D-Bus proxy available');
            // return;
        }

        this._loginManager._proxy.call(
            'Hibernate',
            GLib.Variant.new('(b)', [true]),
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            null
        );
    }

}
