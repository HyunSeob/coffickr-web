import React, { Component } from 'react';
import request from '../../../request';
import './Evaluation.css';

class Evaluation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      questions: [{
        id: '',
        name: '',
        positiveLabel: '',
        negativeLabel: ''
      }],
      currentIndex: 0
    };

    this.currentQuestion = this.currentQuestion.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  componentDidMount() {
    request.get('/place-envs/random?n=2')
      .then(res => {
        this.setState({
          questions: res.data,
          hidden: false
        });
      });
  }

  currentQuestion() {
    return this.state.questions[this.state.currentIndex];
  }

  evaluate(result) {
    request
      .post(
        `/places/${this.props.placeId}/eval`,
        { result, envId: this.currentQuestion().id },
        { withCredentials: true }
      )
      .then((res) => {
        if (this.state.currentIndex === this.state.questions.length - 1) {
          this.props.onCreate();
          this.props.history.push(this.props.match.url.replace('evaluation', 'comment'));
        } else {
          this.setState({ currentIndex: this.state.currentIndex + 1 });
        }
      });
  }

  render() {
    const question = this.state.questions[this.state.currentIndex];
    console.log(this.props.history);

    return (
      <div className={ `EvaluationDialog${ this.state.hidden ? ' EvaluationDialog--Hidden' : '' }` }>
        <div className="EvaluationDialog__Body">
          <h3 className="EvaluationDialog__Question">
            { this.props.placeName }의
            <br/>
            { question.name }은(는) 어땠나요?
          </h3>
          <div className="EvaluationDialog__ButtonList">
            <button
              type="button"
              className="Button Button--Primary EvaluationDialog__ButtonList__Button"
              onClick={ () => this.evaluate('POSITIVE') }>
              { question.positiveLabel }
            </button>
            <button
              type="button"
              className="Button Button--Default EvaluationDialog__ButtonList__Button"
              onClick={ () => this.evaluate('UNKNOWN') }>
              모르겠음
            </button>
            <button
              type="button"
              className="Button Button--Warning EvaluationDialog__ButtonList__Button"
              onClick={ () => this.evaluate('NEGATIVE') }>
              { question.negativeLabel }
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Evaluation;