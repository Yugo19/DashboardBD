const {projects, clients} = require('../sampleData.js');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = 
require('graphql');

const Student = require('../models/Student');

// Project type
const ProjectType = new GraphQLObjectType({
    name:'Project',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type:GraphQLString},
        Student:{
            type: StudentType,
            resolve(parent, args){
                return Student.findById(parent.id);
            },
        },
    })
});

// Client Type
const StudentType = new GraphQLObjectType({
    name:'Student',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
         projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return projects;
            },
        },
        project:{
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return projects.find(project => project.id === args.id);
            },
        },
        students:{
            type: new GraphQLList(StudentType),
            resolve(parent, args){
                return Student.find();
            },
        },
        student:{
            type: StudentType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Student.findById(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});