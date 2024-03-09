import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper-bundle.css';
import {Navigation} from 'swiper/modules'
import ListingItem from "../components/ListingItem";


function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])
  console.log(offerListings)
  useEffect(()=>{
    const fetchOfferListings = async () => {

      try {
       const res = await fetch(`/api/listing/get?offer=true&limit=4`)
       const data = await res.json()

       setOfferListings(data)
       fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const data = await res.json()
 
        setRentListings(data)
        fetchSaleListings()
       } catch (error) {
         console.log(error)
       }
    }

    const fetchSaleListings = async () => {
     
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`)
        const data = await res.json()
 
        setSaleListings(data)
       } catch (error) {
         console.log(error)
       }
    }
    fetchOfferListings()

    
    
  }, [])

  return (
    <div>

      {/** top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className=" text-3xl text-slate-700 font-bold lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>

        <div className="text-gray-400 text-xs sm:text-sm">
          Mikist Estate will help you find your home fast, easy and comfortable.
          <br />
          Our expert support are always available.
        </div>
        <Link className="text-xs sm:text-sm text-blue-800 font-bold hover:underline" to={'/search'}>
          Let's get started ...
        </Link>
      </div>

      {/** swiper*/}
      <Swiper navigation>
         {offerListings && offerListings.length > 0 && 
         offerListings.map((listing) => (
         <SwiperSlide key={listing._id}>
         <div 
          style={{
            background: `url(${listing.imageUrls[0]}) no-repeat center`,
            backgroundSize: 'cover',
          }}
          className="h-[500px]"  key={listing._id}
        ></div>
          </SwiperSlide>
        ))}
      </Swiper>


      {/**listing results */}

      <div className="max-w-6xl mx-auto p-3 flex flex-colm gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className=" text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link className="text-sm hover:underline text-blue-800" to={'/search?offer=true'}>Show more offers

              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing)=> (
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-colm gap-8 my-10">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className=" text-2xl font-semibold text-slate-600">Recent places for rent</h2>
              <Link className="text-sm hover:underline text-blue-800" to={'/search?type=rent'}>Show more places for rent

              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing)=> (
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-colm gap-8 my-10">
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className=" text-2xl font-semibold text-slate-600">Recent places for sale</h2>
              <Link className="text-sm hover:underline text-blue-800" to={'/search?type=sale'}>Show more places for sale

              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing)=> (
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}
      </div>

      

    </div>
  
  )
}

export default Home