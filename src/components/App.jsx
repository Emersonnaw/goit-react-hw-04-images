import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import {PixabayApi} from './Services/PixabayApi';
import {ToastContainer} from 'react-toastify';
import { ImageGallery } from './ImageGallery';
import { Loader } from 'components/Loader';
import { toast } from 'react-toastify';
import { Button } from 'components/Button';
import { H1} from './ImageGallery/ImageGallery.styled';
import { AppDiv } from './App.styled'
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
export class App extends Component  {

  state = {
    query: '',
    finishRenderList:[],
    error: null,
    page: 1,
    status: 'idle',
    totalHits: 0, 
  };

  async componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevState.query;
        const prevPage = prevState.page;
        const {page, query} = this.state;

        if (prevQuery !== query || prevPage !== page) {
            this.FetchingSevrice(query, page);
        }
    };  

    FetchingSevrice = async (searchWord, page) => {
        try {
            this.setState({ status: 'pending' });    
          const reciveSetPIcture = await PixabayApi(searchWord, page); 
            if (reciveSetPIcture.total === 0) {
                                toast.error(`there is no  query with  "${searchWord}"`, {
                                position: "top-right",
                                autoClose: 2000,
                                theme: "colored",
                                });
                                this.setState({ status: 'reject'}); 
                                return;
          } 
          
            this.setState(prevState => ({
                finishRenderList:[...prevState.finishRenderList, ...reciveSetPIcture.hits],
                totalHits:reciveSetPIcture.totalHits, status:'resolved'
            })); 
          
            }catch(error) {
                toast.error(`"${error}" Something were wrong `, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });       
        } finally {
            this.setState({state:'rejected'})
        }
  }
  
  onFormData = (value) => {
        this.setState({ query:value, page: 1, totalHits: 0, finishRenderList:[]});
    }    

  onLoadMore = () => {
        this.setState(prevState => ({page:prevState.page + 1, status:'pending'}));
  };
  
  render() {
    const {error, status, finishRenderList, totalHits } = this.state;
    const showHideButton = totalHits / finishRenderList.length > 1;
    return (
      <AppDiv>
          <Searchbar onFormData={this.onFormData} />  
          {(status === 'idle') && (<div><H1>Please make a request and press enter </H1></div>)}  
          {(status === 'rejected') && (<h1> {error.message} </h1>)}
        
    
        {finishRenderList.length > 0 && <ImageGallery finishRenderList={finishRenderList}/>}
        {status === 'pending' && finishRenderList &&<Loader />}
        {status === 'resolved' && showHideButton && finishRenderList !== 0 &&
          <Button onClick={this.onLoadMore} />}
        <ToastContainer/>
      </AppDiv>
      
  );
}
};

App.propTypes = {
  value: PropTypes.objectOf(PropTypes.string.isRequired),
  finishRenderList: PropTypes.objectOf(PropTypes.shape({
    hits: PropTypes.object.isRequired,
    total: PropTypes.object.isRequired,
    totalHits: PropTypes.object.isRequired,
  }))
}