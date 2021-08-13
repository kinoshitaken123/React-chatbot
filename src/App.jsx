import React from 'react';
import defaultDataset from './dataset'
import './assets/styles/style.css'
import { AnswersList } from './components';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     answers: [],              // 回答コンポネートに表示するデータ
     chats: [],                // チャットコンポネートに表示するデータ
     currentId: "init",        // 現在の質問ID
     dateset: defaultDataset,  // 質問と回答のデータセット
     open: false               // 問い合わせフォーム用モーダルの開閉を管理
    };
  }

  initAnswer = () =>{
    const initDataset = this.state.dateset[this.state.currentId];
    const initAnswers  = initDataset.answers;

    this.setState( {
      answers: initAnswers
    })
  }

  componentDidMount() {
    this.initAnswer()
  }

  render () {
  return (
    <section className ="c-section">
     <div className="c-box">
       <AnswersList answers={this.state.answers} />
     </div>
    </section>
  );
 }
}
