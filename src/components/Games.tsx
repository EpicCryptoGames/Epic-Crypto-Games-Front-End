"use client";
import { IGame } from "@/app/data";
import { useMountReactQuery } from "@/hooks/useMountGet";
import Image from "next/image";
import Link from "next/link";

export interface Game {
  id: number;
  name: string;
  img: string;
  alt: string;
  route: string;
}
export const games: Game[] = [
  {
    id: 1,
    name: "Snake",
    img: "/images/snake.png",
    alt: "Snake",
    route: "/snake",
  },
  {
    id: 2,
    name: "Crypto Jump",
    img: "/images/JumpHomeBanner.png",
    alt: "Crypto Jump",
    route: "/cryptoJump",
  },
];

export const allGamesAPI = {
  cacheKey: "allGames",
  apiUrl: `/game/${process.env.NEXT_PUBLIC_SITE_ID}`,
  staleTime: 10 * 60 * 60 * 60,
};

export default function AllGames() {
  const { data, isLoading, isError } = useMountReactQuery<IGame[]>(allGamesAPI);
  return (
    <div className="flex pt-4 gap-x-6">
      {isError ? (
        <h1>Error Loading Data</h1>
      ) : isLoading ? (
        // <h1>Loading ...</h1>
        <div className="flex items-start justify-start gap-x-6">

        <div className="relative p-4 rounded-lg w-[232px] h-[232px] bg-gray-800 animate-pulse">
            {/* Image Skeleton with Gaming Vibe */}
            <div className="overflow-hidden rounded-lg bg-gray-700 h-[200px] w-[200px] mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer rounded-lg"></div>
            </div>

            {/* Neon Glow Border */}
            <div className="absolute inset-0 rounded-lg border-4 border-transparent group-hover:border-neon-blue transition duration-300 ease-in-out"></div>

            {/* Gaming Vibe - Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-30 animate-gradient-move rounded-lg"></div>
        </div>

        <div className="relative p-4 rounded-lg w-[232px] h-[232px] bg-gray-800 animate-pulse">
            {/* Image Skeleton with Gaming Vibe */}
            <div className="overflow-hidden rounded-lg bg-gray-700 h-[200px] w-[200px] mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer rounded-lg"></div>
            </div>

            {/* Neon Glow Border */}
            <div className="absolute inset-0 rounded-lg border-4 border-transparent group-hover:border-neon-blue transition duration-300 ease-in-out"></div>

            {/* Gaming Vibe - Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-30 animate-gradient-move rounded-lg"></div>
        </div>



         </div> 

      ) : (
        data &&
        data.map((game) => {
          return (
            <Link
              className="group relative p-4 rounded-lg cursor-pointer"
              key={game.game_id}
              href={game.route}
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={game.image}
                  alt={`${game.name} Alt`}
                  width={200}
                  height={200}
                  className="cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-110 rounded-lg"
                />
              </div>
              <div className="absolute inset-0 rounded-lg border-4 border-transparent group-hover:border-neon-blue transition duration-300 ease-in-out"></div>
            </Link>
          );
        })
      )}
    </div>
  );
}
