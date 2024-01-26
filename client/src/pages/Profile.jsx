import {useSelector} from 'react-redux'
import { useRef } from 'react'
import { useState,useEffect } from 'react'
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {useDispatch} from  'react-redux'
import axios from 'axios'
import {  updateUserFailure,updateUserStart,updateUserSuccess } from '../redux/user/userSlice'
import { deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice'
import { signOutUserFailure,signOutUserStart,signOutUserSuccess } from '../redux/user/userSlice'

function Profile() {
  const {currentUser,loading,error} =  useSelector(state=>state.user)
  const fileRef = useRef(null)
  const[file, setFile] = useState(undefined)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [filePerc,setFilePerc] = useState(0)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch()
  
  

   useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
   },[file]
  )
  const handleFileUpload = (file)=>{
    const storage =  getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage,fileName)
    const uploadTask =uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
    (snapshot)=>{
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
       setFilePerc(Math.round(progress))
    },

    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
       setFormData({...formData, avatar: downloadURL})
      )
    }
    )
  }
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault() 
    try {
      dispatch(updateUserStart())

      const response = await axios.post(`/api/user/update/${currentUser._id}`, formData,
     { headers:{
        'Content-Type': 'application/json'
      }})

     const data = await response.data
     if(data.success === false){
      dispatch(updateUserFailure(data.message))
      return
     }

     dispatch(updateUserSuccess(data))
     setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message))
   
    }
  
  }

  const handleDeleteUser = async()=>{
      try {
        dispatch(deleteUserStart())
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method:'DELETE',
        }) 
        const data = await res.json()
        if(data.success === false){
          dispatch(deleteUserFailure(data.message))
          return
        }
        
        dispatch(deleteUserSuccess(data))

      } catch (error) {
        dispatch(deleteUserFailure(error.message))
      }
  }
  const handleSignOut = async()=>{
       try {
        dispatch(signOutUserStart())
        const res = await fetch('/api/auth/signout')
        const data = await res.json()
        if(data.success === false){
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess(data))

       } catch (error) {
        dispatch(signOutUserFailure(error.message))
       }
  }

  return (
    //firebase storage
    //allow read;
    //allow write: if
   // request.resource.size <2 *1024 * 1024 &&
    //request.resource.contentType.matches('image/.*')

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-center my-7 text-3xl font-semibold'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=> fileRef.current.click()} src={formData.avatar  || currentUser.avatar} alt="profile" 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>

        <p className='text-sm self-center'>
          {
            fileUploadError ? (
              <span className='text-red-700'>Error Image Upload (less than 2mb)</span>
            ):
            filePerc > 0 && filePerc < 100 ?
            (<span className='text-slate-700'>{`uploading ${filePerc}%`}</span>):
            filePerc === 100 ?
            (<span className='text-green-700'>Image successfully uploaded</span>):
            ""
          }
        </p>

        <input type="text" placeholder='username' id="username"
        className='p-3 border rounded-lg'onChange={handleChange} defaultValue={currentUser.username} />
        <input type="email" placeholder='email' id="email"
        className='p-3 border rounded-lg'onChange={handleChange} defaultValue={currentUser.email} />
        <input type="password" placeholder='password' id="password"
        className='p-3 border rounded-lg'onChange={handleChange}  />
        <button disabled={loading} className=' uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-95
        disabled:opacity-80'>
          {loading? 'Loading ...': 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error? error:''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && 'User is updated successfully'}
</p>
    </div>

  )
}

export default Profile