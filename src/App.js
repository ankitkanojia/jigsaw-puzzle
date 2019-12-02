import React from 'react';
import puzzle from "./puzzle.jpg";
import './App.css';
import * as ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpadding : 0,
      cardPositions : [],
      isInitialize :  false,
      currentWhiteBlock : 0,
      left : 0,
      right : 0,
      up : 0,
      down : 0,
      slidePosition: [
        { left: false, right: true, up: false, down: true }, { left: true, right: true, up: false, down: true }, { left: true, right: true, up: false, down: true }, { left: true, right: true, up: false, down: true }, { left: true, right: true, up: false, down: true }, { left: true, right: true, up: false, down: true }, { left: true, right: true, up: false, down: true }, { left: true, right: false, up: false, down: true },
        { left: false, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: false, up: true, down: true },
        { left: false, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: false, up: true, down: true },
        { left: false, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: true, up: true, down: true }, { left: true, right: false, up: true, down: true },
        { left: false, right: true, up: true, down: false }, { left: true, right: true, up: true, down: false }, { left: true, right: true, up: true, down: false }, { left: true, right: true, up: true, down: false }, { left: true, right: true, up: true, down: false }, { left: true, right: true, up: true, down: false }, { left: true, right: true, up: true, down: false }, { left: true, right: false, up: true, down: false }
      ]
    };
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

  async componentDidMount() {
    const dynamicPadding = (ReactDOM.findDOMNode(this.refs["maincontent"]).getBoundingClientRect().height - ReactDOM.findDOMNode(this.refs["contentBox"]).getBoundingClientRect().height) / 2;
    var arr = [...Array(40)].map((data, index) => {
        return index + 1;
    });
    const shuffledCards =  await this.shuffle(arr);
    let currentWhiteBlock = 0;
    let updatedPositions = [];
    shuffledCards.map((data, index) => {
      let currentImage = data + ".png";
      if(data === 40)
      {
        currentWhiteBlock = (index + 1);
      }
      updatedPositions.push({ image : currentImage , boxId : (index + 1)});
    });

    this.setState({
      cpadding: dynamicPadding,
      cardPositions : updatedPositions,
      currentWhiteBlock : currentWhiteBlock
    }, () => {
      this.setState({
        isInitialize : true
      });
    });

    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      this.positionChange("up");
    } else if (e.keyCode === 40) {
      this.positionChange("down");
    } else if (e.keyCode === 37) {
      this.positionChange("left");
    } else if (e.keyCode === 39) {
      this.positionChange("right");
    }
  }

  swapImages = (index) => { 
      let updatedArrayPosition = this.state.cardPositions;
      let currentBox = updatedArrayPosition[index - 1];
      let whiteBox = updatedArrayPosition[this.state.currentWhiteBlock - 1];
      const tempImage = currentBox.image;
      const tempPostion = currentBox.boxId;
      currentBox.image = whiteBox.image;
      whiteBox.image = tempImage;
      this.setState({
        cardPositions : updatedArrayPosition,
        currentWhiteBlock : tempPostion
      });
  }

  verifySwapImages = (index) => {
    const cPo = this.state.currentWhiteBlock;
    if ((cPo - 8) === index) {
      this.swapImages(cPo - 8);
    } else if ((cPo + 8) === index) {
        this.swapImages(cPo + 8);
    } else if ((cPo - 1) === index) {
        this.swapImages(cPo - 1);
    } else if ((cPo + 1) === index) {
        this.swapImages(cPo + 1);
    }
  }

  positionChange = (type) => {
    const cPo = this.state.currentWhiteBlock;
    if(type === "up")
    {
      const nextPositionObject = this.state.slidePosition[cPo + 7];
      if(nextPositionObject && nextPositionObject.up)
      {
        this.swapImages(cPo + 8);
      }
    }else if(type === "down")
    {
      const nextPositionObject = this.state.slidePosition[cPo - 9];
      if(nextPositionObject && nextPositionObject.down)
      {
        this.swapImages(cPo - 8);
      }
    }else if(type === "left")
    {
      const nextPositionObject = this.state.slidePosition[cPo];
      if(nextPositionObject && nextPositionObject.left)
      {
        this.swapImages(cPo + 1);
      }
    }else if(type === "right")
    {
      const nextPositionObject = this.state.slidePosition[cPo - 1];
      if(nextPositionObject && nextPositionObject.left)
      {
        this.swapImages(cPo - 1);
      }
    }
  }

  render() {
    let cindex = 0 ;
    let aindex = 0 ;
    return (
      <div className="App">
        <div class="container">
          <div class="row">
            <div className="col-md-9 d-flex justify-content-center align-items-center">
              <div className="row">
                <div className="col-md-12" ref={"maincontent"} >
                  <table className="quetable" style={{border: "2px solid white"}} ref={"contentBox"}>
                    <tbody>
                      {this.state.isInitialize && [...Array(5)].map((data, index) => {
                        return <tr>
                          {[...Array(8)].map((sdata, sindex) => {
                            const cNum = this.state.cardPositions[cindex].image;
                            cindex = cindex + 1;
                            const currentIndex = cindex;
                            return <td id={"box_" + cindex} data-block={cindex} style={{ width: "100px", height: "100px", border: "1px solid white"}}>
                              <img ref={"drag-" + cindex} onClick={() => this.verifySwapImages(currentIndex)} data-id={cindex} src={require("./puzzles/" + cNum)} alt={cindex} />
                            </td>
                          })}
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-center text-center">
              <div className="row w-100">
                <div className="col-md-12" style={{paddingTop : this.state.cpadding  + "px", paddingBottom : this.state.cpadding  + "px"}}>
                  <table className="anstable"  style={{ width : "100%",border: "2px solid white" , backgroundImage : "url(" + puzzle + ")" , backgroundSize : "100% 100%" , backgroundRepeat : "no-repeat"}}>
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
                              return <td  id={"box_" + aindex} style={{ minWidth: "10px", minHeight: "10px"}}>
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
