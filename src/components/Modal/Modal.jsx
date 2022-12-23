import { useEffect } from "react";
import propTypes from 'prop-types';
import css from 'components/Modal/Modal.module.css'

export const Modal = ({src, alt, closeModal}) => {
    
    useEffect(() => {
        const onEscapePress = e => {
            if (e.code === 'Escape') {
            closeModal()}};      
        window.addEventListener('keydown', onEscapePress)
        
        return () => {window.removeEventListener('keydown', onEscapePress)}
    }, [closeModal]);

    const onBackdropClick = e => {
        if (e.currentTarget === e.target) {
        closeModal();
    }
    };    
    return (
        <div className={css.Overlay} onClick={onBackdropClick}>
            <div className={css.Modal}>
                <img src={src} alt={alt} />
            </div>
        </div>
        )    
}

// export class Modal extends Component {
//     componentDidMount() {
//         window.addEventListener('keydown', this.onEscapePress);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.onEscapePress);
//     }

//     onEscapePress = e => {
//         if (e.code === 'Escape') {
//         this.props.closeModal();
//         }
//     };

//     onBackdropClick = e => {
//         if (e.currentTarget === e.target) {
//         this.props.closeModal();
//     }
//     };

//     render() {
//     const {src, alt} = this.props

//         return (
//         <div className={css.Overlay} onClick={this.onBackdropClick}>
//             <div className={css.Modal}>
//                 <img src={src} alt={alt} />
//             </div>
//         </div>
//         )
// }
    
// }

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  closeModal: propTypes.func.isRequired,
};