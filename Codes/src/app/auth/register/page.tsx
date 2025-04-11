import { AuthForm } from "@/components/auth/auth-form";
import * as React from "react"


const Registger = () => {
  return (
    <div className="px-3">
      <AuthForm children={undefined} title={"Register new an account"} showProvider={true} footerLable={"Already Register"} footerHref={"/auth/login"}/>
    </div>
  )
}
export default Registger;