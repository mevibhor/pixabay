import { createContext, useContext, useEffect, useState } from "react";

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

import { getFirestore, doc, getDoc, runTransaction } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_PIXABAY_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PIXABAY_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PIXABAY_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PIXABAY_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("useFirebase must be used inside FirebaseProvider");
  }

  return context;
};

const getUserDocument = (uid) => {
  return doc(firestore, "users", uid);
};

const removeDuplicateItems = (items = []) => {
  const seen = new Set();

  return items.filter((item) => {
    const id = String(item.id);

    if (seen.has(id)) {
      return false;
    }

    seen.add(id);
    return true;
  });
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // ------------------------------------------
  // Authentication
  // ------------------------------------------

  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const userWithGoogleAccount = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const logOut = () => {
    return signOut(firebaseAuth);
  };

  // ------------------------------------------
  // Favorites
  // ------------------------------------------

  const addToFavorites = async ({ id, url, type, time }) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    const userRef = getUserDocument(user.uid);

    await runTransaction(firestore, async (transaction) => {
      const userSnapshot = await transaction.get(userRef);

      const currentFavorites = userSnapshot.exists()
        ? userSnapshot.data().favorites || []
        : [];

      const favorites = removeDuplicateItems(currentFavorites);

      const alreadyExists = favorites.some(
        (item) => String(item.id) === String(id),
      );

      if (alreadyExists) {
        return;
      }

      favorites.unshift({
        id,
        url,
        type,
        time,
      });

      transaction.set(
        userRef,
        {
          favorites,
        },
        { merge: true },
      );
    });
  };

  const getFavoriteImages = async () => {
    if (!user) {
      return [];
    }

    const userSnapshot = await getDoc(getUserDocument(user.uid));

    if (!userSnapshot.exists()) {
      return [];
    }

    const favorites = userSnapshot.data().favorites || [];

    return removeDuplicateItems(favorites);
  };

  const removeFromFavorites = async (imageId) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    const userRef = getUserDocument(user.uid);

    await runTransaction(firestore, async (transaction) => {
      const userSnapshot = await transaction.get(userRef);

      if (!userSnapshot.exists()) {
        return;
      }

      const favorites = userSnapshot.data().favorites || [];

      const updatedFavorites = favorites.filter(
        (item) => String(item.id) !== String(imageId),
      );

      transaction.set(
        userRef,
        {
          favorites: updatedFavorites,
        },
        { merge: true },
      );
    });
  };

  // ------------------------------------------
  // Downloads
  // ------------------------------------------

  const addToDownloads = async ({ id, url, type, time }) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    const userRef = getUserDocument(user.uid);

    await runTransaction(firestore, async (transaction) => {
      const userSnapshot = await transaction.get(userRef);

      const currentDownloads = userSnapshot.exists()
        ? userSnapshot.data().downloads || []
        : [];

      const downloads = removeDuplicateItems(currentDownloads);

      const alreadyExists = downloads.some(
        (item) => String(item.id) === String(id),
      );

      if (alreadyExists) {
        return;
      }

      downloads.unshift({
        id,
        url,
        type,
        time,
      });

      transaction.set(
        userRef,
        {
          downloads,
        },
        { merge: true },
      );
    });
  };

  const getDownloads = async () => {
    if (!user) {
      return [];
    }

    const userSnapshot = await getDoc(getUserDocument(user.uid));

    if (!userSnapshot.exists()) {
      return [];
    }

    const downloads = userSnapshot.data().downloads || [];

    return removeDuplicateItems(downloads);
  };

  const removeFromDownloads = async (imageId) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    const userRef = getUserDocument(user.uid);

    await runTransaction(firestore, async (transaction) => {
      const userSnapshot = await transaction.get(userRef);

      if (!userSnapshot.exists()) {
        return;
      }

      const downloads = userSnapshot.data().downloads || [];

      const updatedDownloads = downloads.filter(
        (item) => String(item.id) !== String(imageId),
      );

      transaction.set(
        userRef,
        {
          downloads: updatedDownloads,
        },
        { merge: true },
      );
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,

        isLoggedIn: !!user,

        isAuthLoading,

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
