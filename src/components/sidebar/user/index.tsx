"use client";
import React, { useState } from "react";
import Sidebar from "..";
import { useGetMyDetailsQuery } from "@/store/api/statsApi";
import { useBalance } from "@/context/balanceContext";
import { usePolkadot } from "@/context";
import Link from "next/link";
import { RiProfileLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaHistory } from "react-icons/fa";
import { disconnectSocket } from "@/lib/socket";

interface IUserSidebarType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const UserSidebar = ({ isSidebarOpen, toggleSidebar }: IUserSidebarType) => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const { userBalance } = useBalance();
  const router = useRouter();
  const { data: userData, isLoading } = useGetMyDetailsQuery(undefined, {
    skip: !isSidebarOpen,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
  });
  const { selectedAccount, logoutUser } = usePolkadot();
  const userBalanceFormatted = (userBalance.balance / 10 ** 9)?.toFixed(2);
  const handleLogoutUser = () => {
    logoutUser();
    toggleSidebar();
    disconnectSocket();
    // router.push("/");
  };
  return (
    <Sidebar title="" isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="flex flex-col break-all text-sm mt-3 ring-1 p-4 rounded-xl ring-secondary ">
        <h6 className="text-xs font-normal text-secondary">Wallet Balance</h6>
        <h1 className="text-2xl font-medium break-all mt-1">
          {userBalanceFormatted} COMAI
        </h1>
        <small className="text-xs leading-tight pt-1 text-gray-400">
          {selectedAccount?.address}
        </small>
      </div>

      <div className="flex w-full my-4 flex-col gap-y-4">
        <Link href="/profile" className="w-full" onClick={toggleSidebar}>
          <button className="py-3 text-md ring-1 w-full ring-gray-600 px-3 rounded-md font-medium flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <RiProfileLine size={20} className="text-secondary" />
             Leader Board
            </div>
            <div className="">
              <FaAngleRight />
            </div>
          </button>
        </Link>
        <button
          className="py-3 text-md ring-1 w-full ring-gray-600 px-3 rounded-md font-medium flex justify-between items-center"
          onClick={handleLogoutUser}
        >
          <div className="flex items-center gap-x-2">
            <IoMdLogOut size={20} className="text-secondary" /> Logout
          </div>
          <div className="">
            <FaAngleRight />
          </div>
        </button>
      </div>
    </Sidebar>
  );
};

export default UserSidebar;
