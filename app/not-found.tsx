import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h2 className="text-4xl">Page Not Found</h2>
        <h3 className="my-4">Go <Link href='/'>home</Link> page</h3>
      </div>
    )
  }