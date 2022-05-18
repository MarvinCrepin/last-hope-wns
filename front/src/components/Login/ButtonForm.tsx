import React from "react";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  action?: void | undefined;
  text: string;
  customClass?: string;
};

export default function ButtonForm({ type, action, text, customClass }: Props) {
  return (
    <button
      className="bg-lh-secondary text-lh-light font-title border rounded-lg border-lh-dark p"
      type={type}
      onClick={type === "button" ? () => action : undefined}
    >
      {text}
    </button>
  );
}
