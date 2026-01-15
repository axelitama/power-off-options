import GLib from 'gi://GLib';
import * as LoginManager from 'resource:///org/gnome/shell/misc/loginManager.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import ScreenOffButton from './buttons/screenOffButton.js';
import HybridSleepButton from './buttons/hybridSleepButton.js';
import HibernationButton from './buttons/hibernationButton.js';
import SuspendThenHibernateButton from './buttons/suspendThenHibernateButton.js';
import SoftRebootButton from './buttons/softRebootButton.js';
import RebootToBiosButton from './buttons/rebootToBiosButton.js';
import SettingsButton from './buttons/settingsButton.js';
import CustomButton from './buttons/customButton.js';

export default class PowerOffOptions extends Extension {
    enable() {
        this._loginManager = LoginManager.getLoginManager();
        this._deferredInitId = GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            this._systemMenu = Main.panel.statusArea.quickSettings._system;
            if (!this._systemMenu) return GLib.SOURCE_CONTINUE;

            this._createBuiltInButtons();
            this._settings = this.getSettings();
            this._customButtons = [];
            this._syncAllButtons();

            this._settingsConnectionId = this._settings.connect('changed', () => this._syncAllButtons());

            this._deferredInitId = null;
            return GLib.SOURCE_REMOVE;
        });
    }

    disable() {
        if (this._deferredInitId) {
            GLib.Source.remove(this._deferredInitId);
        }
        this._deferredInitId = null;

        if (this._settingsConnectionId) {
            this._settings.disconnect(this._settingsConnectionId);
        }
        this._settingsConnectionId = null;

        this._destroyAllButtons();
        
        this._loginManager = null;
        this._systemMenu = null;
        this._settings = null;
    }

    _createBuiltInButtons() {
        this._builtInButtons = [
            {
                key: 'screenOff',
                instance: new ScreenOffButton(this._systemMenu),
                settingKey: 'show-screenoff',
                defaultPosition: 0,
                shiftDeps: [],
            },
            {
                key: 'hybridSleep',
                instance: new HybridSleepButton(this._systemMenu, this._loginManager),
                settingKey: 'show-hybrid-sleep',
                defaultPosition: 1,
                shiftDeps: ['screenOff'],
            },
            {
                key: 'suspendThenHibernate',
                instance: new SuspendThenHibernateButton(this._systemMenu, this._loginManager),
                settingKey: 'show-suspend-then-hibernate',
                defaultPosition: 1,
                shiftDeps: ['screenOff', 'hybridSleep'],
            },
            {
                key: 'hibernate',
                instance: new HibernationButton(this._systemMenu, this._loginManager),
                settingKey: 'show-hibernate',
                defaultPosition: 1,
                shiftDeps: ['screenOff', 'hybridSleep', 'suspendThenHibernate'],
            },
            {
                key: 'softReboot',
                instance: new SoftRebootButton(this._systemMenu),
                settingKey: 'show-soft-reboot',
                defaultPosition: 1,
                shiftDeps: ['screenOff', 'hybridSleep', 'suspendThenHibernate', 'hibernate'],
            },
            {
                key: 'rebootToBios',
                instance: new RebootToBiosButton(this._systemMenu),
                settingKey: 'show-reboot-to-bios',
                defaultPosition: 2,
                shiftDeps: ['screenOff', 'hybridSleep', 'suspendThenHibernate', 'hibernate', 'softReboot'],
            },
            {
                key: 'settings',
                instance: new SettingsButton(this._systemMenu),
                settingKey: 'show-settings',
                defaultPosition: 3,
                shiftDeps: ['screenOff', 'hybridSleep', 'suspendThenHibernate', 'hibernate', 'softReboot', 'rebootToBios'],
            },
        ];
    }

    _syncAllButtons() {
        this._syncBuiltInButtons();
        this._syncCustomButtons();
    }

    _syncBuiltInButtons() {
        this._builtInButtons.forEach(buttonData => {
            const isEnabled = this._settings.get_boolean(buttonData.settingKey);
            let position = buttonData.defaultPosition;

            buttonData.shiftDeps.forEach(depKey => {
                const dep = this._builtInButtons.find(b => b.key === depKey);
                if (dep && this._settings.get_boolean(dep.settingKey)) {
                    position += 1;
                }
            });

            if (isEnabled) {
                buttonData.instance.addButton(position);
            } else {
                buttonData.instance.removeButton();
            }
        });
    }

    _syncCustomButtons() {
        // Destroy old custom buttons
        if (this._customButtons) {
            this._customButtons.forEach(btn => btn.instance.destroy());
            this._customButtons = [];
        }

        try {
            const customCommands = JSON.parse(this._settings.get_string('custom-commands'));
            if (customCommands.length === 0) return;

            const enabledCommands = customCommands.filter(cmd => cmd.enabled);
            const nonZero = enabledCommands.filter(cmd => cmd.position > 0).sort((a, b) => {
                if (a.position !== b.position) return a.position - b.position;
                return a.name.localeCompare(b.name);
            });
            const zero = enabledCommands.filter(cmd => cmd.position === 0).sort((a, b) => a.name.localeCompare(b.name));

            const menu = this._systemMenu._systemItem.menu;

            nonZero.forEach(cmd => {
                const instance = new CustomButton(this._systemMenu, cmd.name, cmd.command);
                this._customButtons.push({ instance });
                instance.addButton(cmd.position - 1);
            });

            let appendPos = menu.numMenuItems;
            zero.forEach(cmd => {
                const instance = new CustomButton(this._systemMenu, cmd.name, cmd.command);
                this._customButtons.push({ instance });
                instance.addButton(appendPos++);
            });

        } catch (error) {
            console.error('[PowerOffOptions] Failed to load custom commands:', error);
        }
    }

    _destroyAllButtons() {
        if (this._builtInButtons) {
            this._builtInButtons.forEach(b => b.instance.destroy());
        }
        this._builtInButtons = null;

        if (this._customButtons) {
            this._customButtons.forEach(b => b.instance.destroy());
        }
        this._customButtons = null;
    }
}
