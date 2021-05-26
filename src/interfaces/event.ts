export interface EventHandler extends EventOptions {
  callback: Function;
}

export interface EventOptions {
  priority: EventPriority;
}

export enum EventPriority {
  LOW,
  MEDIUM,
  HIGH,
}
