import { auth } from "@/sever/auth";
import NavLogo from "./nav-logo";
import UserButton from "./user-bottom";

const AppNav = async () => {
  const user = await auth();
  return (
    <div className="flex items-center justify-between p-3">
        <NavLogo/>
        <UserButton user={user?.user} expires={user?.expires!}/>
    </div>
  );
};

export default AppNav;
