import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../App.css';
const categiries =['business','entertainment','general','health','science','sports','technology'];
const NewsApp =()=>{
    const [articles,setArticles] = useState([]);
    const [currentCategory,setCategory] = useState('general');
    const [totalArticles, setTotalArticles] = useState(0);
    const [currentPage,setCurrentPage] = useState(undefined);
    const loadNews=(pageNo=1)=>{
        axios({
            url:'https://newsapi.org/v2/top-headlines',
            method:'GET',
            params:{
                        country:'in',
                        apiKey:'62a4660df36344a2a5321dd86228ab82',
                        category:currentCategory,
                        page:pageNo
                    }
        }).then((res)=>{
            setArticles([...articles,...res.data.articles])
            setTotalArticles(res.data.totalResults)
            setCurrentPage(pageNo)
          }).catch((err)=>{console.log(err)})
    }
    useEffect(()=>{loadNews()},[]);
    useEffect(()=>{loadNews()},[currentCategory])
    return (
        <>
         <h1 className='text-secondary'>TODAY'S NEWS</h1>
         <div>
            {
                categiries.map((category)=>{
                    return(
                        <button className='btn btn-white' style={{marginRight:30}} onClick={()=>{
                            setArticles([]);
                            setCategory(category);
                        }}>{category}</button>
                    )
                })
            }
         </div>
            <br/>
        <InfiniteScroll
                className='d-flex flex-row flex-wrap'
                dataLength={articles.length} //This is important field to render the next data
                next={()=>{
                    loadNews(currentPage+1);
                }}
                hasMore={totalArticles!=articles.length}
             >
            {
                articles.map((article, index)=>{
                    return(
                        <div className="card mb-3 overflow-hidden container1" style={{width:220,height:300, margin:5,borderRadius:10}} onClick={()=>{
                            window.open(article.url)}}>
                          <img src={article.urlToImage} className="card-img-top" alt="..." style={{height:'50%'}}/>
                           <div className="card-body">
                                  <p className="card-title"><b>{article.title.slice(0,40)}</b></p> 
                                  <p className="card-text">{article.description}</p>
                            </div>
                     </div>
                    )
                })
            }
        </InfiniteScroll>
        </>
           
    )
}
export default NewsApp;