import LoginManagerButton from './_loginManagerButton.js';

export default class SuspendThenHibernateButton extends LoginManagerButton {

    constructor(systemMenu, loginManager) {
        super(systemMenu, 'Suspend then Hibernate', loginManager, 'SuspendThenHibernate');
    }

}
