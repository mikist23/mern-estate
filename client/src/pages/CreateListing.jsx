
function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-center text-3xl my-7 font-semibold">Create a Listing</h1>

        <form className="flex flex-row sm:flex-col gap-4" >
            <div className="flex  flex-col gap-4 flex-1">
                <input className="p-3 rounded-lg  border"
                type="text" placeholder="Name" id="name"required maxLength="62" minLength="10"/>
                <textarea className="p-3 rounded-lg  border"
                type="text" placeholder="Description" id="Description" required />
                <input className="p-3 rounded-lg  border"
                type="text" placeholder="Address" id="Address" required />

                <div className=" flex gap-6 flex-wrap">
                    <div className="flex gap-2">
                       <input type="checkbox" id="sale" className="w-5" />
                       <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                       <input type="checkbox" id="rent" className="w-5" />
                       <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                       <input type="checkbox" id="parking" className="w-5" />
                       <span>Parking spot</span>
                    </div>
                    <div className="flex gap-2">
                       <input type="checkbox" id="furnished" className="w-5" />
                       <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                       <input type="checkbox" id="offer" className="w-5" />
                       <span>Offer</span>
                    </div>
            </div>
            
            <div  className=" flex gap-6 flex-wrap">
                <div className=" flex items-center gap-2">
                   <input className="  border p-3 border-gray-300 rounded-lg"
                    type="number" id="bedrooms" min="1" max="10" required />
                   <p>Beds</p>
                </div>
                <div className=" flex items-center gap-2">
                   <input className=" border p-3 border-gray-300 rounded-lg"
                    type="number" id="bathrooms" min="1" max="10" required />
                   <p>Baths</p>
                </div>
                <div className=" flex items-center gap-2">
                   <input className=" border p-3 border-gray-300 rounded-lg"
                    type="number" id="regularPrice" min="1" max="10" required />
                   <div className="flex flex-col items-center">
                   <p>Regular price</p>
                   <span className="text-xs"> ($ / month)</span>
                   </div>
                </div>
                <div className=" flex items-center gap-2">
                   <input className=" border p-3 border-gray-300 rounded-lg"
                    type="number" id="discountPrice" min="1" max="10" required />
                   <div className="flex flex-col items-center">
                   <p>Discounted price</p>
                   <span className="text-xs"> ($ / month)</span>
                   </div>
                </div>
            </div>

             <div className=" flex flex-col flex-1 gap-4">
                 <p className="font-semibold"> Images:
                 <span
                 className="font-normal text-gray-600 ml-2">
                    The first image will be the cover (max 6)
                    </span>
                    </p>   
                    <div className="flex gap-4">
                        <input className="p-3 border border-gray-300 rounded w-full "
                         type="file" id="images" accept="images/*" multiple />
                         <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg
                         disabled:opacity-80" >Uplod</button>
                    </div>
                    <button></button>
             </div>


            </div>
        </form>

    </main>
  )
}

export default CreateListing