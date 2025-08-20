import GLib from 'gi://GLib';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

export default class PowerOffDialogButton {

    constructor(systemMenu, label, command) {
        this._systemMenu = systemMenu;
        this._label = label;
        this._command = command;

        this._button = null;
        this._handler = null;
    }

    addButton(position) {
        if (this._button !== null)
            return;

        this._button = new PopupMenu.PopupMenuItem(this._label);
        this._handler = this._button.connect('activate', () => this._execute());

        this._systemMenu._systemItem.menu.addMenuItem(this._button, position);
    }

    _execute() {
        GLib.spawn_async(
            null,
            this._command,
            null,
            GLib.SpawnFlags.SEARCH_PATH
        );
    }

    removeButton() {
        if (this._button) {
            this._button.disconnect(this._handler);
            this._button.destroy();
        }
        this._button = null;
        this._handler = null;
    }

    destroy() {
        this.removeButton();
        this._systemMenu = null;
    }
    
}
