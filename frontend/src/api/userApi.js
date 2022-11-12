import firebase from "firebase"
const userApi = {
    getMe: () => {
        return new Promise((resolve, reject) => {
            const currenUser = firebase.auth().currentUser;
            resolve({
                id: currenUser.uid,
                name: currenUser.displayName,
                email: currenUser.email,
                photoUrl: currenUser.photoURL
            })
        })
    }
}
export default userApi;