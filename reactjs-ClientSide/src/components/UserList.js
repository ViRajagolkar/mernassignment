import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import UserService from "./../services/UserService.jsx";

class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
         }
         this.serv = new UserService();
         this.token =sessionStorage.getItem("token");
         this.roleName = sessionStorage.getItem("roleName");

         if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
          var h = this.props.history;
          h.push('/login');
      }
         
    }

    // getSelectedUser(user){
    //      this.setState({userId: user.userId});
    //      this.setState({firstName: user.userName});
    //      this.setState({emailAddress: user.emailAddress});
    //  }

    getUserInfo(userId){
        var h = this.props.history;
        h.push('/personinfo/'+userId);
    }

    componentDidMount(){
          this.serv.getUsers(this.token)
                            .then((data) => data.json())
                            .then((value)=>{
                               //console.log(JSON.stringify(value.data));
                               //this.getSelectedUser(value);
                               this.setState({users:value.data})
                            })
                            .catch(error =>{
                                console.log(`Error Status ${error.status}`);
                            });
    }


    render() { 
        return ( 
            <div className="container page-backcolor">
            <HeaderComponent/>

            <div className="main-content">
            <div className="col-md-9 user-margin border-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>RoleId</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                        this.state.users.map((r,i)=>(
                        <TableRow key={i}  row={r}  rec={this.state.users} selected={this.getUserInfo.bind(this)}></TableRow>
                        ))
                        }
                        
                    </tbody>
                    </table>
                </div>
                </div>
            <FooterComponent/>
        </div>
         );
    }
}

class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state={}
    }

    onRowClick(){
      this.props.selected(this.props.row.userId);
      //console.log(JSON.stringify(this.props.row.userId));
    }
  
    render() {
      return (
        <tr onClick= {this.onRowClick.bind(this)}>
          {Object.keys(this.props.rec[0]).map((r, i) =>
            r !== "_id" ? r !== "__v" ? r !== "password" ? <td>{this.props.row[r]}</td> : null : null : null
          )}
          <td><input type="button" value="Add Info" className="btn btn-success" onClick={this.onRowClick.bind(this)}></input></td>
        </tr>
      );
    }
  }

export default UserListComponent;