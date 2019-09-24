const resolvers = {
  Query: {
    seat: (root, args, context, info) => {
      console.log(`3. resolver: hello`)
      return `Hello ${args.name ? args.name : 'world'}!`
    }
  },
}

const ticketInput = async (resolve, root, args, context, info) => {
  console.log(`1. logInput: ${JSON.stringify(args)}`)
  const result = await resolve(root, args, context, info)
  console.log(`5. logInput`)
  return result
}

export const ticketMiddleware = {
  Query: {
    ticket: ticketInput
  },
  Mutation: {
    buyTickets: ticketInput
  }
}
