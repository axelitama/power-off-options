import GLib from 'gi://GLib';

import Button from './_button.js';

export default class CmdAsyncButton extends Button {

    constructor(
        systemMenu,
        label,
        command,
        workingDir = null,
        env = null,
        flags = GLib.SpawnFlags.SEARCH_PATH,
        setup = null,
        user_data = null
    ) {
        super(systemMenu, label);
        
        this._command = command;
        this._workingDir = workingDir;
        this._env = env;
        this._flags = flags;
        this._setup = setup;
        this._user_data = user_data;
    }

    _execute() {
        GLib.spawn_async(
            this._workingDir,
            this._command,
            this._env,
            this._flags,
            this._setup,
            this._user_data
        );
    }

    destroy() {
        super.destroy();
        this._command = null;
        this._workingDir = null;
        this._env = null;
        this._flags = null;
        this._setup = null;
        this._user_data = null;
    }

}
