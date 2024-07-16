"use client";
import { ChevronLeftIcon as OutlineChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <button onClick={onClickClose}>
      <OutlineChevronLeftIcon className="w-6 h-6" />
    </button>
  );
}
