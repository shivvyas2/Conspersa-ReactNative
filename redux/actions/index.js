import { USER_STATE_CHANGE, USER_CHAT_CHANGE } from "../constants";
import { db, auth } from "../../Firebase";

export function fetchUser() {
  return (dispatch) => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      db.collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
          } else {
            console.log("User does not exist");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}

export function fetchUserChats() {
  return (dispatch) => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      db.collection("chats")
        .where("participants", "array-contains", uid)
        .onSnapshot((snapshot) => {
          let chats = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch({ type: USER_CHAT_CHANGE, chats });
        });
    }
  };
}
