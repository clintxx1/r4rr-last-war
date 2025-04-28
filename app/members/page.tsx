"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Users,
  ChevronRight,
  SortAsc,
  Filter,
  ArrowLeft,
  Flame,
  ChevronLeft,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import Loading from "./loading";

export type MemberProps = {
  _id: string;
  name: string;
  gender: string;
  level: number;
  alliancePosition: string;
  positionDescription?: string;
  totalPower: number;
  powerUnit: string;
  enemyDefeated: number;
  defeatedUnit: string;
  likes: number;
  giftLevel: number;
  profile?: string;
  createdAt: Date;
};

export const dynamic = "force-dynamic";
export default function MembersPage() {
  const [teamMembers, setTeamMembers] = useState<MemberProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(20);
  const [name, setName] = useState<string>("");
  const [alliancePosition, setAlliancePosition] = useState<string>("all");
  const [totalPower, setTotalPower] = useState<string>("");
  useEffect(() => {
    setPage(1); // Reset to page 1 whenever search parameters change
  }, [name, alliancePosition, totalPower]);
  useEffect(() => {
    const fetchData = async () => {
      await fetchAllMembers();
      setIsLoading(false);
    };
    fetchData();
  }, [name, totalPower, alliancePosition, page]);
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);
  const fetchAllMembers = async () => {
    try {
      const res = await fetch(
        `/api/members?name=${name}&alliancePosition=${alliancePosition}&totalPower=${totalPower}&page=${page}`,
        { method: "GET", cache: "no-store" }
      );
      const members = await res.json();
      setTeamMembers(members?.members);
      setTotalPages(members?.totalPages);
      setCurrentPage(members?.currentPage)
    } catch (error) {
      console.error(error, "error here");
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  const handleRoleChange = (e: string) => {
    setAlliancePosition(e);
  };
  const handleSortChange = (e: string) => {
    setTotalPower(e);
  };
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setName(value); // This could trigger your API call
      }, 500), // 500ms delay
    []
  );

  if (isLoading) return <Loading />;

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
            <Link
              href="/"
              className="flex items-center text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold flex items-center">
              <Users className="mr-3 h-7 w-7 text-red-500" />
              ALLIANCE MEMBERS
            </h1>
            <p className="text-gray-400 mt-2">
              Browse and search through our elite team of warriors
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="https://discord.gg/rhENN5tc86" target="_blank">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Join Our Alliance
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                onChange={handleSearch}
                placeholder="Search members..."
                className="pl-10 bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select
                  defaultValue={alliancePosition}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="R5">[R5] - Leader</SelectItem>
                    <SelectItem value="R4">[R4] - Members</SelectItem>
                    <SelectItem value="R3">[R3] - Members</SelectItem>
                    <SelectItem value="R2">[R2] - Members</SelectItem>
                    <SelectItem value="R1">[R1] - Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-gray-500" />
                <Select
                  defaultValue={totalPower}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="desc">Power (High to Low)</SelectItem>
                    <SelectItem value="asc">Power (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.length
            ? teamMembers.map((member) => (
                <Link
                  href={`/members/${member._id}`}
                  key={member._id}
                  className="group bg-gray-900/30 border border-gray-800 hover:border-red-500/50 rounded-lg overflow-hidden transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                    <Image
                      src={member.profile || "/placeholder.png"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <h3 className="text-lg font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-300">
                        [{member.alliancePosition}]&nbsp;
                        {member.positionDescription}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-gray-800/50 rounded p-2 text-center">
                        <p className="text-xs text-gray-400">LEVEL</p>
                        <p className="text-lg font-bold text-white">
                          {member.level}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2 text-center">
                        <p className="text-xs text-gray-400">POWER</p>
                        <p className="text-lg font-bold text-red-400">
                          {member.totalPower.toFixed(1)}
                          {member.powerUnit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Joined {new Date(member.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-red-400 flex items-center group-hover:translate-x-1 transition-transform">
                        View <ChevronRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>

        {/* Pagination */}
        {totalPages && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Generate page buttons */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant="outline"
                    className={`border-gray-700 ${
                      page === pageNum
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} The Originals (R4RR). All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
