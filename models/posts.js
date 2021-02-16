const mongoose=require('mongoose')
const marked= require("marked")
const createDomPurify= require('dompurify')
const {JSDOM}=require('jsdom')
const dompurify=createDomPurify(new JSDOM().window)

const postSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    category:{
        type:String,
        
    },
    markdown:{
        
        type:String
    },
    cleanedHTML:{
        type:String,
        required:true
    }


})

postSchema.pre('validate',function(next){

    if(this.markdown){
        this.cleanedHTML=dompurify.sanitize(marked(this.markdown))
    }
  
    
next();

})



module.exports=mongoose.model('Post',postSchema)