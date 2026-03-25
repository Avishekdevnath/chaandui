import * as React from "react";

export type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends React.ElementType, Props> = keyof (AsProp<C> & Props);

export type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];
