import React, { useState } from 'react'; 
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAmpUv41j07ddqz1OLXf0x1pL_vBns7QUo",
  authDomain: "realtime-chat-app-4e222.firebaseapp.com",
  projectId: "realtime-chat-app-4e222",
  storageBucket: "realtime-chat-app-4e222.appspot.com",
  messagingSenderId: "532329483522",
  appId: "1:532329483522:web:cf1df7dded6174cff4c61b",
  measurementId: "G-0FC6QSZQWW"
})

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
      
      </header>

      <section>
        {user ? <Chatroom/> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }


  return (
    <button onClick={signInWithGoogle}>Sign In With Google</button>

  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>

  )
}

function Chatroom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form>

        <input value={formValue} onChange={(e) => setFormValue} />

        <button type='submit'>Send</button>

        




      </form>


      
    </>
  )
  
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return ( 
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  
  )
}

export default App;
