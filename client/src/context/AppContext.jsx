import { createContext, useState } from 'react'
import axios from 'axios'
import { useAuth, useClerk } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const [credit, setCredit] = useState(false)
  const [image, setImage] = useState(false)
  const [resultImage, setResultImage] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { getToken } = useAuth()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  const loadCreditsData = async () => {
    try {
      const token = await getToken()

      // Get clerkId from token claims
      const { data } = await axios.post(
        backendUrl + '/api/user/credits',
        {},
        { headers: { token } }
      )

      if (data.success) {
        setCredit(data.credits)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeBg = async (image) => {
    try {
      const token = await getToken()

      if (!token) {
        return openSignIn()
      }

      setImage(image)
      setResultImage(false)
      navigate('/result')

      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/image/remove-bg', formData, {
        headers: { token }
      })

      if (data.success) {
        setResultImage(data.resultImage)
        data.creditBalance && setCredit(data.creditBalance)
      } else {
        toast.error(data.message)
        data.creditBalance !== undefined && setCredit(data.creditBalance)
        if (data.creditBalance === 0) {
          navigate('/buy')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    credit,
    setCredit,
    loadCreditsData,
    backendUrl,
    image,
    setImage,
    resultImage,
    setResultImage,
    removeBg
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider
