import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';



export default class ExamplePreferences extends ExtensionPreferences {

    fillPreferencesWindow(window) {
        // Create a preferences page, with a single group
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);
    
        const group = new Adw.PreferencesGroup({
            title: _('Power Off Options'),
            description: _('Choose which options to show in the Power Off dialog'),
        });
        page.add(group);

        // Create a new preferences row for 'show-screenoff'
        const screenOffRow = new Adw.SwitchRow({
            title: _('Show Screen Off'),
            subtitle: _('Whether to show the screen off button. \n <b>Note:</b> this function only works in X11, Wayland is not supported.'),
        });
        group.add(screenOffRow);
    
        // Create a new preferences row for 'show-hibernate'
        const hibernateRow = new Adw.SwitchRow({
            title: _('Show Hibernate'),
            subtitle: _('Whether to show the hibernate button'),
        });
        group.add(hibernateRow);
    
        // Create a settings object and bind the rows to the corresponding keys
        window._settings = this.getSettings();
        window._settings.bind('show-hibernate', hibernateRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-screenoff', screenOffRow, 'active', Gio.SettingsBindFlags.DEFAULT);
    }

}
