import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import {useSelector} from 'react-redux'
import 'swiper/css/bundle'
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from "../components/Contact"


function Listing() {
    SwiperCore.use([Navigation])
    const {currentUser} =  useSelector(state => state.user)
    const params = useParams()
    const [copied, setCopied] = useState(false);
    const [listing , setListing] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [contact, setContact] = useState(false)
    
    

  useEffect(()=>{
    
    const fetchListing = async()=>{
        try {
          setLoading(true)
          const res = await fetch(`/api/listing/get/${params.listingId}`)
         const data = await res.json()

        if(data.success === false){
          setError(true)
          setLoading(false)
        }

        setListing(data)
        setLoading(false)
        setError(false)
        } catch (error) {
          setError(true)
          setLoading(false)
        }
      
    } 
    fetchListing ()
  },[params.listingId])

  return (
   <main className="my-7">
     {loading && <p className=" text-center my-7 text-2xl">Loading ...</p> }
     {error && <p className=" text-center my-7 text-2xl">Something went wrong</p> }

     {
      listing && !loading && !error && 
        <div>
        <Swiper navigation>
          {listing.imageUrls.map((url)=>(

            <SwiperSlide key={url}>
                <div className="h-[600px] rounded-lg"
                style={{background: `url(${url}) center no-repeat`,
                backgroundSize:'cover'}}>

                </div>
            </SwiperSlide>
          ))}  
        </Swiper>


        <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
        

        {/** 
          Updating Listing
*/}


         <div className="flex max-w-4xl mx-auto flex-col p-3 gap-4">

          <p className="font-semibold text-2xl">
            {listing.name} - ${` `}
            {listing.offer ? 
            listing.discountPrice.toLocaleString('en-us') :
            listing.regularPrice.toLocaleString('en-us')}
            {listing.type === 'rent' && ' /month'}
          </p>

          <p className="flex gap-2 mt-3 items-center text-slate-600 text-sm">
            <FaMapMarkerAlt className="text-green-700"/>
            {listing.address}
          </p>

          <div className="flex gap-4">
            <p className="bg-red-900 w-full text-white max-w-[200px] text-center rounded-md p-1">
             {listing.type === 'rent' ? "For Rent" : "For Sale"}
            </p> 
            {listing.offer && (
              <p className="bg-green-700 w-full max-w-[200px]  rounded-md text-center text-white" >
              ${+listing.regularPrice - +listing.discountPrice} discount
              </p>
            )}
          </div>

          <p>
            <span className="text-black font-semibold">
            Description - {' '}
            </span>
          {listing.description}
          </p>

          <ul className=" text-green-900 font-semibold  text-sm flex gap-4 sm:gap-6 items-center flex-wrap">

            <li className=" flex items-center gap-1 whitespace-nowrap">
              <FaBed className="text-lg"/>
              {listing.bedrooms  && (
                 listing.bedrooms >1 ? `${listing.bedrooms} beds` :
                 `${listing.bedrooms} bed`
              )}
            </li>

            <li className=" flex items-center gap-1 whitespace-nowrap">
              <FaBath className="text-lg"/>
              {listing.bedrooms  && (
                 listing.bathrooms >1 ? `${listing.bathrooms} baths` :
                 `${listing.bathrooms} bath`
              )}
            </li>

            <li className=" flex items-center gap-1 whitespace-nowrap">
              <FaParking className="text-lg"/>
              {listing.parking ? 'Parking spot' : 'No Parking'}
            </li>

            <li className=" flex items-center gap-1 whitespace-nowrap">
              <FaChair className="text-lg"/>
              { listing.furnished ? 'furnished' :'Unfurnished'
              }
            </li>

            
          </ul>

          {/**Contact landlord */}
          {
            currentUser && listing.userRef !== currentUser._id && !contact &&
            <button onClick={()=> setContact(true)} className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95">
            Contact Landlord
          </button> 
          }

          {contact && <Contact listing={listing}/>}
          


         </div>

        
        </div>
     }

   </main>
    
  )
}

export default Listing