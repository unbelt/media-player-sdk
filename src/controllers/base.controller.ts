import { EventBus } from '../core/event-bus';

/** Base class for all controllers */
export class BaseController {
  protected readonly eventBus: EventBus;

  protected constructor() {
    this.eventBus = EventBus.Instance;
  }
}
