import type { TabItem, TabsOptions } from './types';
import { TabsInterface } from './interface';
declare class Tabs implements TabsInterface {
    _accordionEl: HTMLElement;
    _items: TabItem[];
    _activeTab: TabItem;
    _options: TabsOptions;
    _initialized: boolean;
    constructor(accordionEl?: HTMLElement | null, items?: TabItem[], options?: TabsOptions);
    init(): void;
    destroy(): void;
    removeInstance(): void;
    destroyAndRemoveInstance(): void;
    getActiveTab(): TabItem;
    setActiveTab(tab: TabItem): void;
    getTab(id: string): TabItem;
    show(id: string, forceShow?: boolean): void;
}
export declare function initTabs(): void;
export default Tabs;
//# sourceMappingURL=index.d.ts.map