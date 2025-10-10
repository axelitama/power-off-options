import CmdAsyncButton from './_cmdAsyncButton.js';

export default class CustomButton extends CmdAsyncButton {
    constructor(systemMenu, label, commandString) {
        // Wrap the user's command in `bash -c` to ensure it runs in a shell
        // environment, which handles aliases, paths, and complex syntax.
        const argv = ['/bin/bash', '-c', commandString];
        super(systemMenu, label, argv);
    }
}