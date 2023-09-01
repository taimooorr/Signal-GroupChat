import { initializeApp, getApps, } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  updateProfile
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc

} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDggKfC4b0a0FME-pnzagTAw5PYiSk5PK8",
  authDomain: "signalchat-751be.firebaseapp.com",
  projectId: "signalchat-751be",
  storageBucket: "signalchat-751be.appspot.com",
  messagingSenderId: "364000840592",
  appId: "1:364000840592:web:fadbbba21b76c060bb8115",
  measurementId: "G-2ZJ8SJD7K4"
};


let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

const createAuthUserWithEmailAndPassword = async (email, password, fullName, imageUrl) => {
  if (!email || !password) {
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: fullName,
      email: email,
      photoURL: imageUrl || "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
    });
  } catch (error) {
    alert(error.message);
  }
};

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
const signOutAuthUser = async () => {
  return await signOut(auth);
}
const onAuthStateChangedAuthUser = async (callback) => {
  return onAuthStateChanged(auth, callback);
}

const createChat = async (chatName) => {
  await addDoc(collection(db, 'chats'), {
    chatName: chatName,
  })
    .catch((error) => {
      alert(error.message)
    });
};
const getChats = async () => {
  const querySnapshot = await getDocs(collection(db, "chats"));
  const chats = [];
  querySnapshot.forEach((doc) => {
    chats.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return chats;
};
const sendMessage = async (chatId, message) => {
  await addDoc(collection(db, 'chats', chatId, 'messages'), {
    timestamp: new Date(),
    message: message,
    displayName: auth.currentUser.displayName,
    email: auth.currentUser.email,
    photoURL: auth.currentUser.photoURL,
  })
    .catch((error) => {
      alert(error.message)
    });
};
const getMessages = async (chatId) => {
  const querySnapshot = await getDocs(collection(db, 'chats', chatId, 'messages'));
  const messages = [];
  querySnapshot.forEach((doc) => {
    messages.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return messages;
};
export {getChats, sendMessage, getMessages, db, auth, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword, signOutAuthUser, onAuthStateChangedAuthUser, createChat };