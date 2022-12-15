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


export const App = ({largeImageURL}) => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNamber] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageId, setLargeImageId] = useState(null);
  const [perPage, setPerpage] = useState(12)
  const hendleSubmit = (search) => {
    setSearch(search);
    setImages([]);
    setPageNamber(1);
}
  useEffect(() => {
   
    if (!search) {
      return;
    }
    setLoading(true)
      fetchImages(search, pageNumber,perPage)
        .then(images => {
          if (images.total === 0) {
   return Notiflix.info.failure('No images found. Please submit another query!');    
        }
          setImages(prevImages => [...prevImages, ...images]);
          setError('')
        })
        .catch(error => {
        setError(error);
        setSearch(false)
        })
         
        .finally(() => setLoading(false));
      
      
},[search,pageNumber,perPage])

// const findImg = () => {
//     images.find(image => {
//        return image.id === largeImageId;
//     });
//   }

  const openModal = largeImageURL=> {
setShowModal(true) 
  setLargeImageId(largeImageURL)
//  images.find(image => {
//    return image.id === largeImageId;
   
   // });
   }
 
 const closeModal = () => {
    setShowModal(false);
 };
  const onLoadMore = () => {
    setPageNamber(prevNumber => prevNumber  + 1
   ) }
  
  return (
        <>
          <Form onSubmit={hendleSubmit} /> 
        
      {loading && <Loader />} 
      
      {images &&
          <ImageGallery images={images} openModal={openModal} />}
        
          {Math.ceil(images.totalHits / 12) > pageNumber &&
            < Button text='Load more' clickHandler={onLoadMore} /> } 
        
      
      
          { showModal  && <Modal largeImageURL={largeImageURL} onClose={closeModal}>
           <img src={largeImageId} alt="text" />
           </Modal >}
         </>
  )

  

}
