// @flow

import type {ICore} from "../core/index";

export interface Feature<T> {
  constructor(coreInstance: ICore, options:? T): Feature<T>;
  startuem(): void;
}
