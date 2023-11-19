import type { DrawerOptions, PlacementClasses } from './types';
import { DrawerInterface } from './interface';
declare class Drawer implements DrawerInterface {
    _targetEl: HTMLElement;
    _triggerEl: HTMLElement;
    _options: DrawerOptions;
    _visible: boolean;
    _initialized: boolean;
    _handleEscapeKey: EventListenerOrEventListenerObject;
    constructor(targetEl?: HTMLElement | null, options?: DrawerOptions);
    init(): void;
    destroy(): void;
    removeInstance(): void;
    destroyAndRemoveInstance(): void;
    hide(): void;
    show(): void;
    toggle(): void;
    _createBackdrop(): void;
    _destroyBackdropEl(): void;
    _getPlacementClasses(placement: string): PlacementClasses;
    isHidden(): boolean;
    isVisible(): boolean;
}
export declare function initDrawers(): void;
export default Drawer;
//# sourceMappingURL=index.d.ts.map