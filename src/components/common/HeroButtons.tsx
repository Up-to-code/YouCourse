"use client";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../ui/button";
import { useUserStore } from "@/lib/store/UserStore";
import Link from "next/link";

function HeroButtons() {
  const { user } = useUserStore();
  return user?.isAuthenticated === false ? (
    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
      <div className="rounded-md shadow">
        <Button size="lg" className="w-full text-lg font-semibold">
          start learning
        </Button>
      </div>
      <div className="mt-3 sm:mt-0 sm:ml-3">
        <LoginLink>
          <Button
            variant="outline"
            size="lg"
            className="w-full text-lg font-semibold dark:text-white"
          >
            log in
          </Button>
        </LoginLink>
      </div>
    </div>
  ) : (
    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        <Link href="/user/home">
      <Button size="lg" className="w-full text-lg font-semibold max-w-[150px]">
        start learning
      </Button></Link>
    </div>
  );
}

export default HeroButtons;
