import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import OAuth from '../components/OAuth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
 
 function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // Getting the auth value from 'getAuth'
      const auth = getAuth()
      
      
      // registering the new user with 'createUserWithEmailAndPassword' that returns a promise and putting it into 'userCredential'
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      
      
      // get the user info from the db
      const user = userCredential.user
      
      
      // just updating the display name 
      updateProfile(auth.currentUser, {
        displayName: name,
       })

      //  Copying everything in the formData state
       const formDataCopy = {...formData}
       delete formDataCopy.password
       formDataCopy.timestamp = serverTimestamp()

       await setDoc(doc(db, 'users', user.uid), formDataCopy)

      // redirects to home
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome!</p> 
        </header>

        <form onSubmit={onSubmit}> 
          <input 
              type="text" 
              className='nameInput' 
              placeholder='Name' 
              id='name' 
              value={name} 
              onChange={onChange} 
            />
            <input 
              type="email" 
              className='emailInput' 
              placeholder='Email' 
              id='email' 
              value={email} 
              onChange={onChange} 
            />

            <div className="passwordInputDiv">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className='passwordInput' 
                placeholder='Password' 
                id='password' 
                value={password} 
                onChange={onChange}
              />
              <img 
                src={visibilityIcon} 
                alt="show password" 
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)} 
                /* if true it'll change state to false and if its false it'll change to true */
              /> 
            </div>

            <Link 
              to='/forgot-password' 
              className='forgotPasswordLink'>
                Forgot Password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">
                Sign Up
              </p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
              </button>
            </div>
        </form>

          <OAuth />

          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
      </div>
    </> 
  )
}

export default SignUp