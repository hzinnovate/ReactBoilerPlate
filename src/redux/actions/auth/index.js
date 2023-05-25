import { types } from '../../actionTypes';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../../../firebaseConfig';

export const signout = () => async (dispatch) => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
};

export const signin = (email, password) => async (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message)
        });
}