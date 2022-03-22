import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

function Profile() {
  const [user, setUser] = useState(null)
  // Gets the current user from the db 
  const auth = getAuth()
  useEffect(() => {
    setUser(auth.currentUser)
  }, [])
  // checks if there is a user and display the name if not returns "Not logged In"
  return user ? <h1>{user.displayName}</h1> : 'Not Logged In'
}

export default Profile