import type { AccordionItem, AccordionOptions } from './types';
import { AccordionInterface } from './interface';
declare class Accordion implements AccordionInterface {
    _accordionEl: HTMLElement;
    _items: AccordionItem[];
    _options: AccordionOptions;
    _clickHandler: EventListenerOrEventListenerObject;
    _initialized: boolean;
    constructor(accordionEl?: HTMLElement | null, items?: AccordionItem[], options?: AccordionOptions);
    init(): void;
    destroy(): void;
    removeInstance(): void;
    destroyAndRemoveInstance(): void;
    getItem(id: string): AccordionItem;
    open(id: string): void;
    toggle(id: string): void;
    close(id: string): void;
}
export declare function initAccordions(): void;
export default Accordion;
//# sourceMappingURL=index.d.ts.map