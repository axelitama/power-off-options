import {Extension, gettext as _, ngettext, pgettext} from 'resource:///org/gnome/shell/extensions/extension.js';
import LoginManagerButton from './_loginManagerButton.js';

export default class HibernationButton extends LoginManagerButton {

    constructor(systemMenu, loginManager) {
        super(systemMenu, _('Hibernate'), loginManager, 'Hibernate');
    }

}
