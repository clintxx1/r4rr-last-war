"use client";
import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  Swords,
  Target,
  ChevronRight,
  Gamepad2,
  Flame,
  Github,
  Twitter,
  Youtube,
  Twitch,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const handleViewAllMembers = () => {
    router.push("/members");
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/20 to-black">
          <div className="absolute inset-0 bg-[url('/r4rr.png?height=1080&width=1920')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-6">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Flame className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold tracking-tight">R4RR</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#about"
                className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors"
              >
                ABOUT
              </Link>
              <Link
                href="#team"
                className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors"
              >
                TEAM
              </Link>
              <Link
                href="#achievements"
                className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors"
              >
                ACHIEVEMENTS
              </Link>
              <Link
                href="#gallery"
                className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors"
              >
                GALLERY
              </Link>
              <Link
                href="#join"
                className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors"
              >
                JOIN US
              </Link>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
            >
              CONNECT
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Gamepad2 className="h-6 w-6" />
            </Button>
          </nav>

          <div className="py-24 md:py-32 flex flex-col items-center text-center">
            <div className="relative mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-red-500 shadow-lg shadow-red-500/20">
              <Image
                src="/r4rr.png?height=200&width=200"
                alt="The Originals Logo"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="mb-4 text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
                THE ORIGINALS
              </span>
            </h1>
            <p className="mb-6 text-xl md:text-2xl font-bold text-gray-400">
              R4RR
            </p>
            <p className="mb-8 max-w-2xl text-gray-400">
              Elite alliance dominating the battlefield in Last War Survival
              Game. Strategy. Precision. Victory. The power of hardwork and
              friendship. No survivors left behind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8">
                JOIN OUR RANKS
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                WATCH GAMEPLAY
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </header>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
                <Swords className="mr-3 h-8 w-8 text-red-500" />
                ABOUT THE ORIGINALS
              </h2>
              <p className="text-gray-400 mb-6">
                Founded in the early days of Last War Survival Game, The
                Originals has grown into one of the most feared and respected
                alliances in the game. Our name represents our status as
                pioneers and innovators in strategy and teamwork.
              </p>
              <p className="text-gray-400 mb-6">
                With over 50 active members across multiple time zones, we
                ensure 24/7 territory control and resource domination. Our
                coordinated attacks and defensive strategies have earned us a
                reputation that makes enemies think twice before challenging us.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-3xl font-bold text-red-500">50+</p>
                  <p className="text-sm text-gray-400">ACTIVE MEMBERS</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-3xl font-bold text-red-500">24/7</p>
                  <p className="text-sm text-gray-400">ONLINE PRESENCE</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-3xl font-bold text-red-500">15+</p>
                  <p className="text-sm text-gray-400">SERVER CONQUESTS</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-3xl font-bold text-red-500">3</p>
                  <p className="text-sm text-gray-400">CHAMPIONSHIP TITLES</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg border-2 border-red-500/50 shadow-lg shadow-red-500/10">
                <Image
                  src="/lastwar.png?height=800&width=600"
                  alt="Team in action"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium text-gray-300">
                    The Originals alliance during the Battle of Crimson Valley
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-[200px] w-[200px] rounded-lg border-2 border-purple-500/50 overflow-hidden shadow-lg shadow-purple-500/10">
                <Image
                  src="/lastwar.png?height=400&width=400"
                  alt="Team strategy meeting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Leaders Section */}
      <section
        id="team"
        className="py-20 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center">
            <Users className="mr-3 h-8 w-8 text-red-500" />
            ELITE LEADERSHIP
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "NickkKlauss",
                role: "[R5] - Alliance Leader",
                image: "/nick.png?height=300&width=300",
                stats: "Win Rate: 92%",
              },
              {
                name: "unfairbro v2",
                role: "[R4] - Warlord",
                image: "/unfair.png?height=300&width=300",
                stats: "Battles: 1,240+",
              },
              {
                name: "iFish123",
                role: "[R4] - Recruiter",
                image: "/ifish.png?height=300&width=300",
                stats: "Resources: 15M+",
              },
              {
                name: "Janize ph",
                role: "[R4] - Muse",
                image: "/janize.png?height=300&width=300",
                stats: "Successful Defenses: 89",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-gray-800/30 p-6 transition-all hover:bg-gray-800/60 border border-gray-700 hover:border-red-500/50"
              >
                <div className="mb-4 h-24 w-24 mx-auto overflow-hidden rounded-full border-2 border-red-500/50">
                  <Image
                    src={member.image || "/lastwar.png"}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="mb-1 text-xl font-bold text-center">
                  {member.name}
                </h3>
                <p className="mb-3 text-sm text-gray-400 text-center">
                  {member.role}
                </p>
                <p className="text-xs text-red-400 text-center">
                  {member.stats}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <Button
                    variant="ghost"
                    className="w-full text-xs text-gray-400 hover:text-white"
                  >
                    VIEW PROFILE <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={handleViewAllMembers}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 cursor-pointer"
            >
              VIEW ALL MEMBERS <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        className="py-20 bg-[url('/r4rr.png?height=1080&width=1920')] bg-cover bg-fixed bg-center relative"
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center">
            <Trophy className="mr-3 h-8 w-8 text-red-500" />
            BATTLE ACHIEVEMENTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-400">
                Server Domination
              </h3>
              <p className="text-gray-300 mb-4">
                Conquered and maintained control of 3 consecutive server
                seasons, establishing R4RR as the dominant force in the Last War
                universe.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Season 5, 6, and 7 Champions</span>
              </div>
            </div>

            <div className="bg-gray-900/80 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-400">
                Resource Kings
              </h3>
              <p className="text-gray-300 mb-4">
                Established the most efficient resource collection network,
                generating over 1M resources daily through strategic territory
                control.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Top Resource Alliance - Global</span>
              </div>
            </div>

            <div className="bg-gray-900/80 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-400">
                Unbreakable Defense
              </h3>
              <p className="text-gray-300 mb-4">
                Developed revolutionary defensive strategies that allowed our
                main base to remain unbreached for 120+ consecutive days.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Defensive Alliance of the Year</span>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">
              BATTLE STATISTICS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Enemies Defeated", value: "250,000+", icon: Swords },
                { label: "Territories Controlled", value: "5", icon: Target },
                { label: "Alliance Power", value: "870M", icon: Flame },
                { label: "Win Rate", value: "87%", icon: Trophy },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center"
                >
                  <stat.icon className="mx-auto mb-3 h-8 w-8 text-red-500" />
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            BATTLE GALLERY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <Image
                  src={`/lastwar.png?height=600&width=800`}
                  alt={`Gameplay screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <h3 className="text-lg font-bold">
                    Battle Scene {index + 1}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Last War Survival Game
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              VIEW FULL GALLERY
            </Button>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section
        id="join"
        className="py-20 bg-gradient-to-b from-black to-purple-900/20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              JOIN THE ORIGINALS
            </h2>
            <p className="text-gray-300 mb-8">
              Looking for elite players who understand strategy, teamwork, and
              have the skills to dominate. If you&apos;re ready to be part of
              the most feared alliance in Last War Survival Game, apply now.
            </p>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-red-500/30 mb-8">
              <h3 className="text-xl font-bold mb-4">
                RECRUITMENT REQUIREMENTS
              </h3>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <ChevronRight className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Minimum power level of 500,000</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Active daily participation in alliance events</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Discord communication and coordination</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    Strategic mindset and willingness to follow leadership
                  </span>
                </li>
              </ul>

              <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                APPLY TO JOIN R4RR
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://discord.gg/rhENN5tc86">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Discord className="mr-2 h-5 w-5" />
                  JOIN DISCORD
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                GAME ID: R4RR#1441
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Flame className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-xl font-bold">THE ORIGINALS</p>
                <p className="text-sm text-gray-500">R4RR Alliance</p>
              </div>
            </div>

            <div className="flex gap-6 mb-6 md:mb-0">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Twitch className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} The Originals (R4RR). All rights
              reserved.
            </p>
            <p className="mt-2">
              This is an unofficial fan site for Last War Survival Game. Not
              affiliated with game developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Discord icon component
function Discord({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M7.5 7.2A4.8 4.8 0 0 1 16.5 7.2" />
      <path d="M7.5 16.8A4.8 4.8 0 0 0 16.5 16.8" />
      <path d="M15.5 17 17 20" />
      <path d="M8.5 17 7 20" />
      <path d="M18.5 2.5 21 5 18.5 7.5" />
      <path d="M5.5 2.5 3 5 5.5 7.5" />
      <path d="M3 5H21" />
    </svg>
  );
}
