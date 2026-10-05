import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  arrayUnion,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_PIXABAY_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PIXABAY_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PIXABAY_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PIXABAY_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PIXABAY_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Only one useEffect needed: for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Auth methods (return promises directly)
  const signUpWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const logInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const userWithGoogleAccount = () =>
    signInWithPopup(firebaseAuth, googleProvider);

  const logOut = () => signOut(firebaseAuth);

  // Firestore methods
  const addToFavorites = async (imageId, imageURL, imageType, currentTime) => {
    if (!user) throw new Error("User not logged in");
    return setDoc(
      doc(firestore, "users", user.uid),
      {
        favorites: arrayUnion({
          id: imageId,
          url: imageURL,
          type: imageType,
          time: currentTime,
        }),
      },
      { merge: true },
    );
  };

  const getFavoriteImages = async () => {
    if (!user) return [];
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    return userDoc.exists() ? userDoc.data().favorites || [] : [];
  };

  const removeFromFavorites = async (imageId) => {
    if (!user) throw new Error("User not logged in");
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    if (userDoc.exists()) {
      const favorites = userDoc.data().favorites || [];
      const updated = favorites.filter((f) => f.id !== imageId);
      return updateDoc(doc(firestore, "users", user.uid), {
        favorites: updated,
      });
    }
  };

  const addToDownloads = async (imageId, imageURL, imageType, currentTime) => {
    if (!user) throw new Error("User not logged in");
    return setDoc(
      doc(firestore, "users", user.uid),
      {
        downloads: arrayUnion({
          id: imageId,
          url: imageURL,
          type: imageType,
          time: currentTime,
        }),
      },
      { merge: true },
    );
  };

  const getDownloads = async () => {
    if (!user) return [];
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    return userDoc.exists() ? userDoc.data().downloads || [] : [];
  };

  const removeFromDownloads = async (imageId) => {
    if (!user) throw new Error("User not logged in");
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    if (userDoc.exists()) {
      const downloads = userDoc.data().downloads || [];
      const updated = downloads.filter((d) => d.id !== imageId);
      return updateDoc(doc(firestore, "users", user.uid), {
        downloads: updated,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        signUpWithEmailAndPassword,
        logInWithEmailAndPassword,
        userWithGoogleAccount,
        logOut,
        addToFavorites,
        getFavoriteImages,
        removeFromFavorites,
        addToDownloads,
        getDownloads,
        removeFromDownloads,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
