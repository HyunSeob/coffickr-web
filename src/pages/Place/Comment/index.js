import React, { Component } from 'react';
import request from '../../../request';
import './Comment.css';

const MIN_COMMENT_LENGTH = 10;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      comment: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.requestComment = this.requestComment.bind(this);
  }

  componentDidMount() {
    this.setState({ hidden: false });
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  requestComment() {
    const redirectToPlacePage = () => {
      this.props.history.push(this.props.match.url.replace('/comment', ''));
    };

    if (this.state.comment.length < MIN_COMMENT_LENGTH) {
      return redirectToPlacePage();
    }

    request
      .post(
        `/places/${ this.props.placeId }/comment`,
        { content: this.state.comment },
        { withCredentials: true }
      )
      .then(() => {
        this.props.onCreate();
        redirectToPlacePage();
      });
  }

  render() {
    const enoughLength = this.state.comment.length <= MIN_COMMENT_LENGTH;

    return (
      <div className={ `CommentDialog${ this.state.hidden ? ' CommentDialog--Hidden' : '' }` }>
        <h3 className="CommentDialog__Header">
          { this.props.placeName }은(는) 어땠나요?
        </h3>
        <textarea
          className="CommentDialog__Body"
          placeholder="의견을 남겨주세요"
          onChange={ this.handleChange } />
        <button
          className={ `Button Button--Large ${ enoughLength ? 'Button--Default' : 'Button--Primary' } CommentDialog__Button` }
          onClick={ this.requestComment }>
          { enoughLength ? '건너뛰기' : '제출하기' }
        </button>
      </div>
    );
  }
}

export default Comment;