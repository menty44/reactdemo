import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/gender/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                name: response.data.name});
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangePersonName(e) {
    this.setState({
      name: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name
    };
    axios.post('http://localhost:4000/gender/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Gender</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Gender Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Gender" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}
