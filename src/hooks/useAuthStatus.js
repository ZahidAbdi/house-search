import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStutus] = useState(true)
	const isMounted = useRef(true)

	useEffect(() => {
		if (isMounted) {
			const auth = getAuth()
			onAuthStateChanged(auth, user => {
				// check to see if logged in
				if (user) {
					// set loggedIn to true
					setLoggedIn(true)
				}
				// after response set checkingStatus to false
				setCheckingStutus(false)
			})
		}

		return () => {
			isMounted.current = false
		}
	}, [isMounted])
	return { loggedIn, checkingStatus }
}

// to fix the memory leek because it's the async promise call, so you must use a mutable reference variable (with useRef) to check already unmounted component for the next treatment of async response (avoiding memory leaks)
