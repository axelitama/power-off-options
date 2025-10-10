import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
import {CustomCommandsManager} from './customButtonsManager.js';

export default class ExamplePreferences extends ExtensionPreferences {

    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        // Preferences page
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        // Group for power options
        const group = new Adw.PreferencesGroup({
            title: _('Power Off Options'),
            description: _(
                'Choose which options to show in the Power Off dialog.\n\n' +
                '<b>Note:</b> The "Turn Off Screen" function only works in X11; Wayland is not supported.\n' +
                '<b>Note:</b> Hibernation, Hybrid Sleep and Reboot related options make use of \'systemctl\' respective commands and must be enabled and configured in your system to work properly.\n'
            ),
        });
        page.add(group);

        // Rows with simple descriptions
        const screenOffRow = new Adw.SwitchRow({
            title: _('Turn Screen Off'),
            subtitle: _('Immediately turn off the monitor/display.'),
        });
        group.add(screenOffRow);

        const hybridSleepRow = new Adw.SwitchRow({
            title: _('Hybrid Sleep'),
            subtitle: _('Suspend to RAM and also save system state to disk (safe on power loss).'),
        });
        group.add(hybridSleepRow);

        const suspendThenHibernateRow = new Adw.SwitchRow({
            title: _('Suspend Then Hibernate'),
            subtitle: _('Suspend the system and automatically hibernate after a timeout.'),
        });
        group.add(suspendThenHibernateRow);

        const hibernateRow = new Adw.SwitchRow({
            title: _('Hibernate'),
            subtitle: _('Save system state to disk and power off (slower to resume than suspend).'),
        });
        group.add(hibernateRow);

        const softRebootRow = new Adw.SwitchRow({
            title: _('Restart user space (Soft Reboot)'),
            subtitle: _('Restart the user space without rebooting the entire system.'),
        });
        group.add(softRebootRow);

        const rebootToBiosRow = new Adw.SwitchRow({
            title: _('Restart To BIOS'),
            subtitle: _('Reboot directly into the system firmware/BIOS setup.'),
        });
        group.add(rebootToBiosRow);

        // Bind settings
        settings.bind('show-screenoff', screenOffRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        settings.bind('show-hybrid-sleep', hybridSleepRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        settings.bind('show-suspend-then-hibernate', suspendThenHibernateRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        settings.bind('show-hibernate', hibernateRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        settings.bind('show-soft-reboot', softRebootRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        settings.bind('show-reboot-to-bios', rebootToBiosRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        
        const customCommandsGroup = new CustomCommandsManager(settings);
        page.add(customCommandsGroup);
    }

}
