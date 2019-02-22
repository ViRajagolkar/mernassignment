import React, { Component } from 'react';
import PersonService from "./../services/PersonService.jsx";
import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent.js";

class ApprovedPersonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            authenticated:false,
            persons:[]
         }

         this.serv = new PersonService();
         this.token = sessionStorage.getItem("token");
         this.roleName = sessionStorage.getItem("roleName");
        
          if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
              var h = this.props.history;
              h.push('/login');
          }
          this.status = "approved";
    }

componentDidMount(){
      this.serv.getPersonInfoByStatus(this.status, this.token)
                    .then((data) => data.json())
                    .then((value) => {if(value.status===200){
                      this.setState({persons:[]});
                        this.setState({persons:value.data})
                        console.log(value.data);
                    }
                    else{
                      this.setState({errorMsg: value.message});
                      this.setState({persons:[]});
                    }
                  }).catch(error => {
                        console.log(`Error occured ${error.status}`);
                  });
  }

  onClickGetSelectedPerson(userId){
      this.setState({userId: this.props.userId});
      var h = this.props.history;
      h.push('/personinfo/'+userId);
  }


    render() { 
        return ( 
          <div className="container page-backcolor">
          <HeaderComponent />

            <div className="main-content">
                <div className="row">
            <table className="table table-borderd table-striped">
                  <thead>
                      <tr>
                          <th>UserId</th>
                          <th>UserName</th>
                          <th>DOB</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>City</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                    <tbody>
                        {
                            this.state.persons.map((u, i) => (
                                <TableRow key={i} row={u} selected={this.onClickGetSelectedPerson.bind(this)} >
                                </TableRow>
                            ))

                        }
                    </tbody>
              </table>
              </div>
            </div>
            <FooterComponent />
        </div>
         );
    }
}

class TableRow extends Component {
    constructor(props) {
      super(props);
    }

    onRowClick(){
      this.props.selected(this.props.row.userId);
      console.log(this.props.row.userId);
    }
  
    render() {
      return (
        <tr onClick={this.onRowClick.bind(this)}>
        {
          Object.values(this.props.row).map((r, idx) =>(
          r === "approved" ?
          <td key={idx}>
            <button className="btn btn-warning">View Info</button>
          </td> 
          :
          <td key={idx}> {r} </td>
          ))
        } 
        
      </tr>
      );
    }
  }
 
export default ApprovedPersonComponent;