/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Contact({listing}) {
    const [landlord, setLandlord] = useState(null)
    const[message, setMessage] = useState('')

    const onChange = (e)=>{
        setMessage( e.target.value)
    }

    useEffect(()=>{
        const fetchLandlord = async()=>{
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)

            const data = await res.json()
            if(data.success === false){
                console.log(data.message)
            }
            setLandlord(data)
            } catch (error) {
                console.lo(error)
            }

        }
      fetchLandlord()
    },[listing.userRef])
  return (
    <div >
     {landlord && (
        <div className="flex flex-col gap-2">
            <p> Contact <span className="font-semibold">{landlord.username} 
            {'  '}for <span className="font-semibold">{listing.name.toLowerCase()}</span></span></p>

            <textarea name="message"
            className="w-full p-3 rounded-lg  border "
             id="message" rows="2" placeholder="Enter your message here"
            value={message} onChange={onChange} >

            </textarea>
            <Link 
             to={`mailto:${landlord.email} ? subject = Regarding ${listing.name} &body=${message}`}
             className="bg-slate-700 text-white text-center rounded-lg uppercase p-3">
             Send Message
             </Link>
        </div>
        
     )}
    </div>
  )
}

export default Contact