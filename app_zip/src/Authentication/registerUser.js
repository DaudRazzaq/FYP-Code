import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../hooks/NewFireBaseCOnfig';

export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    });

    return null;
  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === 'auth/email-already-in-use') {
      return 'Email is already in use.';
    } else if (err.code === 'auth/weak-password') {
      return 'Password must be at least 6 characters.';
    } else if (err.code === 'auth/invalid-email') {
      return 'Invalid email format.';
    } else {
      return 'Something went wrong. Please try again.';
    }
  }
};

