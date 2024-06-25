import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex gap-2 mt-2 mb-8">
      <div className="text-2xl">
        <Image
          src="/logo.png"
          alt="TokenFest Logo"
          width={30}
          height={10}
          className="w-auto h-auto"
        />
      </div>
      <Link href="/" className="font-bold text-2xl mr-10">
        Voyager
      </Link>
    </div>
  );
};

export default Navbar;
