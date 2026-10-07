import AuthBanner from "../components/AuthBanner"
import AuthDetails from "../components/AuthDetails"

const Auth = () => {
  return (
    <div className="flex ">
      <div className="w-[50%] h-screen">
        <AuthBanner />
      </div>
      <div className="w-[50%] h-screen flex justify-center items-center"><AuthDetails/></div>
    </div>
  )
}

export default Auth