import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Button from './_button.js';

export default class LoginManagerButton extends Button {

    constructor(
        systemMenu,
        label,
        loginManager,
        command,
        parameters = GLib.Variant.new('(b)', [true]),
        flags = Gio.DBusCallFlags.NONE,
        timeout_msec = 0,
        cancellable = null,
        callback = null
    ) {
        super(systemMenu, label);

        this._loginManager = loginManager;
        this._command = command;
        this._parameters = parameters;
        this._flags = flags;
        this._timeout_msec = timeout_msec;
        this._cancellable = cancellable;
        this._callback = callback;
    }

    _execute() {
        if (!this._loginManager._proxy) {
            throw new Error('No D-Bus proxy available');
            // return;
        }

        this._loginManager._proxy.call(
            this._command,
            this._parameters,
            this._flags,
            this._timeout_msec,
            this._cancellable,
            this._callback,
        );
    }

    destroy() {
        super.destroy();
        this._loginManager = null;
        this._command = null;
        this._parameters = null;
        this._flags = null;
        this._timeout_msec = null;
        this._cancellable = null;
        this._callback = null;
    }

}
