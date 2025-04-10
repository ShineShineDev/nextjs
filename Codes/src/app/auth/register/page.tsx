import { AuthForm } from "@/components/auth/auth-form";
import * as React from "react"


const Registger = () => {
  return (
    <div>
      <AuthForm children={undefined} title={"Register"} showProvider={false} footerLable={"Already Register"} footerHref={"/auth/login"}/>
    </div>
  )
}
export default Registger;