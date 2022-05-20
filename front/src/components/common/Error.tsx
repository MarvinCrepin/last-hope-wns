import { BiError } from "react-icons/bi";

export default function Error() {
  return (
    <div className="h-96 flex justify-center items-center flex-col  opacity-60">
      <BiError className="text-lh-secondary text-9xl " />

      <div className="text-lh-secondary text-6xl font-title">
        Une erreur est survenue
      </div>
    </div>
  );
}
