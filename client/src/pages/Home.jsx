import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";
import Contact from "../pages/Contact";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import largeHouseImage from '../assets/large-houses-to-rent-for-weekends.jpg';
import backgroundImage from '../assets/user101.jpeg';



function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  // console.log(offerListings)
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();

        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();

        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();

        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      <div className="">
      <div className="relative">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  ></div>

  {/* Text Content */}
  <div className="flex flex-col items-center justify-center p-8 lg:p-28 px-3 max-w-6xl mx-auto z-10">
    <h1 className="text-3xl text-slate-700 font-bold lg:text-6xl text-center">
      Find your next <span className="text-slate-500">perfect</span>
      <br />
      place with ease
    </h1>

    <div className="text-gray-400 text-xs sm:text-sm text-center mt-4">
      Mikist Estate will help you find your home fast, easy, and comfortable.
      <br />
      Our expert support is always available.
    </div>

    <Link
      className="text-xs sm:text-sm text-blue-800 font-bold hover:underline mt-4"
      to={"/search"}
    >
      Let's get started ...
    </Link>
  </div>
</div>
</div>


      {/** swiper*
      <Swiper navigation>
      <div className="max-w-6xl mx-auto p-3 flex flex-colm gap-8 my-10">
         {offerListings && offerListings.length > 0 && 
         offerListings.map((listing) => (
         <SwiperSlide key={listing._id}>
         <div 
          style={{
            background: `url(${listing.imageUrls[0]}) no-repeat center`,
            backgroundSize: 'cover',
          }}
          className="h-[500px] "  key={listing._id}
        ></div>
          </SwiperSlide>
        ))}
        </div>
      </Swiper>
   /}

      {/**listing results */}

      <div className="max-w-8xl mx-auto p-3 flex flex-colm gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <div className="my-3">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-600">
                      Recent offers
                    </h2>
                    <Link
                      className="text-sm hover:underline text-blue-800"
                      to={"/search?type=rent"}
                    >
                      Show more offers
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 font-semibold uppercase">
                    <FiChevronLeft className="text-4xl bg-white rounded-3xl" />
                    <FiChevronRight className="text-4xl bg-white rounded-3xl" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <div
                  className=" flex flex-wrap gap-4 w-full sm:w-[330px]"
                  key={listing._id}
                >
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-8xl mx-auto p-3 flex flex-colm gap-8 my-10">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-600">
                    Recent places for rent
                  </h2>
                  <Link
                    className="text-sm hover:underline text-blue-800"
                    to={"/search?type=rent"}
                  >
                    Show more places for rent
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-semibold uppercase">
                  <FiChevronLeft className="text-4xl bg-white rounded-3xl" />
                  <FiChevronRight className="text-4xl bg-white rounded-3xl" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <div
                  className=" flex flex-wrap gap-4 w-full sm:w-[330px]"
                  key={listing._id}
                >
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-8xl mx-auto p-3 flex flex-colm gap-8 my-10">
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <div className="my-3">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-600">
                      Recent places for sale
                    </h2>
                    <Link
                      className="text-sm hover:underline text-blue-800"
                      to={"/search?type=sale"}
                    >
                      Show more places for sale
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 font-semibold uppercase">
                    <FiChevronLeft className="text-4xl bg-white rounded-3xl" />
                    <FiChevronRight className="text-4xl bg-white rounded-3xl" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <div
                  className=" flex flex-wrap gap-4 w-full sm:w-[330px]"
                  key={listing._id}
                >
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/**Contact */}
      {
        
        <div className="">
   <Contact  />
  //<img src={largeHouseImage} alt="rgzzzzzzzzzzzzzzzzzzzzzzzz" />

        </div>
        
        }
        
        
    </div>
  );
}

export default Home;
