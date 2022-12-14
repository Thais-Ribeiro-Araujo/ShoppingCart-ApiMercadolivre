import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const INITIAL_STATE = {
  emailInput: '',
  isValid: false,
  evalInput: '',
  gradeChosen: 0,
};

export default class EvaluationForm extends Component {
  state = { ...INITIAL_STATE, evalResults: [] };

  componentDidMount() {
    const { evals } = this.props;
    this.setState({ evalResults: evals });
  }

  // altera valores dos inputs
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  // valida os campos do formulário
  validateForm = () => {
    const { emailInput, gradeChosen } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/g;
    const validEmail = emailRegex.test(emailInput);
    const validGrade = gradeChosen > 0;
    const isValid = validEmail && validGrade;
    return isValid;
  }

  // cria divs contendo notas de 1 a 5
  evaluationGrades = () => {
    const maxGrade = 5;
    const auxArray = Array(maxGrade).fill();
    const { gradeChosen } = this.state;

    const grades = auxArray.map((_, ind) => (
      <div
        key={ ind }
        data-testid={ `${ind + 1}-rating` }
        id={ ind + 1 }
        onClick={ this.handleGradeClick }
        role="presentation"
        className={ ind < gradeChosen ? 'colorStar' : 'star' }
      >
        {}
      </div>
    ));
    return grades;
  }

  // altera o estado da nota escolhida
  handleGradeClick = ({ target: { id } }) => this.setState({
    gradeChosen: id });

  // salva avaliação do produto e limpa os campos de avaliação
  handleSubmitClick = () => {
    const { emailInput, evalInput, gradeChosen } = this.state;
    const { product, evals } = this.props;
    const validate = this.validateForm();
    if (validate) {
      localStorage.setItem(product.id, JSON
        .stringify([...evals, { emailInput, evalInput, gradeChosen }]));
      this.setState({
        ...INITIAL_STATE,
        evalResults: [...evals, { emailInput, evalInput, gradeChosen,
        }],
        isValid: true,
      });
    }
  }

  render() {
    const { emailInput, evalInput, evalResults, isValid } = this.state;
    const { evals } = this.props;

    let items = evals;
    if (evalResults.length > 0) items = evalResults;

    return (
      <div className="flexColumn centered evalContainer">
        <br />
        <form className="flexColumn centered">

          {/* campos para avaliar um produto */}
          <label htmlFor="emailInput">
            Email:
            <input
              required
              name="emailInput"
              id="emailInput"
              value={ emailInput }
              onChange={ this.handleChange }
              type="text"
              data-testid="product-detail-email"
            />
          </label>

          <label htmlFor="gradesList">
            Avalie o produto:
            <div className="flex centered">{ this.evaluationGrades() }</div>
          </label>

          <label htmlFor="evalInput">
            Deixe um comentário:
            <textarea
              id="evalInput"
              name="evalInput"
              value={ evalInput }
              onChange={ this.handleChange }
              data-testid="product-detail-evaluation"
              cols="50"
              rows="5"
            />
          </label>

          {/* botão para salvar avaliação */}
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleSubmitClick }
          >
            Enviar avaliação
          </button>

        </form>

        {/* condicional dos campos inválidos */}

        { !isValid && <p data-testid="error-msg">Campos inválidos</p> }

        {/* renderiza todas as avaliações */}
        <section className="savedEvals">
          { Array.isArray(evalResults) && items.map(({
            emailInput: email,
            evalInput: evalu,
            gradeChosen: grade,
          }, ind) => (
            <div key={ ind }>
              <h1 data-testid="review-card-email">{ email }</h1>
              <h1 data-testid="review-card-evaluation">{ evalu }</h1>
              <h1 data-testid="review-card-rating">{ grade }</h1>
            </div>
          ))}
        </section>

      </div>
    );
  }
}

EvaluationForm.defaultProps = {
  product: { id: '' },
};

EvaluationForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
  }),
  evals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
