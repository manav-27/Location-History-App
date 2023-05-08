import React, { Component } from 'react'

export class Places extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    
    return (
        <React.Fragment >
        <ul className="list-group">
          {this.props.places.map(listitem => (
            <li className="list-group-item list-group-item-primary"> 
              {listitem}
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

export default Places