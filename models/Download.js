
module.exports = {
  
  attributes: {
  	name: {
  		type : 'string',
  		required : true,
  	},
  	url:{
       type:'string',
       required:true
    },
    finished:{
      type:'boolean',
      defaultsTo: false
    },
    user:{
      model: 'User',
      required:true
    }
  }
};
