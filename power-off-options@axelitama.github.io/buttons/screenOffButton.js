import CmdAsyncButton from './_cmdAsyncButton.js';

export default class ScreenOffButton extends CmdAsyncButton {

    constructor(systemMenu) {
        super(systemMenu, 'Turn Off Screen', ['xset', 'dpms', 'force', 'off']);
    }

}
