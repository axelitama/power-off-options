import Gio from 'gi://Gio';
import GLib from 'gi://GLib';

import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class SuspendThenHibernateButton extends PowerOffDialogButton {

    constructor(systemMenu, loginManager) {
        super(systemMenu, 'Suspend then Hibernate');
        this._loginManager = loginManager;
    }


    _execute() {
        if (!this._loginManager._proxy) {
            return;
        }

        this._loginManager._proxy.call(
            'SuspendThenHibernate',
            GLib.Variant.new('(b)', [true]),
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            null
        );
    }

}
