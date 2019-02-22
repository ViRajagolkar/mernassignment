var mongoose = require("mongoose");

var rolemod=require("./../app.personinfo.models/roles.model");

var RoleModel = mongoose.model("Roles");

module.exports = {
  getRoles: function(request, response) {
    
    RoleModel.find().exec(function(err, res) {
      if (err) {
        response.statuscode = 404;
        response.send({ status: response.statuscode, error: "" });
      }
      response.statuscode = 200;
      response.send({ status: response.statuscode, data: res });
    });
  },


  postRoles: function(request, response){

    let role ={
      roleId: request.body.roleId,
      roleName: request.body.roleName
    }

    RoleModel.findOne({roleName: request.body.roleName},function(err, respRole){
     
      if(respRole != null){
        response.statuscode=200;
        response.send({ status: response.statuscode, message: "Role Name already exist" });
      } else{
        RoleModel.create(role, function(err, res) {
          if(err){
              response.statuscode=400;
              response.send({ status: response.statuscode, error: "" });
          }
          response.statuscode = 200;
          response.send({ status: response.statuscode, data: res, message:"Role added Successfully..!" });
        })
      }
   });
},


  updateRoles: function(request, response){
     
     let role ={
      RoleName: request.body.RoleName
    };
     let condition ={
       RoleID: request.params.id
     }

     RoleModel.updateOne(condition, role, function(err, res){
      if(err){
        response.statuscode=400;
        response.send({ status: response.statuscode, error: "" });
      }
      response.statuscode = 200;
      response.send({ status: response.statuscode, data: res });
     })
  },


  deleteRoles: function(request, response){
    let condition ={
      RoleID: request.params.id
    }

    RoleModel.deleteOne(condition, function(err, res){
      if(err){
        response.statuscode=400;
        response.send({ status: response.statuscode, error: "" });
      }
      response.statuscode = 200;
      response.send({ status: response.statuscode, data: res });
    })
  }
};
