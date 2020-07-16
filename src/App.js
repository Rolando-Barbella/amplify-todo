import { DataStore } from '@aws-amplify/datastore';
import '@aws-amplify/ui/dist/style.css';
import React, { useEffect, useState } from 'react';
import {  FiMessageSquare, FiRepeat } from "react-icons/fi";
import './App.css';
import { Tweet, Post } from './models';
import cat from './download.jpeg'
import profile from './profile.jpeg'

function App() {
  const [tweets, updateTweets] = useState([]);
  const [posts, updatePosts] = useState([]);
  const [likes, setLike] = useState(false);
  const [updateLike, setUpdateLike] = useState(false);

  useEffect(() => {
    fetchTweets();
    createPost();
    // DataStore.delete(Post, c => c.status("eq", true));
    const subscription = DataStore.observe(Tweet).subscribe(() => fetchTweets());
    return () => subscription.unsubscribe();
  }, [updateLike])

  useEffect(() => {
    const interval = setInterval(async() => {
      const original = await DataStore.query(Post, "00c33bf3-f5ba-45fe-bc87-5738549b88db");

      await DataStore.save(
        Post.copyOf(original, updated => {
          updated.title = updated.title;
          updated.status = false;
          updated.rating = updated.rating;
          updated.retweet = updated.retweet + 1;
        })
      );
      await setUpdateLike(!updateLike)
    }, 1000);
    return () => clearInterval(interval);
  }, [updateLike]);

  async function fetchTweets() {
    const tweets = await DataStore.query(Tweet);
    const posts = await DataStore.query(Post)
    updateTweets(tweets);
    updatePosts(posts)
  }

  // async function createTweet() {
  //   await DataStore.save(new Tweet([{ tweet: 'Aws amplify is anwesone', retweet: 0, likes: likes + 1 }]))
  // }

  async function createPost() {
    await DataStore.save(
      new Post({
        title: "My First Post",
        rating: 10,
        status: true,
        retweet: 5
      })
    );
  }

  async function updateTweet(id) {
    const original = await DataStore.query(Post, id);
    await DataStore.save(
      Post.copyOf(original, updated => {
        updated.title = `My new title`;
        updated.status = false;
        updated.rating = updated.rating + 1;
        updated.retweet = updated.retweet;
      })
    );
    await setUpdateLike(true)
  }

  if (posts.length === 0) {
    return "...loading"
  }
  console.log(posts[0].rating)
  console.log('retweet', posts[0].retweet)
  return (
    <div className="tweets-container">
      <div className="card tweets-header">
        Tweets
      </div>
      <div className="card tweet">
        <a className="author">
          <img className="avatar" src={profile} />
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
          <img className="avatar" src={profile} />
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
              <img className="background" src={cat} />
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
          <div className="fa fa-heart icon" onClick={() => updateTweet(posts[0].id)}>
            <div 
              onClick={() => setLike(true)} 
              className={`heart-2 heart-blast`}
            />
            <p style={{marginLeft: -70}}>{posts[0].rating}</p>        
          </div>
          <div className="fa fa-heart icon">
            <FiRepeat size="22" />
            <p>{posts[0].retweet}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


