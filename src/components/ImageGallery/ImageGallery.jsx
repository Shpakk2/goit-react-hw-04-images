import PropTypes from 'prop-types';


import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from "components/ImageGallery/ImageGallery.module.css"

export const ImageGallery = ({ images, showModal }) => {
    return (
        <ul className={css.ImageGallery}>
            {images.map(image => {
                return (
                    <ImageGalleryItem 
                    key={image.id}
                    webformatURL={image.webformatURL}
                    tags={image.tags}
                    largeImageURL={image.largeImageURL}
                    showModal={showModal} />
                )
            })}
        </ul>
    )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func.isRequired,
};