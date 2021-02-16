const mongoose= require('mongoose')

const contactSchema= new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String
    }

})

module.exports=mongoose.model('Contact',contactSchema)