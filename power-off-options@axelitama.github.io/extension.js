import GLib from 'gi://GLib';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import ScreenOffButton from './buttons/screenOffButton.js';
import HybridSleepButton from './buttons/hybridSleepButton.js';
import HibernationButton from './buttons/hibernationButton.js';
import SuspendThenHibernateButton from './buttons/suspendThenHibernateButton.js';
import SoftRebootButton from './buttons/softRebootButton.js';
import RebootToBiosButton from './buttons/rebootToBiosButton.js';



export default class PowerOffOptions extends Extension {

    _syncSettings() {
        for (const [name, {instance, setting, defaultPosition, shiftIf}] of Object.entries(this._buttons)) {
            const enabled = this._settings.get_boolean(setting);

            if (enabled) {
                // base position
                let position = defaultPosition;

                // shift position if dependencies are enabled
                for (const dep of shiftIf) {
                    if (this._settings.get_boolean(this._buttons[dep].setting))
                        position += 1;
                }
                
                instance.addButton(position);
            } else {
                instance.removeButton();
            }
        }
    }

    enable() {
        this._deferredInitId = GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            this._systemMenu = Main.panel.statusArea.quickSettings._system;
            if (!this._systemMenu)
                return GLib.SOURCE_CONTINUE;

            // Centralised button registry with positions + dependencies
            this._buttons = {
                screenoff: {
                    instance: new ScreenOffButton(this._systemMenu),
                    setting: 'show-screenoff',
                    defaultPosition: 0,
                    shiftIf: [],
                },
                hybridSleep: {
                    instance: new HybridSleepButton(this._systemMenu),
                    setting: 'show-hybrid-sleep',
                    defaultPosition: 1,
                    shiftIf: ['screenoff'],
                },
                suspendThenHibernate: {
                    instance: new SuspendThenHibernateButton(this._systemMenu),
                    setting: 'show-suspend-then-hibernate',
                    defaultPosition: 1,
                    shiftIf: ['screenoff', 'hybridSleep'],
                },
                hibernate: {
                    instance: new HibernationButton(this._systemMenu),
                    setting: 'show-hibernate',
                    defaultPosition: 1,
                    shiftIf: ['screenoff', 'hybridSleep', 'suspendThenHibernate'],
                },
                softReboot: {
                    instance: new SoftRebootButton(this._systemMenu),
                    setting: 'show-soft-reboot',
                    defaultPosition: 1,
                    shiftIf: ['screenoff', 'hybridSleep', 'suspendThenHibernate', 'hibernate'],
                },
                rebootToBios: {
                    instance: new RebootToBiosButton(this._systemMenu),
                    setting: 'show-reboot-to-bios',
                    defaultPosition: 2,
                    shiftIf: ['screenoff', 'hybridSleep', 'suspendThenHibernate', 'hibernate', 'softReboot'],
                },
            };

            this._settings = this.getSettings();
            this._syncSettings();

            this._settingsConnectionId = this._settings.connect(
                'changed',
                () => this._syncSettings()
            );

            this._deferredInitId = null;
            return GLib.SOURCE_REMOVE;
        });
    }

    disable() {
        if (this._deferredInitId) {
            GLib.Source.remove(this._deferredInitId);
            this._deferredInitId = null;
        }

        if (this._settingsConnectionId) {
            this._settings.disconnect(this._settingsConnectionId);
            this._settingsConnectionId = null;
        }

        if (this._buttons) {
            for (const {instance} of Object.values(this._buttons))
                instance.destroy();
            this._buttons = null;
        }

        this._systemMenu = null;
        this._settings = null;
    }

}
