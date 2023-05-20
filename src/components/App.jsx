import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { PixabayApi } from './Services/PixabayApi';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery';
import { Loader } from 'components/Loader';
import { toast } from 'react-toastify';
import { Button } from 'components/Button';
import { H1 } from './ImageGallery/ImageGallery.styled';
import { AppDiv } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [finishRenderList, setFinishRenderList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    FetchingSevrice(query, page);
  }, [query,page]);
  

  const FetchingSevrice = async (searchWord, page) => {
    try {
      setStatus('pending');
      const reciveSetPIcture = await PixabayApi(searchWord, page);
      if (reciveSetPIcture.total === 0) {
        toast.error(`there is no  query with  "${searchWord.toUpperCase()}"`, {
          position: 'top-right',
          autoClose: 2000,
          theme: 'colored',
        });
        setStatus('reject');
        return;
      }
        
      setStatus('resolved');
      setFinishRenderList(prevState => [...prevState, ...reciveSetPIcture.hits ]);
      setTotalHits(reciveSetPIcture.totalHits);

    } catch (error) {
      setError(error);
      toast.error(`"${error}" Something were wrong `, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }

  };
 
  const onFormData = value => {
    setQuery('');
    setQuery(value);
    setPage(1);
    setTotalHits(0);
    setFinishRenderList([]);
  };

  const showHideButton = () =>
  {
   return (totalHits / finishRenderList.length > 1);
  }

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
    setStatus('pending');
  };

  return (
    <AppDiv>
      <Searchbar onFormData={onFormData} />
      
      {status === 'idle' && (
        <div>
          <H1>Please make a request and press enter </H1>
        </div>
      )}
      {(status === 'rejected') && (<h1> {error} </h1>)}
      {finishRenderList.length > 0 && <ImageGallery finishRenderList={finishRenderList}/>}
      {status === 'pending' && finishRenderList && <Loader />}
      {status === 'resolved' && showHideButton() && (finishRenderList !== 0) &&
          <Button onClick={onLoadMore} />}
      <ToastContainer />
    </AppDiv>
  );
};


