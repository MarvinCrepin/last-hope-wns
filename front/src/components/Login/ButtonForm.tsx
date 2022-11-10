import React from "react";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  action?: void | undefined;
  text: string;
  customClass?: string | undefined;
};

export default function ButtonForm({ type, action, text, customClass }: Props) {
  return (
    <button
      className={
        (customClass && customClass) +
        " shadow p-0.5 bg-lh-secondary text-lh-light font-title rounded-md border-lh-dark p"
      }
      type={type}
      onClick={type === "button" ? () => action : undefined}
    >
      {text}
    </button>
  );
}
