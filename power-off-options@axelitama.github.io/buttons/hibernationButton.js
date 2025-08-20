import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class HibernationButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Hibernate', ['systemctl', 'hibernate']);
    }
    
}
