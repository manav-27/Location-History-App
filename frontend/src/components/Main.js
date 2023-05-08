import React from 'react';
import { Navigate ,useNavigate} from 'react-router-dom';
import Options from './options';
import Img1 from '../images/Img1.jpg';
import Img2 from '../images/Img2.jpg';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  
  handleUploadImage = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    
    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: data,
    }).then(this.setState({imageURL:"yes"}));
  }
  render() {
    if(!"yes".localeCompare(this.state.imageURL))
    {
      return(
        <Options/>
      )
    }
    else
    {
      return (
        <div >
        <form class="text-center" onSubmit={this.handleUploadImage}>
          <div class="alert alert-warning">
          <h1>Location History App</h1>
          </div>
          <br/>
          <br/>
          <br/>
          <h2>Follow these steps to get the loaction dataset and upload it.</h2>
          
          <div class="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 list-group">
          <ul>
            <li class="list-group-item list-group-item-primary">
              <h4>
                Click this link to get to the download page of dataset <a href="https://takeout.google.com/settings/takeout" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">link</a>
              </h4>
            </li>
            <br/>
            <li class="list-group-item list-group-item-primary">
              <h4>So now scroll down to Location history and select as image below</h4>
            <img src={Img1} style={{ width: 800, height:300 }} class="img-fluid"/>
            </li>
            <br/>
            <br/>
            <li class="list-group-item list-group-item-primary">
              <h4>Then click on the "Next step" button</h4>
            </li>
            <br/>
            <br/>
            <li class="list-group-item list-group-item-primary">
              <h4>Select everything as image below and click on "Create export"</h4>
              <img src={Img2} style={{ width: 800, height:600 }} class="img-fluid"/>
            </li>
            <br/>
            <br/>
            <li class="list-group-item list-group-item-primary"> 
              <h4>You will recieve a mail with the zip file of the data in a few minutes.</h4>
            </li>
            <br/>
            <li class="list-group-item list-group-item-primary">
              <h4>Simply upload that zip below.</h4>
            </li>
          </ul>
          </div>
          <br/>
          <br/>
          <br/>
          <label class="form-label"><h4>Upload the zip file</h4> </label>
            <input class="form-control form-control-lg" ref={(ref) => {this.uploadInput = ref;this.fileName=ref;}} type="file" />
          <div>
          </div>
          <br />
          <div>
            <button class="btn btn-light" >Upload</button>
          </div>
        </form>
        </div>
      );
    }
  }
}

export default Main;