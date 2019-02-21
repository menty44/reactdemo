import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

import Loader from 'react-loader-spinner';
import _ from 'lodash';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {business: []};
    }
    componentDidMount(){
      axios.get('http://localhost:4000/business')
        .then(response => {
          console.log(response.data);
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.business.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      console.log('cheki index wewe', this.state.business.length)
      console.log('cheki index wewe lodash', _.size(this.state.business))
      if(_.size(this.state.business) > 0){
        return (
          <div>
            <h3 align="center">Business List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Business</th>
                  <th>GST Number</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                { this.tabRow() }
              </tbody>
            </table>
          </div>
        );
      }else{
        return (
          <div className="row">
              <div className="col-md-5"></div>
              <div className="col-md-2">
              <span style={{float: 'centre'}}>
                <Loader 
                  type="Oval"
                  color="#00BFFF"
                  height="100"	
                  width="100"
                />
                </span></div>
              <div className="col-md-5"></div>
          </div>
         
          );
      }
      
    }
    
  }