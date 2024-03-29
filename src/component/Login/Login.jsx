import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";
const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [user, setUser] = useState(null);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(result => {
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGithubSignIn = () =>{
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const signedUser = result.user;
            setUser(signedUser);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div>

            <h4>Login page</h4>
            {
                user &&
                <div>
                    <h4>User : {user.displayName}</h4>
                    <p>Email: {user.email}</p>
                    <img src={user.photoURL} alt="profile" />
                </div>
            }
            {
                user ?
                    <button onClick={handleGoogleSignOut}>Sign Out</button> :
                    <>
                        <button onClick={handleGoogleSignIn}>Google Login</button>
                        <button onClick={handleGithubSignIn}>GitHub Login</button>
                    </>
            }
        </div>
    );
};

export default Login;