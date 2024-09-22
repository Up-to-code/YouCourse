"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Loader2 } from "lucide-react"; // For loading spinner

export default function YouTubePlaylistForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [urlError, setUrlError] = useState(false); // URL validation error
  const [formError, setFormError] = useState(""); // General form error
  const [formSuccess, setFormSuccess] = useState(false); // Form submission success

  const MAX_TITLE_LENGTH = 70;
  const MAX_DESCRIPTION_LENGTH = 1000;

  const InputRef = useRef<HTMLInputElement>(null);

  // Focus on the title input when the component mounts
  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.focus();
    }
  }, []);

  // URL validation and thumbnail extraction
  useEffect(() => {
    const videoId = url.match(/v=([^&]+)/)?.[1];
    if (videoId) {
      setThumbnail(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
      setUrlError(false);
    } else if (url) {
      setThumbnail("");
      setUrlError(true);
    }
  }, [url]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    // Validate title and description lengths
    if (title.length === 0 || description.length === 0) {
      setFormError("Both title and description are required.");
      return;
    }
    if (urlError) {
      setFormError("Please enter a valid YouTube URL.");
      return;
    }

    try {
      setIsLoading(true);
      
      // Here, make your API call or data submission
      // Example:
      // await fetch("/api/playlists", {
      //   method: "POST",
      //   body: JSON.stringify({ title, url, description, thumbnail }),
      // });
      
      // Simulate success after 2 seconds
      setTimeout(() => {
        setIsLoading(false);
        setFormSuccess(true); // Indicate success to the user
        console.log({ title, url, description });
      }, 2000);
    } catch (error ) {
      console.error(error);
      setIsLoading(false);
      setFormError("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg rounded-xl bg-zinc-100 dark:bg-zinc-900 transition-all duration-300">
      {thumbnail && (
        <div className="w-full h-52 rounded-t-xl overflow-hidden">
          <Image
            src={thumbnail}
            alt="Playlist thumbnail"
            className="w-full h-full object-cover"
            width={400}
            height={200}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4 break-words">
          {title ? title : "Add Playlist"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
              placeholder="Enter playlist title"
              required
              className={`p-3 border rounded-md shadow-sm focus:ring 
              ${title.length === MAX_TITLE_LENGTH ? "border-red-500 focus:ring-red-300" : "focus:ring-red-300"} 
              dark:focus:ring-red-500 dark:bg-zinc-700 dark:text-zinc-200 dark:placeholder-zinc-500`}
              ref={InputRef}
            />
            <div className={`text-sm ${title.length === MAX_TITLE_LENGTH ? "text-red-500" : "text-zinc-500"} dark:text-zinc-400`}>
              {title.length}/{MAX_TITLE_LENGTH} characters
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor="url" className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
              YouTube Playlist URL
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/playlist?list=..."
              required
              className={`p-3 border rounded-md shadow-sm focus:ring 
              ${urlError ? "border-red-500 focus:ring-red-300" : "focus:ring-red-300"} 
              dark:focus:ring-red-500 dark:bg-zinc-700 dark:text-zinc-200 dark:placeholder-zinc-500`}
            />
            {urlError && (
              <div className="text-sm text-red-500">
                Invalid URL format. Please provide a valid YouTube playlist URL.
              </div>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="description" className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
              placeholder="Enter playlist description"
              rows={3}
              className={`p-3 border rounded-md shadow-sm focus:ring 
              ${description.length === MAX_DESCRIPTION_LENGTH ? "border-red-500 focus:ring-red-300" : "focus:ring-red-300"} 
              dark:focus:ring-red-500 dark:bg-zinc-700 dark:text-zinc-200 dark:placeholder-zinc-500`}
            />
            <div className={`text-sm ${description.length === MAX_DESCRIPTION_LENGTH ? "text-red-500" : "text-zinc-500"} dark:text-zinc-400`}>
              {description.length}/{MAX_DESCRIPTION_LENGTH} characters
            </div>
          </div>
          {formError && <div className="text-sm text-red-500">{formError}</div>}
          {formSuccess && <div className="text-sm text-green-500">Playlist added successfully!</div>}
        </CardContent>
        <CardFooter className="mt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center text-white p-3 py-4 rounded-lg shadow-md bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 transition duration-300"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Add Playlist"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
