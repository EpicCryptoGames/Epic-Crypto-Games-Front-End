"use client";
import AllGames from "@/components/Games";
import NavBar from "@/components/NavBar";
import { useState } from "react";

export default function Home() {
  const [showConditions, setShowConditions] = useState(false);

  const toggleConditions = () => {
    setShowConditions(!showConditions);
  };
  return (
    <div className="flex h-screen bg-black items-start justify-start flex-col w-full">
      <NavBar />
      <div className="h-full w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat "
              style={{
                backgroundImage: "url('/images/bg_img.png')",
              }}
      >
        {/* <h1 className="text-white text-5xl font-bold font-press-start">
          EPIC CRYPTO GAMES
        </h1>
        <h3 className="text-white text-xl font-medium pt-4 font-press-start">
          Let&apos;s Play & Earn Crypto <span className="text-3xl">₿₿₿₿</span>
        </h3> */}
               <h3 className="text-[#173a6c] text-4xl md:text-6xl font-bold pt-4 font-press-start typing-animation mx-auto relative z-10">
          Play To Earn COMAI
        </h3>
        <AllGames />
      </div>
                <div
        className="fixed bottom-0 right-0 m-4 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-6 hover:animate-pulse"
        onClick={toggleConditions}
      >
        <div className="w-48 h-48 flex flex-col items-center justify-center">
          <span className="text-6xl animate-bounce">🎁</span>
          <p className="text-[#e9ecec] text-xl pt-2">Suprise Here!</p>
        </div>
      </div>

      {showConditions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="relative bg-[#1f7ba2] bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-xl text-white max-w-xl mx-auto rgb-border">
            <h4 className="text-3xl font-bold mb-4">Terms & Conditions</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Earn $100 daily by securing the top spot on the leaderboard.
              </li>
              <li>The leaderboard refreshes every 24 hours.</li>
              <li>Payment is required before you can start playing.</li>
              <li>New features, rewards, and games are coming soon.</li>
              <li>All transactions will be processed in cryptocurrency.</li>
            </ul>
            <span
              onClick={toggleConditions}
              className="absolute top-2 right-2 text-3xl cursor-pointer text-[#2596be] hover:text-white"
            >
              &times;
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
