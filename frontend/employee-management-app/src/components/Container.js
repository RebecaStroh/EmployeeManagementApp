// Components
import Header from '../components/Header';

function Container({children}) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}

export default Container;
