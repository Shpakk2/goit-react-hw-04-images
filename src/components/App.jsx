import React from 'react';

import {fetchImages} from './helpers'
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import {Modal} from "./Modal/Modal"

export class App extends React.Component {
  state = {
    searchQuery: "",
    page: 1,
    ImageArray: [],
    showButton: false,
    isLoading: false,
    showModal: false,
  }

  onSubmit = FormData => {
  const { query } = FormData
  this.setState({searchQuery: query, page: 1, ImageArray: []})
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      this.fetchImages(this.state.searchQuery, this.state.page);
    }
  }

  async fetchImages(query, page) {
    try {
      await fetchImages(query, page).then(result => {
        const ImageArray = result.data.hits;
        if (ImageArray.length === 0) {
          this.setState({ showButton: false })
          alert("there is no image with your query, tryAgain")
              return
        } else {
          this.setState(prevState => ({
            ImageArray: [...prevState.ImageArray, ...ImageArray],
          }))
          this.setState({ showButton: true });
        }
}) 
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onLoadMoreBtnClick = () => {
  this.setState(prevState => ({
    page: prevState.page + 1,
  }));
  };

  toggleModal = (largeImageURL, imageTags) => {
  this.setState(prevState => ({
    showModal: !prevState.showModal,
    largeImageURL: largeImageURL,
    imageTags: imageTags,
  }));
  };

  render() {
   return (
     <>
       <SearchBar onSubmit={this.onSubmit} />
       <div>
         <ImageGallery images={this.state.ImageArray} showModal={this.toggleModal}/>
         {this.state.showButton && (
           <Button onClick={this.onLoadMoreBtnClick} />
         )}
       </div>
       {this.state.isLoading && <Loader />}
       {this.state.showModal && (
          <Modal
            src={this.state.largeImageURL}
            alt={this.state.imageTags}
            closeModal={this.toggleModal}
          />
        )}
     </>
    )
  }
};
