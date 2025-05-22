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
        this._initDeferredId = imports.mainloop.idle_add( () => {
            this._systemMenu = Main.panel.statusArea.quickSettings._system;
            this._loginManager = LoginManager.getLoginManager();
            this._settings = this.getSettings();
            if(!this._systemMenu || !this._loginManager || !this._settings)
                return true;

            this._screenOffButton = new ScreenOffButton(this._systemMenu);
            this._hibernationButton = new HibernationButton(this._systemMenu, this._loginManager);

            this._syncSettings();
            this.settingsConnectionId = this._settings.connect('changed', () => this._syncSettings());

            this._initDeferredId = null;
            return false;
        })
    }

    disable() {
        if(this._initDeferredId) {
            Mainloop.source_remove(this._initDeferredId);
            this._initDeferredId = null;
        }

        if(this.settingsConnectionId) {
            this._settings.disconnect(this._settingsChangedId);
            this.settingsConnectionId = null;
        }

        this._systemMenu = null;
        this._loginManager = null;
        this._settings = null;
        this._screenOffButton.removeButton();
        this._hibernationButton.removeButton();
    }

}
