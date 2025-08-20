import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class HybridSleepButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Hybrid Sleep', ['systemctl', 'hybrid-sleep']);
    }
    
}
