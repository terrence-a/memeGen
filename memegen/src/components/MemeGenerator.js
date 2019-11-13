import React, { Component } from 'react'
function collectRandInt(min=Number.MIN_VALUE, max=Number.MAX_VALUE){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            topText: "", 
            bottomText: "",
            currImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleImg = this.handleImg.bind(this)
    }
    /* Note, this is the fetch syntax for grabbing data from apis */
    componentDidMount() {
        this.setState({loading: true})
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ 
                    allMemeImgs: memes,
                    loading:false,
                })
            })
    }

    handleChange(event){
        const{name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    

    handleImg(event){
        event.preventDefault()
        console.log("buttom pressedt")
        const memelength = this.state.allMemeImgs.length
        const q = collectRandInt(0, memelength - 1)
        this.setState({
            currImg: this.state.allMemeImgs[q].url
        })
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleImg}>
                    <input 
                        type="text" 
                        value={this.state.topText}
                        name="topText"
                        placeholder="Top Text"
                        onChange={this.handleChange}
                        />
                    <input
                        type="text"
                        value={this.state.bottomText}
                        name="bottomText"
                        placeholder="Bottom Text"
                        onChange={this.handleChange}
                        />
                    <button> Gen </button>
                </form>
                <div className="meme">
                    <img src={this.state.currImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator