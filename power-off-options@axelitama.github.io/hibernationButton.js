import GLib from 'gi://GLib';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';



export default class HibernationButton {
    
    constructor(systemMenu) {
        this._button = null;
        this._handler = null;
        this._systemMenu = systemMenu;
    }

    addButton(position) {
        if(this._button != null || this._button != undefined)
            return;
        this._button = new PopupMenu.PopupMenuItem('Hibernate');
        this._handler = this._button.connect(
            'activate',
            () => this._execute()
        );

        this._systemMenu._systemItem.menu.addMenuItem(
            this._button,
            position
        );
    }

    _execute() {
        GLib.spawn_command_line_async('systemctl hibernate');
    }

    removeButton() {
        if(this._button) {
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
