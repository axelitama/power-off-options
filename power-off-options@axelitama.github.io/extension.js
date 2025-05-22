import GLib from 'gi://GLib';
import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';



import HibernationButton from './hibernationButton.js';
import ScreenOffButton from './screenOffButton.js';


export default class PowerOffOptions extends Extension {

    _syncSettings() {
        if (this._settings.get_boolean('show-screenoff')) {
            this._screenOffButton.addButton(0);
            if (this._settings.get_boolean('show-hibernate')) {
                this._hibernationButton.addButton(2);
            } else {
                this._hibernationButton.removeButton();
            }
        } else {
            this._screenOffButton.removeButton();
            if (this._settings.get_boolean('show-hibernate')) {
                this._hibernationButton.addButton(1);
            } else {
                this._hibernationButton.removeButton();
            }
        }
    }

    enable() {
        this._deferredInitId = GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            this._systemMenu = Main.panel.statusArea.quickSettings._system;
            if(!this._systemMenu)
                return GLib.SOURCE_CONTINUE;

            this._screenOffButton = new ScreenOffButton(this._systemMenu);
            this._hibernationButton = new HibernationButton(this._systemMenu);

            this._settings = this.getSettings();
            this._syncSettings();
            this._settingsConnectionId = this._settings.connect('changed', () => this._syncSettings());

            this._deferredInitId = null;
            return GLib.SOURCE_REMOVE;
        });
    }

    disable() {
        if(this._deferredInitId) {
            GLib.Source.remove(this._deferredInitId);
            this._deferredInitId = null;
        }

        if(this._settingsConnectionId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsConnectionId = null;
        }

        this._screenOffButton?.destroy();
        this._hibernationButton?.destroy();

        this._systemMenu = null;
        this._settings = null;
        this._hibernationButton = null;
        this._screenOffButton = null;
    }

}
