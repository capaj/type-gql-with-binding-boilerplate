import {
  Schema,
  Query,
  compileSchema,
  ObjectType,
  Field,
  Mutation
} from 'typegql'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import { makeExecutableSchema } from 'graphql-tools'
import { printSchema } from 'graphql'
import fs from 'fs'
import koaLogger from 'koa-logger'
import dotenv from 'dotenv'
dotenv.config()

const app = new Koa()
app.use(koaLogger())
const router = new KoaRouter()
const { PORT } = process.env

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

@ObjectType({ description: 'Simple product object type' })
class Product {
  @Field() name: string

  @Field() price: number

  @Field()
  isExpensive(): boolean {
    return this.price > 50
  }
}

@Schema()
class SuperSchema {
  @Query()
  hello(name: string): string {
    return `Hello, ${name}!`
  }
  @Mutation()
  createProduct(name: string, price: number): Product {
    const product = new Product()
    product.name = name
    product.price = price

    return product
  }
}

const schema = compileSchema(SuperSchema)
// console.log('schema: ', printSchema(schema))
fs.writeFileSync('schema.graphql', printSchema(schema))
router.post('/graphql', koaBody(), graphqlKoa({ schema: schema }))
router.get('/graphql', graphqlKoa({ schema: schema }))

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)
