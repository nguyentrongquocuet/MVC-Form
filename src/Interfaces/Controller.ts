import { OmitCommon } from './Common';
import { IComponent } from './Component';
import { IRenderable } from './View';

export interface IControllable {
  state: IControllerState;

  component: IComponent;

  view: IRenderable;

  publish(): boolean;
}

export interface IControllerState {
  invalid: boolean;
  validated: boolean;
  dirty: boolean;

  validate(): Promise<boolean>;

  get(): IControllerData;

  set(c: IControllerData): boolean;

  update(n: Partial<IControllerData>): boolean;

  parse(data: any): IControllerData;
}

export type IControllerData = OmitCommon<IControllerState>;
