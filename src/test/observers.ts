type IoCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

export class FakeIntersectionObserver implements IntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];
  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly thresholds: readonly number[];
  readonly callback: IoCallback;
  disconnected = false;
  readonly unobserved: Element[] = [];
  private readonly elements = new Set<Element>();

  constructor(callback: IoCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.rootMargin = options?.rootMargin ?? "0px";
    const threshold = options?.threshold;
    this.thresholds = typeof threshold === "number" ? [threshold] : (threshold ?? [0]);
    FakeIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.elements.add(target);
  }

  unobserve(target: Element): void {
    this.unobserved.push(target);
    this.elements.delete(target);
  }

  disconnect(): void {
    this.disconnected = true;
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting: boolean, id?: string): void {
    const targets = id ? [...this.elements].filter((el) => el.id === id) : [...this.elements];
    const entries = targets.map((target) => {
      const box = target.getBoundingClientRect();
      return {
        isIntersecting,
        target,
        intersectionRatio: isIntersecting ? 1 : 0,
        time: 0,
        boundingClientRect: box,
        intersectionRect: box,
        rootBounds: null,
      } as IntersectionObserverEntry;
    });
    this.callback(entries, this);
  }
}

export class FakeResizeObserver implements ResizeObserver {
  static instances: FakeResizeObserver[] = [];
  readonly callback: ResizeObserverCallback;
  disconnected = false;
  private readonly elements = new Set<Element>();

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    FakeResizeObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.elements.add(target);
  }

  unobserve(target: Element): void {
    this.elements.delete(target);
  }

  disconnect(): void {
    this.disconnected = true;
    this.elements.clear();
  }

  trigger(): void {
    const entries = [...this.elements].map((target) => {
      const box = target.getBoundingClientRect();
      return {
        target,
        contentRect: box,
        borderBoxSize: [],
        contentBoxSize: [],
        devicePixelContentBoxSize: [],
      } as ResizeObserverEntry;
    });
    this.callback(entries, this);
  }
}
