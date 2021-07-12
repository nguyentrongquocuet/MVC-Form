import { parseLocaleText } from '../Helpers/ShopifyHelpers';
import { OmitCommon } from '../Interfaces/Common';
import { IComponent } from '../Interfaces/Component';
import { IControllable, IControllerState } from '../Interfaces/Controller';
import { IRenderable, IViewState, TypeofViewQuery } from '../Interfaces/View';
import { Field, TypeofField } from '../Types/data.type';

export abstract class AFieldModel implements IComponent {
  view!: IRenderable;
  controller!: IControllable;
}

export abstract class AFieldView implements IRenderable {
  state!: IViewState;

  component!: IComponent;
  controller!: IControllable;

  abstract publish(): boolean;

  contructor(
    data: Field,
    component: AFieldModel,
    controller: AFieldController
  ) {
    this.controller = controller;
    this.component = component;
  }
}

export abstract class AFieldController implements IControllable {
  component!: IComponent;
  state!: IControllerState;
  view!: AFieldView;

  contructor(data: Field, component: AFieldModel, view: AFieldView) {
    this.view = view;
    this.component = component;
  }

  abstract publish(): boolean;
}

export abstract class AFieldControllerState implements IControllerState {
  invalid: boolean = false;
  validated: boolean = false;
  dirty: boolean = false;
  value: any;

  contructor(data: Field) {
    this.invalid = false;
    this.validated = false;
    this.dirty = false;
  }

  abstract get(): IFieldControllerData;

  abstract set(c: IFieldControllerData): boolean;

  abstract update(n: Partial<IFieldControllerData>): boolean;

  abstract validate(): Promise<boolean>;

  abstract parse(data: Field): IFieldControllerData;
}

export type IFieldControllerData = OmitCommon<AFieldControllerState>;

export interface IViewImmutableData {
  type: TypeofField;
  id: string;
  multiple: boolean;
  required: boolean;
  label: string;
  hideLabel: boolean;
  width?: string;
  height?: string;
  helpText?: string;
}

export interface IViewMutateData {
  className: string;
  elementClass: string;
  labelClass: string;
}

export abstract class AFieldViewState implements IViewState {
  mutable: IViewMutateData;
  immutable: IViewImmutableData;

  constructor(data: Field) {
    const parsed = this.parse(data);
    this.mutable = parsed.mutable;
    this.immutable = parsed.immutable;
  }

  parse(fieldData: Field): IFieldViewData {
    const {
      advance,
      label,
      type,
      multiple,
      width,
      id,
      height,
      validation
    } = fieldData;
    const { required } = validation;
    const {
      wrapperClass,
      labelClass,
      elementClass,
      hideLabel,
      helpText
    } = advance;

    return {
      mutable: {
        className: `${wrapperClass} ${required ? 'is-required' : ''}`,
        elementClass: `${elementClass} ${required ? 'is-required' : ''}`,
        labelClass: `${labelClass} ${required ? 'is-required' : ''}`
      },
      immutable: {
        type,
        required,
        id: id || '',
        multiple: !!multiple,
        hideLabel: !!hideLabel,
        helpText: parseLocaleText(helpText),
        label: parseLocaleText(label),
        width: width || '',
        height: height || ''
      }
    };
  }

  get(o: TypeofViewQuery): Partial<IFieldViewData> {
    if (o === 'ALL')
      return {
        immutable: this.immutable,
        mutable: this.mutable
      };
    if (o === 'IMMUTATE')
      return {
        immutable: this.immutable
      };
    return {
      mutable: this.mutable
    };
  }

  update(s: Partial<IFieldViewData>, o: TypeofViewQuery): boolean {
    const { mutable, immutable } = s;
    if (!(mutable || immutable)) return false;
    if (o === 'ALL') {
      if (mutable) this.mutable = { ...this.mutable, ...mutable };
      if (immutable) this.immutable = { ...this.immutable, ...immutable };
      return true;
    }
    if (o === 'IMMUTATE') {
      if (immutable) this.immutable = { ...this.immutable, ...immutable };
      return !!immutable;
    }
    if (o === 'MUTATE') {
      if (mutable) this.mutable = { ...this.mutable, ...mutable };
      return !!mutable;
    }
    return false;
  }

  set(n: IFieldViewData): boolean {
    const { mutable, immutable } = n;
    if (!(mutable || immutable)) return false;
    this.immutable = immutable;
    this.mutable = mutable;
    return true;
  }
}

export type IFieldViewData = OmitCommon<AFieldViewState>;
