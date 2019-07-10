const User = require('../models/user');
const Event = require('../models/events');


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');


const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ( {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    })

});

const EventType = new GraphQLObjectType({
    name: 'EventType',
    fields: () => ({
        eventName: {type: GraphQLString},
        date: {type: GraphQLString},
        user_id: {type: GraphQLString}
    })
});


const UserLoginType = new GraphQLObjectType({
    name: 'UserLoginType',
    fields: () => ({
        username: {type: GraphQLString},
        token: { type: GraphQLString,
            resolve(parent, args) {
                return parent.username
            }}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        helloWorld: {
            type: UserType,
            resolve() {
                return { message: 'Hello worldss'}
            }
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve() {
                const users = await User.find({});
                return users;
            }
        },
        events: {
            type: new GraphQLList(EventType),
            async resolve() {
                const events = await Event.find({});
                return events;
            }
        },
        event: {
            type: EventType,
            args: {
                id:{type: GraphQLString}
            },
            async resolve(parent, args) {
                const event = await Event.findOne({
                    _id: args.id
                });
                return  event;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: {type: GraphQLString},
                email: {type: GraphQLString},
                password:{type: GraphQLString}
            },
           async resolve(parent, args) {
                const { email, username, password } = args;
                const user = new User({ username, email, password });
                await user.save();
                return  user;
            }
        },
        loginUser: {
            type: UserLoginType,
            args: {
                username: {type: GraphQLString},
                password:{type: GraphQLString}
            },
            async resolve(parent, args) {
                const { username, password } = args;
                const user = await User.findOne({
                    username,
                    password
                });

                if(!user) {
                    throw new Error('no user found')
                }
                return user;
            }
        },
        addEvents: {
            type: EventType,
            args: {
                eventName: {type: GraphQLString},
                date: {type: GraphQLString},
                user_id: {type: GraphQLString}
            },
            async resolve(parent, args) {
                const { eventName, date, user_id } = args;
                const event = new Event({
                    eventName, date, user_id
                });
                await event.save();
                return  event;
            }
        },
        updateEvent: {
            type: EventType,
            args: {
                eventName: {type: GraphQLString},
                date: {type: GraphQLString},
                user_id: {type: GraphQLString},
                id: {type: GraphQLString}
            },
            async resolve(parent, args) {
                // const
            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
