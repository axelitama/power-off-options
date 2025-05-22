import GLib from 'gi://GLib';
import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as LoginManager from 'resource:///org/gnome/shell/misc/loginManager.js';
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
        this._initDeferredId = GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            this._systemMenu = Main.panel.statusArea.quickSettings._system;
            this._loginManager = LoginManager.getLoginManager();
            this._settings = this.getSettings();
            if(!this._systemMenu || !this._loginManager || !this._settings)
                return GLib.SOURCE_CONTINUE;

            this._screenOffButton = new ScreenOffButton(this._systemMenu);
            this._hibernationButton = new HibernationButton(this._systemMenu);

            this._syncSettings();
            this._settingsConnectionId = this._settings.connect('changed', () => this._syncSettings());

            this._initDeferredId = null;
            return GLib.SOURCE_REMOVE;
        })
    }

    disable() {
        if(this._initDeferredId) {
            GLib.Source.remove(this._initDeferredId);
            this._initDeferredId = null;
        }

        if(this._settingsConnectionId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsConnectionId = null;
        }

        this._screenOffButton?.destroy();
        this._hibernationButton?.destroy();

        this._systemMenu = null;
        this._loginManager = null;
        this._settings = null;
        this._hibernationButton = null;
        this._screenOffButton = null;
    }

}
