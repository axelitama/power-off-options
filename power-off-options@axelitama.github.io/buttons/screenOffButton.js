import PowerOffDialogButton from './_powerOffDialogButton.js';

export default class ScreenOffButton extends PowerOffDialogButton {

    constructor(systemMenu) {
        super(systemMenu, 'Turn Off Screen', ['xset', 'dpms', 'force', 'off']);
    }
    
}
