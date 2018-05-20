import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { default as schema } from './binding-source' // this line has been modified, was generated as "import * as schema"

export interface Query {
  hello: <T = String | null>(
    args: { name: String },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
}

export interface Mutation {
  createProduct: <T = Product | null>(
    args: { name: String; price: Float },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
}

export interface Subscription {}

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>
  delegate(
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<any>
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<AsyncIterator<any>>
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers
}

export interface BindingConstructor<T> {
  new (...args): T
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema })

/**
 * Types
 */

/*
 * Simple product object type

 */
export interface Product {
  name?: String
  price?: Float
  isExpensive?: Boolean
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string
