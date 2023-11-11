import type { DismissOptions } from './types';
import { DismissInterface } from './interface';
declare class Dismiss implements DismissInterface {
    _targetEl: HTMLElement | null;
    _triggerEl: HTMLElement | null;
    _options: DismissOptions;
    _initialized: boolean;
    _clickHandler: EventListenerOrEventListenerObject;
    constructor(targetEl?: HTMLElement | null, triggerEl?: HTMLElement | null, options?: DismissOptions);
    init(): void;
    destroy(): void;
    removeInstance(): void;
    destroyAndRemoveInstance(): void;
    hide(): void;
}
export declare function initDismisses(): void;
export default Dismiss;
//# sourceMappingURL=index.d.ts.map