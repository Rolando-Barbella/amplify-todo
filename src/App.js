import { DataStore } from '@aws-amplify/datastore';
import '@aws-amplify/ui/dist/style.css';
import React, { useEffect, useState } from 'react';
import { FiHeart, FiMessageSquare, FiRepeat } from "react-icons/fi";
import './App.css';
import { Tweet } from './models';

function App() {
  const [tweets, updateTweets] = useState([]);
  const [likes, setUpdateLikes] = useState(0);

  useEffect(() => {
    fetchTweets();
    const subscription = DataStore.observe(Tweet).subscribe(() => fetchTweets());
    return () => subscription.unsubscribe();
  }, [])

  async function fetchTweets() {
    const tweets = await DataStore.query(Tweet);
    updateTweets(tweets);
  }

  // async function createTweet() {
  //   await DataStore.save(new Tweet([{ tweet: 'Aws amplify is anwesone', retweet: 0, likes: likes + 1 }]))
  // }

  async function updateTweet() {
    const original = await DataStore.query(Tweet,"a745e7ab-cb09-4de1-865f-ab97187cf723");
    debugger
    await DataStore.save(Tweet.copyOf(original, updated => {
      debugger
      updated.id = "a745e7ab-cb09-4de1-865f-ab97187cf723";
      updated.tweet = 'Aws amplify is anwesone 12';
      updated.retweet = 0;
      updated.likes = updated.likes + 1
    }),
  )}

  console.log(tweets);
  if (tweets.length === 0) {
    return "...loading"
  }
  return (
    <div className="tweets-container">
      <div className="card tweets-header">
        Tweets
      </div>
      <div className="card tweet">
        <a className="author">
          <img className="avatar" src="https://lorempixel.com/48/48/" />
          <span className="name">Jamie Ecmascript</span>
          <span className="username">@jscript</span>
        </a>
        <div className="content">
          Hello World!
        </div>
        <div className="actions">
          <span className="fa fa-reply"></span>
          <span className="fa fa-retweet"></span>
          <span className="fa fa-heart"></span>
        </div>
      </div>
      <div className="card tweet">
        <a className="author">
          <img className="avatar" src="https://lorempixel.com/48/48/" />
          <span className="name">Jamie Ecmascript</span>
          <span className="username">@jscript</span>
        </a>
        <div className="content">
          <p>
            You should check out Bytecamp:
            <a href="https://bytecamp.io">
              https://bytecamp.io
            </a>
          </p>
          <a>
            <div className="card summary">
              <img className="background" src="https://lorempixel.com/600/300/" />
              <div className="information">
                <div className="title">Bytecamp - Houston's Code School</div>
                <div className="description">
                  Become a full-stack software engineer at our Houston code school ...
                </div>
                <div className="domain">
                  bytecamp.io
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="actions">
          <div className="fa fa-heart icon">
            <FiMessageSquare size="20" />
            <p>2</p>
          </div>
          <div className="fa fa-heart icon" onClick={() => updateTweet()}>
            <FiHeart size="20" />
            <p>{tweets[0][0].likes}</p>
          </div>
          <div className="fa fa-heart icon">
            <FiRepeat size="22" />
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


