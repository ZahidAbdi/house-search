import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {
    collection, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    limit, 
    startAfter
} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'
import ListingItem from '../components/ListingItem'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
      const fetchListing = async () => {
        try {
          // Get reference 
          const listingsRef = collection(db, 'listings')
          // Create a query
          const q = query(
            listingsRef, 
            where('type', '==', params.categoryName), 
            orderBy('timestamp', 'desc'), 
            limit(10)
          )
          
          // Execute the query
          const querySnap = await getDocs(q)

          const listings = []

          querySnap.forEach((doc) => {
            // console.log(doc.data());
            return listings.push({
              id: doc.id,
              data: doc.data()
            })
          })

          setListings(listings)
          setLoading(false)
        } catch (error) {
          toast.error('Could not fetch listings')
        }
      }

    fetchListing()
  }, [params.categoryName])

  return (
    <div className='category'>
      <header>
       <p className="pageHeader">
         {params.categoryName === 'rent' 
         ? 'Places for Rent' 
         : 'Places for Sale'}
        </p> 
      </header>
      {loading ? (
        <LoadingSpinner /> 
      ) : listings && listings.length > 0 ? ( 
        <>
        <main>
          <ul className="categoryListings">
            {listings.map((listing) => (
              <ListingItem 
                listing= {listing.data} 
                id= {listing.id} 
                key= {listing.id} 
              />
            ))}
          </ul>
        </main>
        </> 
      ) : ( 
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category