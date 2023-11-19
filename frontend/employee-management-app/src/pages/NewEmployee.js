// Components
import Container from './Container';

// Styles
import './NewEmployee.scss';

function NewEmployee() {
  return (
    <Container>
      <div className="new-employee-content">
        <h1> New employee</h1>
        <form id="new-employee">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required/>
          </div>

          <div class="form-group">
            <label for="dob">Birth of Date:</label>
            <input type="date" id="dob" name="dob"/>
          </div>

          <div class="form-group">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="123.456.789-01" required/>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"/>
          </div>

          <div class="form-group">
            <label for="phone">Cellphone Number:</label>
            <input type="tel" id="phone" name="phone" pattern="\d{10,}" placeholder="1234567890"/>
          </div>

          <div class="form-group">
            <label for="street">Address - Street:</label>
            <input type="text" id="street" name="street"/>
          </div>

          <div class="form-group">
            <label for="number">Address - Number:</label>
            <input type="text" id="number" name="number"/>
          </div>

          <div class="form-group">
            <label for="city">Address - City:</label>
            <input type="text" id="city" name="city"/>
          </div>

          <div class="form-group">
            <label for="state">Address - State:</label>
            <input type="text" id="state" name="state"/>
          </div>

          <div class="form-group">
            <label for="document">Upload Document:</label>
            <div class="file-upload">
              <input type="file" id="document" name="document" accept=".pdf, .doc, .docx"/>
            </div>
          </div>

          <div class="form-group">
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default NewEmployee;
