import React from 'react';
import './assets/styles/style.css'
import defaultDataset from './dataset'
import { AnswersList, Chats } from './components/index'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     answers: [],              // 回答コンポネートに表示するデータ
     chats: [],                // チャットコンポネートに表示するデータ
     currentId: "init",        // 現在の質問ID
     dateset: defaultDataset,  // 質問と回答のデータセット
     open: false               // 問い合わせフォーム用モーダルの開閉を管理
    }
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClickOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  // 次の質問をチャットエリアに表示する関数
  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState( {
      answers: this.state.database[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  } 

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId === 'init'):
         setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
         break;
         
      case (nextQuestionId === 'contact'):
        this.handleClose();
        break;

      // リンクが選択された時
      case /^https:*/.test(nextQuestionId):
        const a  = document.createElement('a');
        a.href   = nextQuestionId;
        a.target = '_blanck'; // 別タブでブラウザを開く
        a.click();
        break;

      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        })  

        this.setState({
          chats: chats
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
        break;
    }
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
      this.setState({open: false});
  };

  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.clientHeight;
    }
  }

  render () {
  return (
    <section className ="c-section">
     <div className="c-box">
       <Chats chats={this.state.chats} />
       <AnswersList answers={this.state.answers}
       　　　　　　　 select={this.selectAnswer} 
       />
       <FormDialog open={this.state.open} handleClose={this.handleClose} />
     </div>
    </section>
  );
 }
}
