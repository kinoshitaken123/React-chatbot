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
        this.displayNextQuestion(nextQuestionId)
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

        this.displayNextQuestion(nextQuestionId)
        break;
    }
  }

  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  render () {
  return (
    <section className ="c-section">
     <div className="c-box">
       <Chats chats={this.state.chats} />
       <AnswersList answers={this.state.answers}
       　　　　　　　 select={this.selectAnswer} 
       />
     </div>
    </section>
  );
 }
}
