// Styles
import './Card.scss';

// External components
import { Link } from 'react-router-dom';

function Card() {
  return (
    <div class="card">
      <h3><Link to="/employee">Clovis</Link></h3>
      <div class="cpf">
        <label> CPF: </label>
        XXX.XXX.XXX-X
      </div>
    </div>
  );
}

export default Card;
