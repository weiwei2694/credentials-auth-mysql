import { Navbar } from "./(components)"

const layout = ({ children }) => {
  return (
    <>
        <Navbar />
        <main>
            {children}
        </main>
    </>
  )
}

export default layout