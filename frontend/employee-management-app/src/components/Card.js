// Styles
import './Card.scss';

// External components
import { Link } from 'react-router-dom';

function Card({employee}) {
  return (
    <div className="card">
      <h3><Link to="/employee" state={{ employee }}>{employee.name}</Link></h3>
      <div className="cpf">
        <label> CPF: </label>
        {employee.cpf}
      </div>
    </div>
  );
}

export default Card;
