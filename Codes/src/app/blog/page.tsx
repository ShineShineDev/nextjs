import { rejects } from "assert";
import Image from "next/image";
import Link from "next/link";
import { resolve } from "path";

export default async function dashboard() {
  // const data = await new Promise(
  //   (reject) => setTimeout(() => reject("api fail"), 3000),
  // );
  // const res = await fetch(`https://...`)
  // const api2 = await res.json()
 
  // if (!api2.ok) {
  //   return 'There was an error.'
  // }
  return (
    <div>
      Blog
      <Link href="/blog/2323">Go Detail</Link>
    </div>
  );
}

