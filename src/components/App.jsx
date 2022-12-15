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
  const [perPage, setPerpage] = useState(12)
  // const [visible, setIsVisible]=useState(false)
  const [total, setTotal] = useState(0);
  
  const hendleSubmit = (search) => {
    setSearch(search);
    setImages([]);
    setPageNamber(1);
  }
  //   if (!search) {
  //     return;
  //   }
  //   fetchImages(search, pageNumber)
  // }, [search, pageNumber])
  useEffect(() => {
    const fetchImages = (search, pageNumber) => {
      const perPage = 12;
      if (!search) return;
      setLoading(true)
      fetchImages(search, pageNumber, perPage)
        .then(({ hits, totalHits, total }) => {
          const totalPages = Math.ceil(totalHits / perPage);
          console.log(totalPages)
          if (hits.length === 0) {
            return Notiflix.info.failure('No images found. Please submit another query!');
          }
          setImages(prevImages => [...prevImages, ...hits])
          setError('')
        })
        .catch(error => {
          setError(error);
          setSearch(false)
        })
        .finally(() => setLoading(false))
    }
  })    


//  useEffect(() => {
//     // Отримання фото через "Фетч"
//     const getPhotos = async (query, page) => {
//       if (!query) return;
//       setIsLoading(true);
//       try {
//         const { hits, total, totalHits } = await ImageService.getImages(
//           query,
//           page
//         );

//         if (hits.length === 0) {
//           setIsEmpty(true);
//           showWarning('Sorry. there are no images ... 😅');
//           return;
//         }
//         setImages(state => [...state, ...hits]);
//         setIsVisible(page < Math.ceil(total / totalHits));
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getPhotos(query, page);
//   }, [page, query]);
  

  
  
  
  
  
// const findImg = () => {
//     images.find(image => {
//        return image.id === largeImageId;
//     });
//   }

  const openModal = largeImageURL=> {
setShowModal(true) 
  setLargeImageId(largeImageURL)
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
      
      {images.length > 0 &&
        <>
        <ImageGallery images={images} openModal={openModal} />
      
        
          < Button text='Load more' clickHandler={onLoadMore} />
        </>}
        
      
      
          { showModal  && <Modal largeImageURL={largeImageURL} onClose={closeModal}>
           <img src={largeImageId} alt="text" />
           </Modal >}
         </>
  )

  

}
