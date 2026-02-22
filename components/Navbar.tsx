import Image from "next/image";
import Link from "next/link";
import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-5 py-2 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="p-0.5">
            <span className="sr-only">CommonGround Collective</span>
            <Image
              className="h-14 w-auto"
              src="/logoipsum-419.svg"
              width={200}
              height={200}
              alt="logo"
            />
          </Link>
        </div>
        <NavMenu />
      </nav>
    </header>
  );
};

export default Navbar;
