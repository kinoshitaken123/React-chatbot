import React from 'react';
import defaultDataset from './dataset'
import './assets/styles/style.css'

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
  render () {
  return (
    <section className ="c-section">
     <div className="c-box">
     </div>
    </section>
  );
 }
}
