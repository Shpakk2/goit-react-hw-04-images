import { Circles } from 'react-loader-spinner'

import css from 'components/Loader/Loader.module.css'

export const Loader = () => {
    return (
        <Circles class={css.loader}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{position: 'absolute', top: '50%', left: '50%'}}
  wrapperClass=""
  visible={true}
/>
    )
}