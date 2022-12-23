import React from 'react';

import { useState, useEffect } from 'react';

import {fetchData} from './helpers'
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import {Modal} from "./Modal/Modal"

export const App = () => {
  const [searchQuery, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [ImageArray, setImageArray] = useState([])
  const [showButton, setShowButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [largeImageURL, setLargeImageURL] = useState();
  const [imageTags, setImageTags] = useState();

  async function fetchImages(query, page) {
     try {
       const result = await fetchData(query, page) 
        const ImageArray = result.data.hits;
        if (ImageArray.length === 0) {
          setShowButton(false)
          alert("there is no image with your query, tryAgain")
              return
        } else {
          setImageArray(prevImageArray => [...prevImageArray, ...ImageArray])
                    setShowButton(true)
        }
     
     } catch (error) {
       console.log(error);
     }
     finally { setIsLoading(false) };
  } 
  
  useEffect(() => {
     if (!searchQuery) {
      return;
    }
    setIsLoading(true)
    fetchImages(searchQuery, page);
  }, [searchQuery, page])

  const onSubmit = query => {
    setQuery(query)
    setPage(1)
    setImageArray([])
  }

  const onLoadMoreBtnClick = () => {
  setPage(prevPage => (prevPage + 1));
  };

  const toggleModal = (largeImageURL, imageTags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setImageTags(imageTags);
  };

  return (
     <>
       <SearchBar onSubmit={onSubmit} />
       <div>
         <ImageGallery images={ImageArray} showModal={toggleModal}/>
         {showButton && (
           <Button onClick={onLoadMoreBtnClick} />
         )}
       </div>
       {isLoading && <Loader />}
       {showModal && (
          <Modal
            src={largeImageURL}
            alt={imageTags}
            closeModal={toggleModal}
          />
        )}
     </>
    )
}




// export class App extends React.Component {
//   state = {
//     searchQuery: "",
//     page: 1,
//     ImageArray: [],
//     showButton: false,
//     isLoading: false,
//     showModal: false,
//   }

//   onSubmit = FormData => {
//   const { query } = FormData
//   this.setState({searchQuery: query, page: 1, ImageArray: []})
//   }
  
//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.searchQuery !== prevState.searchQuery ||
//       this.state.page !== prevState.page
//     ) {
//       this.setState({ isLoading: true });
//       this.fetchImages(this.state.searchQuery, this.state.page);
//     }
//   }

//    fetchImages(query, page) {
//        fetchImages(query, page).then(result => {
//         const ImageArray = result.data.hits;
//         if (ImageArray.length === 0) {
//           this.setState({ showButton: false })
//           alert("there is no image with your query, tryAgain")
//               return
//         } else {
//           this.setState(prevState => ({
//             ImageArray: [...prevState.ImageArray, ...ImageArray],
//           }))
//           this.setState({ showButton: true });
//         }
//     }).catch(error => {
//     console.log(error);
//   })
//     .finally(() => this.setState({ isLoading: false }));
//     } 


//   onLoadMoreBtnClick = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
//   };

//   toggleModal = (largeImageURL, imageTags) => {
//   this.setState(prevState => ({
//     showModal: !prevState.showModal,
//     largeImageURL: largeImageURL,
//     imageTags: imageTags,
//   }));
//   };

//   render() {
//    return (
//      <>
//        <SearchBar onSubmit={this.onSubmit} />
//        <div>
//          <ImageGallery images={this.state.ImageArray} showModal={this.toggleModal}/>
//          {this.state.showButton && (
//            <Button onClick={this.onLoadMoreBtnClick} />
//          )}
//        </div>
//        {this.state.isLoading && <Loader />}
//        {this.state.showModal && (
//           <Modal
//             src={this.state.largeImageURL}
//             alt={this.state.imageTags}
//             closeModal={this.toggleModal}
//           />
//         )}
//      </>
//     )
//   }
// };
