// Components
import Header from '../components/Header';

// Styles
import './Container.scss';

function Container({children}) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}

export default Container;
