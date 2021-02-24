type Primitive = number | string | boolean | null | undefined;

export type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property] extends Primitive ? Required<Type[Property]> : Getters<Required<Type[Property]>>
};

export type Setters<Type> = {
  [Property in keyof Type as `set${Capitalize<string & Property>}`]: (data: Type[Property]) => void;
};