import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";
import Contact from "../pages/Contact";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import largeHouseImage from "../assets/large-houses-to-rent-for-weekends.jpg";
import backgroundImage from "../assets/user101.jpeg";
import backgroundImages from "../assets/footer-art.svg";
import { FaSearch } from "react-icons/fa";

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
        <div className="relative mt-2 rounded-lg">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>

          {/* Text Content */}
          <div className="flex flex-col items-center justify-center p-8 lg:p-28 px-3 max-w-6xl mx-auto z-10">
            <h1 className="text-3xl text-white font-bold lg:text-6xl text-center relative">
              {" "}
              {/* Added relative class */}
              Find Your Next <span className="text-blue-500">Perfect</span>
              <br className="mt-5" />
              Place With Ease
            </h1>
            {/** 
      <div className="text-white text-xs sm:text-sm text-center mt-4 relative"> 
        Mikist Estate will help you find your home fast, easy, and comfortable.
        <br />
        Our expert support is always available.
      </div>
    */}

            <Link
              to={"/search"}
              className="text-sm sm:text-sm text-blue-500 font-bold hover:underline mt-4 relative"
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

      <div className="max-w-8xl mx-auto p-3 flex flex-colm gap-8 my-10 sm">
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

      {/* Contact Section 
<div className="w-full gap-6 flex flex-wrap my-10 items-center justify-center">
  
  <div className="w-full text-center">
    <div className="mb-2">
      <div className="flex justify-center">
        <div className="w-6 h-6 border-b border-gray-700 transform rotate-45"></div>
      </div>
      <p className="text-gray-700 text-lg font-semibold">More recommended homes</p>
    </div>
  </div>*/}

      {/* First Card 
  <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out text-center">
    <img src={backgroundImage} alt="Card image" className="h-full object-cover mb-2" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Finance a home</h3>
    <p className="text-gray-700 mb-4">
      Zillow Home Loans can get you pre-approved so you're ready to make an offer quickly when you find the right home.
    </p>
    <button className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
      Start now
    </button>
  </div> */}

      {/* Second Card 
  <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out text-center">
    <img src={backgroundImage} alt="Card image" className="h-full object-cover mb-2" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Finance a home</h3>
    <p className="text-gray-700 mb-4">
      Zillow Home Loans can get you pre-approved so you're ready to make an offer quickly when you find the right home.
    </p>
    <button className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
      Start now
    </button>
  </div> */}

      {/* Third Card 
  <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out text-center">
    <img src={backgroundImage} alt="Card image" className="h-full object-cover mb-2" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Finance a home</h3>
    <p className="text-gray-700 mb-4">
      Zillow Home Loans can get you pre-approved so you're ready to make an offer quickly when you find the right home.
    </p>
    <button className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
      Start now
    </button>
  </div>
</div>*/}

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          About Mikist Estate Recommendations
        </h2>
        <p className="text-gray-600 mb-6">
          Recommendations are based on your location and search activity, such
          as the homes you've viewed and saved and the filters you've used. We
          use this information to bring similar homes to your attention, so you
          don't miss out.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-white border border-gray-300 rounded shadow hover:bg-blue-400  focus:outline-none">
            Real Estate ▼
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded shadow hover:bg-blue-400  focus:outline-none">
            Rentals ▼
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded shadow hover:bg-blue-400 focus:outline-none">
            Mortgage Rates ▼
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded shadow hover:bg-blue-400 focus:outline-none">
            Browse Homes ▼
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded shadow hover:bg-blue-400  focus:outline-none">
            Sell Homes ▼
          </button>
        </div>

        <footer className="mt-8 text-center">
          <a href="#" className="text-blue-500 hover:underline mr-4 ">
            About
          </a>
          <a href="#" className="text-blue-500 hover:underline mr-4">
            Research
          </a>
          <a href="#" className="text-blue-500 hover:underline mr-4">
            FAQ
          </a>
          <a href="#" className="text-blue-500 hover:underline">
            Contact
          </a>
        </footer>
        <img src={backgroundImages} className="p-5 mt-8" alt="" />
      </div>

    </div>
  );
}

export default Home;
