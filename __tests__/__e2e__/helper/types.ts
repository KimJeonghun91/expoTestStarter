import { TimeoutDuration } from "./constants";

export interface ElementParams {
  selector: string;
  timeout?: number;
}

export interface ElementValueParams extends ElementParams {
  value: string;
}

export interface ElementMessageParams extends ElementParams {
  expectedMsg: string;
}

export interface IncrementAndDecrementParams extends ElementParams {
  buttonSelector: string;
}

export interface StateParams extends ElementParams {
  state: 'disabled' | 'selected' | 'checked' | 'busy' | 'expanded';
}

export type TimeoutValue = typeof TimeoutDuration[keyof typeof TimeoutDuration];