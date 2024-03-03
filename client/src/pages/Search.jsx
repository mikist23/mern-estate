
function Search() {
  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form  className="flex flex-col gap-7" >
               <div className="flex items-center gap-2">
                <label 
                className="whitespace-nowrap font-semibold">
                    Search Term:
                </label>
                <input type="text" id='searchTerm' 
                placeholder="Search.."
                className="rounded-lg p-3 border w-full"/>
               </div>

               <div className="flex gap-2 flex-wrap items-center">
                  <label className="font-semibold">Type:</label>
                  <div className="flex gap-2">
                  <input type="checkBox" id="all"
                  className="w-5" />
                  <span>Rent&Sale</span>
                  </div>

                  <div className="flex gap-2">
                  <input type="checkBox" id="rent"
                  className="w-5" />
                  <span>Rent</span>
                  </div>

                  <div className="flex gap-2">
                  <input type="checkBox" id="sale"
                  className="w-5" />
                  <span>Sale</span>
                  </div>

                  <div className="flex gap-2">
                  <input type="checkBox" id="offer"
                  className="w-5" />
                  <span>Offer</span>
                  </div>

               </div>

               <div className="flex gap-2 flex-wrap items-center">
                  <label className="font-semibold">Amenities:</label>
                  <div className="flex gap-2">
                  <input type="checkBox" id="parking"
                  className="w-5" />
                  <span>Parking</span>
                  </div>

                  <div className="flex gap-2">
                  <input type="checkBox" id="furnished"
                  className="w-5" />
                  <span>Furnished</span>
                  </div>

               </div>
               

               <div className="flex gap-3 items-center">
                <label className="font-semibold">Sort:</label>
                <select className="border rounded-lg p-3" id="sort_order">
                    <option>Price high to low</option>
                    <option>Price low to high</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                </select>
               </div>
              
              <button className="bg-slate-700 rounded-lg uppercase hover:opacity-95 text-white p-3">
                Search</button>
            </form>
        </div>
        
        <div className="text-3xl font-semibold p-3 text text-slate-700 border-b mt-5">
            Listing results:
        </div>
    </div>
  )
}

export default Search