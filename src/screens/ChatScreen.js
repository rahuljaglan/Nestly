import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../utils/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

export default function ChatScreen({ route }) {
  const { match } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'matches', match.id, 'messages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  const onSend = useCallback(async (msgs = []) => {
    const { _id, createdAt, text, user } = msgs[0];
    await addDoc(collection(db, 'matches', match.id, 'messages'), {
      text,
      createdAt: serverTimestamp(),
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        avatar: auth.currentUser.photoURL,
      }}
    />
  );
}
