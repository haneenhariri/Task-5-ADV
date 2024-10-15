import { BeatLoader } from "react-spinners";
import './Loding.css'

export default function Loding({loading} : {loading : boolean}) {
  return (
    <div className="loading-overlay">
      <BeatLoader color="#FEAF00" loading={loading} size={15} />
    </div>
  )
}
