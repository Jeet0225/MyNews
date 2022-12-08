import React, { Component } from 'react'
import NewsItem from '../NewsItem'
//import Spinner from './Spinner';
import PropTypes from 'prop-types'




export class News extends Component {

    static defaultProps ={
        country: 'in',
        category: 'general'
    }

    static propTypes ={
        name: PropTypes.string,
        category: PropTypes.string,
    }
     capitalizeFirstLetter =(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    constructor(props) {
        super(props);
        console.log("Hello I am a constructor from news app");
        this.state = {
            articles: [],
            loading: false,
            page:1
            
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-MyNews`;
    }

   async componentDidMount(){
        this.props.setProgress(10);
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7f182cc8cb6d47cda8663d0d0899c98d`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseddata = await data.json() 
        this.props.setProgress(70);
        console.log(parseddata);
        this.setState({articles: parseddata.articles})
        this.props.setProgress(100);
    }
   

    handlePrevClick = async ()=>{
       console.log("Previous");
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7f182cc8cb6d47cda8663d0d0899c98d`;
        let data = await fetch(url);
        let parsedData = await data.jason();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles
        })

    }

    handleNextClick = async ()=>{
        console.log("Next")
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7f182cc8cb6d47cda8663d0d0899c98d`;
        let data = await fetch(url);
        let parsedData = await data.jason();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles
        })
    }
    

    render() {
        console.log("render")
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>My News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        
                <div className="row">
                    {
                        this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,60):""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>

                        })}
                        
                </div>
            </div>
        )
    }
}

export default News
