import {model, Schema} from 'mongoose'

const TodoSchema = new Schema({
    title : {
        type : String,
        required :[true, "Title is requried to create a new todo"]
    },
    description : {
        type : String,
        default : "No description"
    },
    completed : {
        type : Boolean,
        default : false
    },
    priority : {
        type : String,
        enum : ["Low", "Medium", "High"],
        default : "Low"
    },
    dueDate : {
        type : Date,
        default : Date.now
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
},{
    strict : true,
    timestamps : true,
    versionKey : false
})


export const TodoModel = model("Todo", TodoSchema)