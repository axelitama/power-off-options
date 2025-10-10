import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import GObject from 'gi://GObject';
import { gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export const CustomCommandsManager = GObject.registerClass(
class CustomCommandsManager extends Adw.PreferencesGroup {
    _init(settings) {
        super._init({
            title: _('Custom Commands'),
            description: _('Manage your custom entries for the power menu.'),
        });

        this._settings = settings;
        this._stack = new Gtk.Stack({ transition_type: Gtk.StackTransitionType.SLIDE_LEFT_RIGHT });
        this.add(this._stack);

        this._stack.add_named(this._createListView(), 'list');
        this._stack.add_named(this._createEditorView(), 'editor');

        this._loadCommands();
    }

    _getCommands() {
        try {
            return JSON.parse(this._settings.get_string('custom-commands'));
        } catch (e) {
            console.error(`[PowerOffOptions] Error parsing custom commands: ${e}`);
            return [];
        }
    }

    _saveCommands(commands) {
        this._settings.set_string('custom-commands', JSON.stringify(commands, null, 2));
    }

    _createListView() {
        const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
        this._commandListBox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
        box.append(this._commandListBox);

        const addButton = new Gtk.Button({
            label: _('Add New Command...'),
            halign: Gtk.Align.CENTER,
            css_classes: ['flat'],
            margin_top: 10,
        });
        addButton.connect('clicked', () => this._showEditor());
        box.append(addButton);

        return box;
    }

    _loadCommands() {
        let child = this._commandListBox.get_first_child();
        while (child) {
            const next = child.get_next_sibling();
            this._commandListBox.remove(child);
            child = next;
        }
        this._getCommands().forEach(cmd => this._commandListBox.append(this._createCommandRow(cmd)));
    }

    _createCommandRow(command) {
        const positionText = command.position === 0
            ? _('at the end')
            : _('Position %d').format(command.position);
        const row = new Adw.ActionRow({
            title: command.name,
            subtitle: `${command.command} (${positionText})`,
        });

        const toggle = new Gtk.Switch({ active: command.enabled, valign: Gtk.Align.CENTER });
        toggle.connect('state-set', (_, state) => {
            const commands = this._getCommands();
            const target = commands.find(c => c.id === command.id);
            if (target) {
                target.enabled = state;
                this._saveCommands(commands);
            }
        });
        row.add_suffix(toggle);

        const editButton = new Gtk.Button({ icon_name: 'document-edit-symbolic', valign: Gtk.Align.CENTER });
        editButton.connect('clicked', () => this._showEditor(command));
        row.add_suffix(editButton);

        return row;
    }

    _createEditorView() {
        const vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 12 });
        this._editorCommandId = null;

        this._nameEntry = new Adw.EntryRow({ title: _('Name') });
        this._commandEntry = new Adw.EntryRow({ title: _('Command') });
        this._positionEntry = new Adw.SpinRow({
            title: _('Position (0 = at the end)'),
            adjustment: new Gtk.Adjustment({ lower: 0, upper: 1000, step_increment: 1, value: 0 }),
        });
        [this._nameEntry, this._commandEntry, this._positionEntry].forEach(entry => vbox.append(entry));

        const buttonBox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL, halign: Gtk.Align.END, spacing: 6, margin_top: 12 });
        this._deleteButton = new Gtk.Button({ label: _('Delete'), css_classes: ['destructive-action'] });
        this._deleteButton.connect('clicked', () => this._handleDelete());
        const [cancelButton, saveButton] = [
            new Gtk.Button({ label: _('Cancel') }),
            new Gtk.Button({ label: _('Save'), css_classes: ['suggested-action'] }),
        ];
        cancelButton.connect('clicked', () => this._showList());
        saveButton.connect('clicked', () => this._handleSave());
        [this._deleteButton, cancelButton, saveButton].forEach(btn => buttonBox.append(btn));
        vbox.append(buttonBox);

        return vbox;
    }

    _showEditor(command = null) {
        if (command) {
            this._editorCommandId = command.id;
            this._nameEntry.set_text(command.name);
            this._commandEntry.set_text(command.command);
            this._positionEntry.set_value(command.position || 0);
            this._deleteButton.show();
        } else {
            this._editorCommandId = null;
            this._nameEntry.set_text(''); this._commandEntry.set_text(''); this._positionEntry.set_value(0);
            this._deleteButton.hide();
        }
        this._stack.set_visible_child_name('editor');
    }

    _showList() {
        this._stack.set_visible_child_name('list');
    }

    _handleSave() {
        const name = this._nameEntry.get_text().trim();
        const commandText = this._commandEntry.get_text().trim();
        const position = Math.floor(this._positionEntry.get_value());
        if (!name || !commandText) return;

        const commands = this._getCommands();
        if (this._editorCommandId) {
            const target = commands.find(c => c.id === this._editorCommandId);
            if (target) {
                target.name = name; target.command = commandText; target.position = position;
            }
        } else {
            commands.push({ id: Date.now().toString(), name, command: commandText, enabled: true, position });
        }
        this._saveCommands(commands);
        this._loadCommands();
        this._showList();
    }

    _handleDelete() {
        if (!this._editorCommandId) return;
        const commands = this._getCommands().filter(c => c.id !== this._editorCommandId);
        this._saveCommands(commands);
        this._loadCommands();
        this._showList();
    }
});