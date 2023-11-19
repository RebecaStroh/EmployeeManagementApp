// Components
import Container from './Container';

// Styles
import './Employee.scss';

function Employee() {
  return (
    <Container>
      <div className="employee-content">
        <div class="info-card">
          <h1>John Doe</h1>
          <div class="info-item">
            <label for="dob">Birth of Date:</label>
            <div id="dob">1990-01-01</div>
          </div>
          <div class="info-item">
            <label for="cpf">CPF:</label>
            <div id="cpf">123.456.789-01</div>
          </div>
          <div class="info-item">
            <label for="email">Email:</label>
            <div id="email">john.doe@example.com</div>
          </div>
          <div class="info-item">
            <label for="phone">Cellphone Number:</label>
            <div id="phone">1234567890</div>
          </div>
          <div class="info-item">
            <label for="street">Address - Street:</label>
            <div id="street">123 Main Street</div>
          </div>
          <div class="info-item">
            <label for="number">Address - Number:</label>
            <div id="number">456</div>
          </div>
          <div class="info-item">
            <label for="city">Address - City:</label>
            <div id="city">Cityville</div>
          </div>
          <div class="info-item">
            <label for="state">Address - State:</label>
            <div id="state">ST</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Employee;
