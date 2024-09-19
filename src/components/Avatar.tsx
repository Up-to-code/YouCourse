"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface User {
  given_name?: string;
  family_name?: string;
  picture?: string;
  isAuthenticated?: boolean;
}

const Avatar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/getUser');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User = await response.json();
        setUser(data);
        console.log('User fetched:', data);
      } catch (error) {
        setError('Failed to fetch user');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return       <Skeleton className="w-12 h-12 rounded-full" />

  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const userInitials = user?.given_name?.charAt(0) || '';
  const userFamilyInitials = user?.family_name?.charAt(0) || '';
  const showImage = Boolean(user?.picture);

  return user?.isAuthenticated === false ? (
    <div className="flex items-center justify-center">
      <button
        onClick={() => window.location.href = '/api/auth/sign-in'}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign In
      </button>
    </div>
  ) : (
    <div className="flex items-center space-x-3 p-4">
      <div className="relative w-12 h-12">
        {showImage ? (
          <Image
            src={user?.picture || "/default-avatar.png"}
            alt="User Avatar"
            className="rounded-full object-cover border-2 border-gray-300"
            width={48}
            height={48}
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-300 text-white font-semibold text-lg border-2 border-gray-300">
            {userInitials}{userFamilyInitials}
          </div>
        )}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
      </div>
      {!showImage && (
        <div className="text-lg font-semibold">
          {user?.given_name || "User"} {user?.family_name || ""}
        </div>
      )}
    </div>
  );
};

export default Avatar;
