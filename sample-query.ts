import { Binding } from './binding'

const api = new Binding()

api.mutation.createProduct({ name: 'aaa', price: 71 }, '{isExpensive}').then(
  prod => {
    console.log(prod)
  },
  err => console.error(err)
)
