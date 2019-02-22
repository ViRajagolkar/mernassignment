import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import PersonService from '../services/PersonService.jsx';

class PersonInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            personId:"",
            firstName:"",
            middleName:"",
            lastName:"",
            gender:"",
            dob:"",
            age:"",
            flatNumber:"",
            societyName:"",
            areaName:"",
            city:"",
            state:"",
            pinCode:"",
            email:"",
            phoneNo:"",
            mobileNo:"",
            physicalDisability:"",
            maritalStatus:"",
            education:"",
            birthSign:"",
            userId:"",
            isAuthorized:""
         }

        this.serv = new PersonService();
        this.token = sessionStorage.getItem("token");
        this.roleName = sessionStorage.getItem("roleName");
        
        if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
            var h = this.props.history;
            h.push('/login');
        }

        this.userId = this.props.match.params.userId;
        console.log("Per"+this.userId);
    }

    OnPropertyChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onClickSubmit(){
        var personInformation = {
            personId:this.state.personId,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            gender:this.state.gender,
            dob:this.state.dob,
            age:this.state.age,
            flatNumber:this.state.flatNumber,
            societyName:this.state.societyName,
            areaName:this.state.areaName,
            city:this.state.city,
            state:this.state.state,
            pinCode:this.state.pinCode,
            email:this.state.email,
            phoneNo:this.state.phoneNo,
            mobileNo:this.state.mobileNo,
            physicalDisability:this.state.physicalDisability,
            maritalStatus:this.state.maritalStatus,
            education:this.state.education,
            birthSign:this.state.birthSign,
            userId: this.state.userId,
            isAuthorized:this.state.isAuthorized
        }

        console.log(JSON.stringify(personInformation));

        this.serv.postPersons(personInformation, this.token).then(res=>res.json())
                                                          .then(res=>{
                                                            if(res.status===200){
                                                                this.setState({successMsg: res.message});
                                                                this.onClickClear();
                                                            }
                                                            else{
                                                                this.setState({errorMsg: res.message});
                                                            } 
        });
    }

    onClickClear(e){
        this.setState({personId:"",
                    firstName:"",
                    middleName:"",
                    lastName:"",
                    gender:"",
                    dob:"",
                    age:"",
                    flatNumber:"",
                    societyName:"",
                    areaName:"",
                    city:"",
                    state:"",
                    pinCode:"",
                    email:"",
                    phoneNo:"",
                    mobileNo:"",
                    physicalDisability:"",
                    maritalStatus:"",
                    education:"",
                    birthSign:""
        })
    }

    componentDidMount(){
            this.serv.getPersonInfoByUserId(this.userId, this.token)
            .then((data) => data.json())
            .then((value) => {
                let valueInfo = value.data;

                if(valueInfo !=null) {
                    console.log(valueInfo); 
                    this.setState({
                        personId:valueInfo.personId,
                        firstName:valueInfo.firstName,
                        middleName:valueInfo.middleName,
                        lastName:valueInfo.lastName,
                        dob:valueInfo.dob,
                        gender:valueInfo.gender,
                        age:valueInfo.age,
                        flatNumber:valueInfo.flatNumber,
                        societyName:valueInfo.societyName,
                        areaName:valueInfo.areaName,
                        city:valueInfo.city,
                        state:valueInfo.state,
                        email:valueInfo.email,
                        pinCode:valueInfo.pinCode,
                        mobileNo:valueInfo.mobileNo,
                        phoneNo:valueInfo.phoneNo,
                        physicalDisability:valueInfo.physicalDisability,
                        maritalStatus:valueInfo.maritalStatus,
                        education:valueInfo.education,
                        birthSign:valueInfo.birthSign,
                        userId: this.state.userId,
                        isAuthorized:this.state.isAuthorized
                        });
                }
                 else{
                    alert('Please add person information');
                    this.setState({personInformation: []})
                 }
                })
            .catch(error => {
                console.log(`Error occured ${error.status}`);
            });   
    }

    render() { 
        return ( 
            <div className="container page-backcolor">
                <HeaderComponent/>

                <div className="main-content">
                    <div className="row">
                        <div className="col-md-2">
                        </div>

                        <div className="col-md-8">
                            <div className="error">{this.state.errorMsg}</div>
                            <div className="success">{this.state.successMsg}</div>
                        <form>
                            <div className="row">
                        <   div className="form-group col-md-12">
                                <label htmlFor="personId">Person Id </label>
                                <input type="text" className="form-control" id="personId" value={this.state.personId} onChange={this.OnPropertyChange.bind(this)}
                                  name="personId"/>
                            </div>
                   
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName"> First Name </label>
                                <input type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.OnPropertyChange.bind(this)}
                                  name="firstName"/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="middleName"> Middle Name </label>
                                <input type="text" className="form-control" id="firstName" value={this.state.middleName} onChange={this.OnPropertyChange.bind(this)}
                                  name="middleName"/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="lastName"> Last Name </label>
                                <input type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.OnPropertyChange.bind(this)}
                                  name="lastName"/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="gender"> Gender </label>
                                <select className="form-control" id="gender" value={this.state.gender} onChange={this.OnPropertyChange.bind(this)}
                                name="gender">
                                 <option value="Male"> Male </option>
                                 <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="dob"> Date of Birth </label>
                                <input type="date" id="dob" className="form-control" value={this.state.dob} onChange={this.OnPropertyChange.bind(this)}
                                  name="dob"/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="age"> Age </label>
                                <input type="text" id="age" className="form-control" value={this.state.age} onChange={this.OnPropertyChange.bind(this)}
                                  name="age"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="flatNumber"> Address </label>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="flatNumber"> Flat No </label>
                                <input type="text" id="flatNumber" className="form-control" value={this.state.flatNumber} onChange={this.OnPropertyChange.bind(this)}
                                  name="flatNumber"/>
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="societyName"> Society Name</label>
                                <input type="text" id="societyName" className="form-control" value={this.state.societyName} onChange={this.OnPropertyChange.bind(this)}
                                  name="societyName"/>
                            </div>

                            <div className="form-group col-md-5">
                                <label htmlFor="areaName"> Area Name</label>
                                <input type="text" id="areaName" className="form-control" value={this.state.areaName} onChange={this.OnPropertyChange.bind(this)}
                                  name="areaName"/>
                            </div>

                            <div className=" form-group col-md-6"> 
                                <label htmlFor="city"> City </label>
                                <input type="text" id="city" className="form-control" value={this.state.city} onChange={this.OnPropertyChange.bind(this)}
                                  name="city"/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="state"> State</label>
                                <input type="text" id="state" className="form-control" value={this.state.state} onChange={this.OnPropertyChange.bind(this)}
                                  name="state"/>
                            </div>

                            <div className="form-group col-md-6"> 
                                <label htmlFor="pinCode"> PIN </label>
                                <input type="text" id="pinCode" className="form-control" value={this.state.pinCode} onChange={this.OnPropertyChange.bind(this)}
                                  name="pinCode"/>
                            </div>

                            <div className="form-group col-md-6"> 
                                <label htmlFor="email"> Email </label>
                                <input type="text" id="email" className="form-control" value={this.state.email} onChange={this.OnPropertyChange.bind(this)}
                                  name="email"/>
                            </div>

                            <div className="form-group col-md-6"> 
                                <label htmlFor="phoneNo"> Phone No </label>
                                <input type="text" id="phoneNo" className="form-control" value={this.state.phoneNo} onChange={this.OnPropertyChange.bind(this)}
                                  name="phoneNo" />
                            </div>

                            <div className="form-group col-md-6"> 
                                <label htmlFor="mobileNo"> Mobile No </label>
                                <input type="text" id="mobileNo" className="form-control" value={this.state.mobileNo} onChange={this.OnPropertyChange.bind(this)}
                                  name="mobileNo"/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="physicalDisability"> Physical Disability</label>
                                <input type="text" id="physicalDisability" className="form-control" value={this.state.physicalDisability} onChange={this.OnPropertyChange.bind(this)}
                                  name="physicalDisability"/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="maritalStatus"> Marital Status</label>
                                <select name="maritalStatus" id="maritalStatus" value={this.state.maritalStatus} className="form-control" tabIndex="14">
                                    <option value="Unmarried"> Unmarried </option>
                                    <option value="Married"> Married </option>
                                </select>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="educationStatus"> Educational</label>
                                <input type="text" id="education" className="form-control" value={this.state.education} onChange={this.OnPropertyChange.bind(this)}
                                  name="education"/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="birthSign"> Birth Sign</label>
                                <input type="text" id="birthSign" className="form-control" value={this.state.birthSign} onChange={this.OnPropertyChange.bind(this)}
                                  name="birthSign"/>
                            </div>

                            <input type="button" value="Submit" className="btn btn-success" onClick={this.onClickSubmit.bind(this)}/>
                            <input type="button" value="Clear" className="btn btn-primary" onClick={this.onClickClear.bind(this)}/>
                            
                        </div>    
                </form>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </div>
         );
    }
}
 
export default PersonInfoComponent;