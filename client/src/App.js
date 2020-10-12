import React from 'react';
import axios from "axios";

class App extends React.Component {
  state = {
    data: [],
    message: null
  }

  componentDidMount() {
    this.getDataFromDB()
  }

  getDataFromDB = () => {
    fetch('/get_data')
      .then((data) => data.json())
      .then((res) => this.setState({data: res.data}))
  }
  
  writeDataToDB = (message) => {
    axios.post('/write_data', {message: message})
      .then(() => this.getDataFromDB())
  }

  render() {
    return(
      <div>
        <div>
          <ul>
            {this.state.data.length <= 0
              ? "No entries in database yet."
              : this.state.data.map(dat => (
                <li style={{padding: "10px"}} key={this.state.data.message}>
                  <span style={{color: "gray"}}> id: </span> {dat._id} <br/>
                  <span style={{color: "gray"}}> data: </span> {dat.message}
                </li>
              ))}
          </ul>
        </div>
        <div style={{padding: "10px"}}>
          <input type="text" onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database" style={{width: "200px"}}/>
          <button onClick={() => this.writeDataToDB(this.state.message)}>add</button>
        </div>
        <div style={{padding: "10px"}}>
          <button onClick={() => this.getDataFromDB()}>load</button>
        </div>
      </div>
    )
  }
}

export default App;
