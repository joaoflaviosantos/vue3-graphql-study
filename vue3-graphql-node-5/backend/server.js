const { ApolloServer } = require("apollo-server");

const typeDefs = `

    type Item {
        id: Int
        type: String
        description: String
    }

    type Query {
        items (type: String): [Item]
    }

`;

const items = [
    {id:1, type: "prefix", description: "Air"},
    {id:2, type: "prefix", description: "Jet"},
    {id:3, type: "prefix", description: "Flight"},
    {id:4, type: "suffix", description: "Hub"},
    {id:5, type: "suffix", description: "Station"},
    {id:6, type: "suffix", description: "Mart"},
];

const resolvers = {
    Query: {
        items(_, args) {
            console.log(`{datetime: ${(new Date(Date.now())).toISOString()}, query: items, type: ${args.type}}`)
            return items.filter(item => item.type === args.type);
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

console.log('##############################################################################################')
console.log('##################################### APOLLO GRAPHQL SERVER ##################################')
console.log('##############################################################################################')

server.listen();
