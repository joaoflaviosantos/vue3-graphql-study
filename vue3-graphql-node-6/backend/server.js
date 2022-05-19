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

    input ItemInput {
        type: String
        description: String
    }

    type Mutation {
        saveItem(item: ItemInput): Item
        deleteItem(id: Int): Boolean
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

var maxId = Math.max(...items.map(item => item.id))

const resolvers = {

    Query: {
        items(_, args) {
            const dictItems = items.filter(item => item.type === args.type)
            const descriptions = dictItems.map((item) => item.description);
            console.log(`{datetime: ${(new Date(Date.now())).toISOString()}, query: items, type: ${args.type}, description: ${descriptions}, status: success}`);
            return dictItems;
        }
    },
    
    Mutation: {
        saveItem(_, args) {
            const description = args.item.description;
            const item = items.find(item => item.description === description);
            if (item) {
                console.log(`{datetime: ${(new Date(Date.now())).toISOString()}, mutation: saveItem, type: Not found, description: Not found, status: fail}`);
            } else {
            const item = args.item;
            item.id = maxId + 1
            items.push(item);
            maxId = maxId + 1
            console.log(`{datetime: ${(new Date(Date.now())).toISOString()}, mutation: saveItem, type: ${args.item.type}, description: ${args.item.description}, status: success}`);
            return item;
            };
        },
        deleteItem(_, args) {
            const id = args.id;
            const item = items.find(item => item.id === id);
            if (!item) {
                console.log(`{datetime: ${(new Date(Date.now())).toISOString()}, mutation: deleteItem, type: Not found, description: Not found, status: fail}`);
                return false;
            } else {
                items.splice(items.indexOf(item),1);  
                console.log(`{datetime: ${(new Date(Date.now())).toISOString()}, mutation: deleteItem, type: ${item.type}, description: ${item.description}, status: success}`);
                return true;
            };
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

console.log('##############################################################################################')
console.log('##################################### APOLLO GRAPHQL SERVER ##################################')
console.log('##############################################################################################')

server.listen();
