import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsComponents extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
      country: PropTypes.string,
      pageSize:PropTypes.number,
      category: PropTypes.string
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    constructor(props){  
        super(props);  
        console.log("Hello I am a constructor from News Components.")
        this.state = {
            articles: [],
            loading:false,
            page:1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Abhinav Srivastava `;
   }  


   async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37713cb696114e85a9d10c5014d95a37&page=${this.state.page}&pageSize=12`
    this.setState({loading: true});
    let data = await fetch(url); //promises
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    })
   }

  async componentDidMount(){
    this.updateNews();
   }

   
   handlePrevClick = async()=>{
    console.log("next");
    await this.setState({page: this.state.page -1})
    this.updateNews();

  }

   handleNextClick = async()=>{
    await this.setState({page: this.state.page +1})
     this.updateNews();
  
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37713cb696114e85a9d10c5014d95a37&page=${this.state.page}&pageSize=12`
    this.setState({loading: true});
    let data = await fetch(url); //promises
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults,
      loading: false
    })
  };



  render() {
    console.log("render")

    
    return (
      <>

            <h1 style={{color: "#b4872f"}} className='text-center' >NewsChamps - Top <span style={{color: "#2e333a" ,fontFamily:"'Rubik Marker Hatch', cursive"}}>{this.capitalizeFirstLetter(this.props.category)} </span> Headlines</h1>
            
        {/* {this.state.loading&&<Spinner/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container">


        <div className="row">

         {this.state.articles.map((element, index)=>{
           
           return <div className="col-md-4" key={index}>
            <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,60):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>

          })}
        </div>
        </div>
        </InfiniteScroll>


        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button  disabled={this.state.page +1 > Math.ceil(this.state.totalResults/12)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      </>
    )
  }
}
