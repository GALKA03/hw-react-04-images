//import Form  from "./Searchbar/Searchbar";
import { useState, useEffect } from "react";
import Notiflix from 'notiflix';
import { fetchImages } from "./servise/Fech";
import {Button} from './Button/Button'
import { Loader } from "./Loader/Loader";
import {ImageGallery} from "./ImageGallery/ImageGallery";
//import { gallaryMaper } from "../utils/maper"
import { Modal } from "./Modal/Modal"
//import style from 'components/App.module.css'
import { Form } from "./Searchbar/Searchbar";


export const App = ({ largeImageURL }) => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNamber] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageId, setLargeImageId] = useState(null);
  // const [perPage, setPerpage] = useState(12)
  const [total, setTotal] = useState(0);
  
  const hendleSubmit = (search) => {
    setSearch(search);
    setImages([]);
    setPageNamber(1);
  }

  useEffect(() => {   
 if
    (!search) {
    return;
  }
  fetchData(search, pageNumber)
  }, [search, pageNumber]);
  
  const fetchData = (search, pageNumber) => {
    const perPage = 12;
    setLoading(true)
 

    fetchImages(search, pageNumber, perPage)
      .then(({ hits, totalHits,total } ) => {
          const totalPages = Math.ceil(totalHits / perPage);
        console.log('hits',hits)
          if (hits.length === 0) {
            return Notiflix.info.failure('No images found. Please submit another query!');
          }
           if (pageNumber === totalPages) {
         Notiflix.info.failure("You've reached the end of search results.");
           }
         if (pageNumber === 1) {
          Notiflix.info.failure(`Hooray! We found ${totalHits} images.`);
         }
        
          setImages(prevImages => [...prevImages, ...hits])
           setTotal(totalHits);
        setError('')
        })
        .catch(error => {
          setError(error);
          setSearch(false)
        })
        .finally(() => setLoading(false))
    }


  const openModal = largeImageURL=> {
setShowModal(true) 
  setLargeImageId(largeImageURL)
   }
 
 const closeModal = () => {
    setShowModal(false);
 };
  const onLoadMore = () => {
    setPageNamber(prevNumber => prevNumber  + 1
    )
  }
  const loadImages = images.length < 0;
  console.log('images',images)
  const isLastPage = images.length === total;
  const loadMoreBtn = loadImages && !loading && !isLastPage;
  
  return (
        <>
          <Form onSubmit={hendleSubmit} /> 
        
      {loading && <Loader />} 
        
      { loadImages && <ImageGallery images={images} openModal={openModal} />}
      
        
      {loadMoreBtn && < Button text='Load more' clickHandler={onLoadMore} />}
       
          { showModal  && <Modal largeImageURL={largeImageURL} onClose={closeModal}>
           <img src={largeImageId} alt="text" />
           </Modal >}
         </>
  )

  

}
