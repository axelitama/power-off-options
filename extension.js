import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Gio from 'gi://Gio';
import * as GLib from 'gi://GLib';
import St from 'gi://St';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

import * as LoginManager from 'resource:///org/gnome/shell/misc/loginManager.js';
import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import ScreenOffButton from './screenOffButton.js';
import HibernationButton from './hibernationButton.js';


export default class PowerOffOptions extends Extension {

    _init() {
        if(this._systemMenu == null || this._systemMenu == undefined)
            this._systemMenu = Main.panel.statusArea.quickSettings._system;
        if(this._loginManager == null || this._loginManager == undefined)
            this._loginManager = LoginManager.getLoginManager();

        if(this._screenOffButton == null || this._screenOffButton == undefined)
            this._screenOffButton = new ScreenOffButton(this._systemMenu);
        if(this._hibernationButton == null || this._hibernationButton == undefined)
            this._hibernationButton = new HibernationButton(this._systemMenu, this._loginManager);
        if(this._settings == null || this._settings == undefined)
            this._settings = this.getSettings();
    }

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
        this._init();
        this._syncSettings();
        this._settings.connect('changed', () => this._syncSettings() );
        Main.extensionManager.enableExtension('poweroffoptions@axel');
    }
    

    disable() {
        this._settings = null;
        this._screenOffButton.removeButton();
        this._hibernationButton.removeButton();
        Main.extensionManager.disableExtension('poweroffoptions@axel');
    }

}
