import { usePolkadot } from "@/context";
import { truncateWalletAddress } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserSidebar from "./sidebar/user";

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isInitialized, handleConnect, selectedAccount } = usePolkadot();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // <nav className="w-full h-16  bg-[#04132D]  text-white flex justify-between items-center px-8 font-cairo cursor-pointer">
    <nav className="w-full h-16 p-4 bg-[#104da2]  text-white flex justify-between items-center px-8 font-cairo cursor-pointer">
      <div className=" w-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-2xl flex items-center gap-x-2 font-bold">
            {/* <Image src="/logo.png" alt="logo" width={40} height={40} /> */}
            <h6>Epic Crypto Games</h6>
          </div>
        </Link>
        <div className="hidden md:flex space-x-6 text-md items-center">
          <div
            className="bg-[#1c79c5] hover:bg-[#044494] text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/userstats")}
          >
            My Stats
          </div>
          <Link href="/leaderboard" 
          className="bg-[#1c79c5] hover:bg-[#044494] text-white px-4 py-2 rounded-md"
          >
            Leaderboard
          </Link>
          {selectedAccount ? (
            <div
              className="flex items-center py-1 gap-x-1 ring-1 ring-secondary rounded-xl px-2 shadow-lg cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            >
              <div className="relative h-6 w-6 rounded-full">
                <Image
                  src="/profile.png"
                  alt="avatar"
                  fill
                  className="rounded-full"
                />
              </div>
              <div>
                <h6 className="text-xs font-semibold">
                  {truncateWalletAddress(selectedAccount.address)}
                </h6>
              </div>
            </div>
          ) : (
            <button
              className="bg-[#1c79c5] hover:bg-[#044494] text-white px-4 py-2 rounded-md transition-colors duration-300"
              onClick={handleConnect}
            >
              <b>Connect Wallet</b>
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <p>Close</p> : <p>Menu</p>}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <a href="/about" className="block text-gray-300 hover:text-white">
            Leaderboard
          </a>
          <a href="/services" className="block text-gray-300 hover:text-white">
            Connect Wallet
          </a>
        </div>
      )}
      <UserSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </nav>
  );
}
