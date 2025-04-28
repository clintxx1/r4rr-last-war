import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Flame, Trophy, Swords, Heart, Gift, Users, Share2, ChevronRight, BarChart3 } from "lucide-react"
import { MemberProps } from "../page"
import { ShareButton } from "../_components/share"

type CustomMemberProps = MemberProps & {
  bio: string;
  achievements: string[];
  recentActivity: any[];
}

export default async function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fetchMemberData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members/${id}`, { method: "GET" });
      const data =  await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching member data:", error)
    }
  }

  const member: CustomMemberProps = await fetchMemberData();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold tracking-tight">R4RR</span>
            </Link>
            <Link href="/members" className="flex items-center text-sm text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Members
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {member ? <main className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="h-48 md:h-64 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
            <Image src="/r4rr.png?height=400&width=1200" alt="Profile Banner" fill className="object-cover" />
          </div>

          <div className="container relative z-20 -mt-24">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-red-500 shadow-lg shadow-red-500/20">
                <Image
                  src={member.profile || "https://ik.imagekit.io/cascades/R4RR/lastwar.png"}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>

              <div className="flex-grow pt-4 md:pt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold">{member.name}</h1>
                      {/* <div
                        className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs ${
                          member.status === "online" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            member.status === "online" ? "bg-green-400" : "bg-gray-400"
                          }`}
                        ></span>
                        {member.status === "online" ? "Online" : "Offline"}
                      </div> */}
                    </div>
                    <p className="text-red-400 font-medium">[{member.alliancePosition}] - {member.positionDescription}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Member since {new Date(member.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {/* <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      <Heart className="mr-2 h-4 w-4" />
                      Like
                    </Button> */}
                    <ShareButton memberId={member._id} memberName={member.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 flex flex-col items-center">
            <div className="bg-red-500/10 p-2 rounded-full mb-2">
              <BarChart3 className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold">{member.level}</p>
            <p className="text-xs text-gray-400">LEVEL</p>
          </div>
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 flex flex-col items-center">
            <div className="bg-red-500/10 p-2 rounded-full mb-2">
              <Flame className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold">{member.totalPower}{member.powerUnit}</p>
            <p className="text-xs text-gray-400">POWER</p>
          </div>
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 flex flex-col items-center">
            <div className="bg-red-500/10 p-2 rounded-full mb-2">
              <Swords className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold">{member.enemyDefeated.toLocaleString()}{member.defeatedUnit}</p>
            <p className="text-xs text-gray-400">ENEMIES DEFEATED</p>
          </div>
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 flex flex-col items-center">
            <div className="bg-red-500/10 p-2 rounded-full mb-2">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold">{member.likes}</p>
            <p className="text-xs text-gray-400">LIKES</p>
          </div>
        </div>

        {/* Gift Level */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-500/10 p-2 rounded-full">
                <Gift className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Gift Level {member.giftLevel}</h2>
                <p className="text-sm text-gray-400">Premium supporter status</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(member.giftLevel)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-red-500 rounded-full"></div>
              ))}
              {[...Array(10 - member.giftLevel)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-gray-700 rounded-full"></div>
              ))}
            </div>
          </div>
          <Progress value={member.giftLevel * 10} className="h-2 bg-gray-800" />
          <p className="text-right text-xs text-gray-400 mt-1">Level {member.giftLevel}/10</p>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-gray-300">{member.bio ?? "No biography available"}</p>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-red-500" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {member.recentActivity ? member.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0">
                    <div className="bg-gray-800 p-2 rounded-full">
                      {activity.type === "battle" && <Swords className="h-4 w-4 text-red-400" />}
                      {activity.type === "territory" && <Users className="h-4 w-4 text-blue-400" />}
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-300">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                )) : "No recent activity"}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-8">
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-red-500" />
                Achievements
              </h2>
              <div className="space-y-4">
                {member.achievements ? member.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0">
                    <div className="bg-red-500/20 p-2 rounded-full">
                      <Trophy className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement}</p>
                    </div>
                  </div>
                )) : "No achievements yet"}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  View All Achievements <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main> : <div className="text-center text-red-500">Member not found</div>}

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} The Originals (R4RR). All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
