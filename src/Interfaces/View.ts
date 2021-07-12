import { OmitCommon } from './Common';
import { IComponent } from './Component';
import { IControllable } from './Controller';

export interface IRenderable {
  state: IViewState;

  publish(): boolean;

  component: IComponent;

  controller: IControllable;
}

export interface IViewState {
  mutable: Record<string, any>;
  immutable: Record<string, any>;

  get(o: TypeofViewQuery): Partial<IViewData>;

  update(s: Partial<IViewData>, o: TypeofViewQuery): boolean;

  set(n: IViewData): boolean;

  parse(data: any): IViewData;
}

export enum OPERATION_QUERY {
  MUTATE = 'mutate',
  IMMUTATE = 'immutate',
  ALL = 'all'
}

export type TypeofViewQuery = keyof typeof OPERATION_QUERY;

export type IViewData = OmitCommon<IViewState>;
