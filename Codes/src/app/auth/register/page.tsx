import { AuthForm } from "@/components/auth/auth-form";
import * as React from "react"
import { getData, deleteData, crateData } from "@/sever/action";  // Import the getData function

const Registger = async () => {
  const data = await getData();  // Fetch data using getData
  
  return (
    <div className="px-3">
      <AuthForm children={undefined} title={"Register new an account"} showProvider={true} footerLable={"Already Register"} footerHref={"/auth/login"}/>
    </div>
  )
}
export default Registger;