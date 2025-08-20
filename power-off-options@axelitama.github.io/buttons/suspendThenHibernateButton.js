import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class SuspendThenHibernateButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Suspend then Hibernate', ['systemctl', 'suspend-then-hibernate']);
    }

}
