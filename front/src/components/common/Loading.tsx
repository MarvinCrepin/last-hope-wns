import { Transition } from "@headlessui/react";
import { RiLoader5Fill } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="h-96 flex justify-center items-center flex-col  opacity-60">
      <RiLoader5Fill className="text-lh-secondary text-9xl animate-spin " />

      <div className="text-lh-secondary text-6xl font-title">Chargement</div>
    </div>
  );
}
