"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Copy, Facebook, Linkedin, MessageSquare, Share2, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


export function ShareButton({ memberId, memberName }: { memberId: string; memberName: string }) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/members/${memberId}`
  const shareTitle = `Check out ${memberName}'s profile on The Originals (R4RR) alliance!`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast("Link copied!", {
      description: "Profile link copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    let shareLink = ""

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case "discord":
        shareLink = `https://discord.com/channels/@me?content=${encodeURIComponent(shareTitle + " " + shareUrl)}`
        break
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer")
      toast("Sharing profile", {
        description: `Opening ${platform} to share this profile`,
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Share Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
            <input
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-300"
              value={shareUrl}
              readOnly
            />
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 hover:bg-gray-700"
              onClick={handleCopyLink}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-700 hover:bg-gray-800"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-5 w-5 text-blue-500" />
              <span className="text-xs">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-700 hover:bg-gray-800"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-5 w-5 text-sky-500" />
              <span className="text-xs">Twitter</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-700 hover:bg-gray-800"
              onClick={() => handleShare("linkedin")}
            >
              <Linkedin className="h-5 w-5 text-blue-700" />
              <span className="text-xs">LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-3 border-gray-700 hover:bg-gray-800"
              onClick={() => handleShare("discord")}
            >
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              <span className="text-xs">Discord</span>
            </Button>
          </div>

          <p className="text-xs text-gray-400 text-center">Share this profile with your friends and fellow gamers</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}