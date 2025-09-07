"use client";

import { JSX } from "react";
import FuzzyText from "@/components/FuzzyText";
import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FuzzyText>404</FuzzyText>
      <p className="text-xl text-gray-600 my-16">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-purple-500 hover:underline animate-bounce">
        Send me back!
      </Link>
    </div>
  );
}
