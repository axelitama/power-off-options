import CmdAsyncButton from './_cmdAsyncButton.js';

export default class CustomButton extends CmdAsyncButton {
    constructor(systemMenu, label, commandString) {
        // Wrap command in `bash -l -c` to invoke a login shell, ensuring
        // the user's environment (PATH, aliases) is fully loaded.
        const argv = ['/bin/bash', '-l', '-c', commandString];
        super(systemMenu, label, argv);
    }
}
