import { IControllable } from './Controller';
import { IRenderable } from './View';

export interface IComponent {
  controller: IControllable;

  view: IRenderable;
}
