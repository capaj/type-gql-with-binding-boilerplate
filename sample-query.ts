import { Binding } from './api-binding'

const api = new Binding()

api.mutation.createProduct({ name: 'aaa', price: 71 }).then(
  prod => {
    console.log(prod)
  },
  err => console.error(err)
)
