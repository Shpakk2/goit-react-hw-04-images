import PropTypes from 'prop-types';

import css from "components/ImageGalleryItem/ImageGalleryItem.module.css"


export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  showModal,
}) => {
  return (
      <li className={css.item} onClick={() => showModal(largeImageURL, tags)}>
          <img src={webformatURL} alt={tags} className={css.image}/>
        </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};