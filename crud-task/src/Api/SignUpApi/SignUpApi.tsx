import axios from "axios"

export default function SignUpApi(formData :FormData) {
  return axios.post('https://test1.focal-x.com/api/register',formData,
    {
        headers:
        {
            'Content-Type': 'multipart/form-data'
        }
    }
  )
}


