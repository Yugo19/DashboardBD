const {projects, clients} = require('../sampleData.js');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLFloat, GraphQLEnumType} = 
require('graphql');

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const UE = require('../models/UE');
const Module = require('../models/Module');
const Note = require('../models/Note');
const Filiere = require('../models/Filiere');
const Classes = require('../models/Classes');
const Bulletin = require('../models/Bulletin');

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
// Filière type

const FilierType = new GraphQLObjectType({
    name:'Filiere',
    fields:() =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        ue:{
            type: GraphQLList(UEType),
            resolve(parent, args){
                return UE.find({filiereId: parent.id});
            }
        },
        classe:{
            type:GraphQLList(ClassesType),
            resolve(parent, args){
                return Classes.find({filiereId: parent.id})
            }
        }
    })
});


// Classes type
const ClassesType = new GraphQLObjectType({
    name:'Classes',
    fields: ()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        filiereId:{type: GraphQLID},
        filiere:{
            type: FilierType,
            resolve(parent, args){
                return Filiere.findById(parent.filiereId);
            }
        }
    })

})

// Bulletin type

const BulletinType = new GraphQLObjectType({
    name:'Bulletin',
    fields: () =>({
        id:{type : GraphQLID},
        nameModule:{type : GraphQLString},
        semestre: {type: GraphQLString},
        noteClasse: {type: GraphQLFloat},
        noteExam: {type: GraphQLFloat},
        studentId:{type:GraphQLFloat}
    })
})

// UE type
const UEType = new GraphQLObjectType({
    name:'UE',
    fields:() => ({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        status:{type:GraphQLString},
        semestre:{type: GraphQLString},
        filiereId:{type: GraphQLID},
        module:{
            type:ModuleType,
            resolve(parent, args){
                return Module.find({ueId: parent.id});
            }
        }
    })
});

// Note type

const NoteType = new GraphQLObjectType({
    name:'Note',
    fields:() => ({
        id:{ type: GraphQLID},
        note_classe:{type:GraphQLFloat},
        note_exam:{type:GraphQLFloat},
        moyen:{type:GraphQLFloat}
    })
})

// Module type
const ModuleType = new GraphQLObjectType({
    name:'Module',
    fields:() =>({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        credit:{type:GraphQLFloat},
        note_classe:{type:GraphQLFloat},
        note_exam:{type:GraphQLFloat},
        moyen:{type:GraphQLFloat}
    })
});

// Teacher type
const TearcherType = new GraphQLObjectType({
    name:'Teacher',
    fields:() =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        Specialties: {type:GraphQLList(GraphQLString)},
        email: {type:GraphQLString}
    })
});

// Client Type
const StudentType = new GraphQLObjectType({
    name:'Student',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type:GraphQLString},
        bulletin : {
            type: GraphQLList(BulletinType),
            resolve(parent, args){
                return Bulletin.find({studentId: parent.id});
            }
        }
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
        teachers:{
            type:new GraphQLList(TearcherType),
            resolve(parent, args){
                return Teacher.find();
            }
        },
        teacher:{
            type:TearcherType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return Teacher.findById(args.id);
            },

        },
        ues:{
            type: new GraphQLList(UEType),
            resolve(parent, args){
                return UE.find();
            }
        },
        ue:{
            type:UEType,
            args:{id:{ type:GraphQLID}},
            resolve(parent, args){
                return UE.findById(args.id);
            }
        },
        module:{
            type:ModuleType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return Module.findById(args.id);
            }
        },
        modules:{
            type: new GraphQLList(ModuleType),
            resolve(parent, args){
                return Module.find();
            }
        },
        note:{
            type:NoteType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return Note.findById(args.id);
            }
        },
        notes:{
            type: new GraphQLList(NoteType),
            resolve(parent, args){
                return Note.find();
            }
        },
        filiere:{
            type: FilierType,
            args:{id: { type: GraphQLID}},
            resolve(parent, args){
                return Filiere.findById(args.id);
            }
        },
        filieres:{
            type: new GraphQLList(FilierType),
            resolve(parent, args){
                return Filiere.find();
            }
        },
        classe:{
            type: ClassesType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent, args){
                return Classes.findById(args.id);
            }
        },
        classes:{
            type: GraphQLList(ClassesType),
            resolve(parent, args){
                return Classes.find();
            }
        },
        bulletin:{
            type: GraphQLList(BulletinType),
            resolve(parent, args){
                return Bulletin.find();
            }
        },
        bulletinNote:{
            type: BulletinType,
            args:{
                id:{type: GraphQLID}
            },
            resolve(parent, args){
                return Bulletin.findById(args.id)
            }
        }
    },
});

// Mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addStudent:{
            type:StudentType,
            args:{
                name:{type: GraphQLNonNull(GraphQLString)},
                email:{type: GraphQLNonNull(GraphQLString)},
                phone:{type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const student = new Student({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return student.save();
            },
        },
        deleteStudent:{
            type:StudentType,
            args:{
                id:{type: GraphQLNonNull(GraphQLID)},   
            },
            resolve(parent, args){
                return Student.findByIdAndRemove(args.id);
            },
        },
        addTeacher:{
            type:TearcherType,
            args:{
                name:{type: GraphQLNonNull(GraphQLString)},
                Specialties:{type: GraphQLNonNull(GraphQLList(GraphQLString))},
                email:{type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const teacher = new Teacher({
                    name:args.name,
                    Specialties:args.Specialties,
                    email:args.email
                });
                return teacher.save();
            }
        },
        addUe:{
            type: UEType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                status:{
                    type: new GraphQLEnumType({
                        name: 'UeStatus',
                        values: {
                            'Majeur': { value: 'Majeur'},
                            'Mineur':{value:'Mineur'}
                        }
                    })
                },
                semestre: {type: GraphQLNonNull(GraphQLString)},
                filiereId:{type: GraphQLNonNull(GraphQLID)}
        },
        resolve(parent, args){
            const ue = new UE({
                name:args.name,
                status: args.status,
                semestre: args.semestre,
                filiereId : args.filiereId
            });
            return ue.save();
        }
    },

    addModule:{
        type:ModuleType,
        args:{
            name:{type: GraphQLNonNull(GraphQLString)},
            credit:{type: GraphQLNonNull(GraphQLFloat)},
            note_classe:{type: GraphQLNonNull(GraphQLFloat)},
            note_exam:{type: GraphQLNonNull(GraphQLFloat)},
            moyen:{ type: GraphQLNonNull(GraphQLFloat)},
            ueId: {type: GraphQLNonNull(GraphQLID)}
        },
        resolve(parent, args){
            const modulez = new Module({
                name: args.name,
                credit: args.credit,
                note_classe: args.note_classe,
                note_exam: args.note_exam,
                moyen: args.moyen,
                ueId: args.ueId,
            });
            return modulez.save();
        }

    },

    deleteModule:{
        type: ModuleType,
        args:{
            id:{type: GraphQLNonNull(GraphQLID)},
        },
        resolve(parent, args){
            return Module.findByIdAndRemove(args.id);
        },
    },

    addNote:{
        type:NoteType,
        args:{
            note_classe:{type: GraphQLNonNull(GraphQLString)},
            note_exam:{type: GraphQLNonNull(GraphQLFloat)},
            moyen:{ type: GraphQLNonNull(GraphQLFloat)}
        },
        resolve(parent, args){
            const module = new Note({
                note_classe: args.note_classe,
                note_exam: args.note_exam,
                moyen: args.moyen
            });
            return Note.save();
        }

    },
    
    deleteNote:{
        type: NoteType,
        args:{
            id:{type: GraphQLNonNull(GraphQLID)},
        },
        resolve(parent, args){
            return Note.findByIdAndRemove(args.id);
        },
    },
    addFiliere:{
        type: FilierType,
        args:{
            name:{ type: GraphQLNonNull(GraphQLString)},
        },
        resolve(parent, args){
            const filiere = new Filiere({
                name: args.name
            });
            return filiere.save();
        }
    },
    addClasse:{
        type: ClassesType,
        args:{
            name:{type:GraphQLNonNull(GraphQLString)},
            filiereId:{type: GraphQLNonNull(GraphQLID)}
        },
        resolve(parent, args){
            const classes = new Classes({
                name: args.name,
                filiereId: args.filiereId
            });
            return classes.save(); 
        }
    },
    addBulletin:{
        type: BulletinType,
        args:{
            nameModule:{type: GraphQLString},
            semestre:{type: GraphQLString},
            noteClasse:{type: GraphQLFloat},
            noteExam: {type :GraphQLFloat},
            studentId: {type : GraphQLID}
        },
        resolve(parent, args){
            const bulletin = new Bulletin({
                nameModule: args.nameModule,
                semestre: args.semestre,
                noteClasse: args.noteClasse,
                noteExam: args.noteExam,
                studentId: args.studentId
            });
            return bulletin.save();
        }
    }
    
}
    
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});