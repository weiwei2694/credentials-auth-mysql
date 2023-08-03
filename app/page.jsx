import Link from "next/link"

const HomePage = () => {
  return (
    <main className="p-16">
    <h1 className="text-3xl font-extrabold mb-4">NextAuth.js</h1>
    <ul className="flex flex-col gap-2 list-disc">
      <li>
        <Link href="/register" className="font-semibold text-black underline">Register Page</Link>
      </li>
      <li>
        <Link href="/login" className="font-semibold text-black underline">Login Page</Link>
      </li>
    </ul>
  </main>
  )
}

export default HomePage