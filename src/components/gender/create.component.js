
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Loader from 'react-loader-spinner';
// import Button from 'react-bootstrap-button-loader';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_name: '',
      business_name: '',
      business_gst_number:''
    }
  }
  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeBusinessName(e) {
    this.setState({
      business_name: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      person_name: this.state.person_name,
      business_name: this.state.business_name,
      business_gst_number: this.state.business_gst_number
    };
    console.log('object befor post', obj.person_name);
    if(!obj.person_name || !obj.business_name || !obj.business_gst_number) {
      swal('Whoa!', 'Missing Values!', 'error');
    }else{
      axios.post('http://localhost:4000/gender/add', obj)
        .then(res => 
          // console.log('response from saved data', res.data)
          success(res.data)          
        );
    }

    this.setState({
      person_name: '',
      business_name: '',
      business_gst_number: ''
    })
      
    function success(dat){
      console.log('received data', dat);
      if(dat.business === 'business in added successfully') {
        swal('Good job!', 'Saved Successfully!', 'success');
      }else{
        swal('Whoa!', 'Error in saving the data!', 'error');
      }
    }
    
  
    
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add A New Gender</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      />
                </div>
                <div className="form-group">
                    <label>Business Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_name}
                      onChange={this.onChangeBusinessName}
                      />
                </div>
                <div className="form-group">
                    <label>GST Number: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.business_gst_number}
                      onChange={this.onChangeGstNumber}
                      />
                </div>
                <div className="row">
                <div className="col-md-12">
                  <input type="submit" style={{width: '100%'}} value="Register Business" className="btn btn-primary"/>
                </div>     
                </div>
            </form>
            
        </div>
    )
  }
}