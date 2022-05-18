import React from "react";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  action?: void | undefined;
  text: string;
};

export default function ButtonForm({ type, action, text }: Props) {
  return (
    <button
      className="bg-lh-secondary text-lh-light font-title border rounded-lg border-lh-dark"
      type={type}
      onClick={type === "button" ? () => action : undefined}
    >
      {text}
    </button>
  );
}
