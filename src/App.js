import React from 'react';
import './App.css';
import puzzle from "./puzzle.jpg";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cardPositions: [],
      isInitialize : false
    };
  }

  async componentDidMount() {
    var arr = [...Array(40)].map((data, index) => {
      return index + 1;
    });

    const shuffledCards =  await this.shuffle(arr);
  
    this.setState({
      cardPositions: shuffledCards,
      isInitialize : true
    });
  }

  shuffle = async (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  render() {
    let aindex = 0;
    let cindex = 0;
    return (
      <div className="App">
        <div class="container">
          <div class="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12 d-flex  justify-content-center align-items-center" ref={"maincontent"} >
                  <table className="quetable" style={{ border: "2px solid white" }} ref={"contentBox"}>
                    <tbody>
                      {this.state.isInitialize && [...Array(5)].map((data, index) => {
                        return <tr>
                          {[...Array(8)].map((sdata, sindex) => {
                            const cNum = this.state.cardPositions[cindex];
                            cindex = cindex + 1;
                            return <td id={"box_" + cindex} data-block={cindex} style={{ width: "100px", height: "100px", border: "1px solid white" }}>
                              <img ref={"drag-" + cindex} data-id={cindex} src={require("./puzzles/" + cNum + ".png")} alt={cindex} />
                            </td>
                          })}
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="row d-flex justify-content-center align-items-center text-white">
                <div className="col-md-12">
                  <table className="anstable" style={{ width: "100%", border: "2px solid white", backgroundImage: "url(" + puzzle + ")", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}>
                    <tbody>
                      {[...Array(5)].map((data, index) => {
                        return <tr>
                          {[...Array(8)].map((sdata, sindex) => {
                            aindex = aindex + 1;
                            if (aindex === 40) {
                              return <td id={"box_" + aindex} style={{ minWidth: "10px", minHeight: "10px", backgroundColor: "#FFF" }}>
                                &nbsp;
                              </td>
                            } else {
                              return <td id={"box_" + aindex} style={{ minWidth: "10px", minHeight: "10px" }}>
                                &nbsp;
                              </td>
                            }
                          })}
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
