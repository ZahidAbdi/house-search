import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'


function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()


    const onGoogleClick = async () => {
      try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        // check to see if the user exists in the fire-store 
        // doc takes in 3 things; the database, the name of the collection, and the user id
        const docRef = doc(db, 'users', user.uid)
        // get the snapshot of the doc 
        const docSnap = await getDoc(docRef)
        // if user doesnt exist, create the user
        if(!docSnap.exists()){
          await setDoc(doc(db, 'users', user.uid), {
            name: user.displayName,
            email: user.email,
            timestamp: serverTimestamp()
          })
        }
        navigate('/')
      } catch (error) {
        toast.error("Couldn't authorize with Google")
      }
    }

  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt="google" />
        </button>
    </div>
  )
}

export default OAuth