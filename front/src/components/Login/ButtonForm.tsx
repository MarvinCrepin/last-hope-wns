import { width } from "@mui/system";
import React from "react";
import { classNames } from "../common/Utils";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  action?: void | undefined;
  text: string;
  customClass?: string | undefined;
  textFont?: "title" | "text";
  textSize?: "text-2xl" | "text-xl" | "text-lg" | "text-base" | "text-sm";
  width?: string | undefined;
};

/**
 *
 * @param width pass a tailwind css width class
 * @param type pass a type of button
 * @param action pass a function to execute on click
 * @param text pass a text to display on the button
 * @param customClass pass a custom class to the button
 * @param textFont pass a font to the text
 * @param textSize pass a size to the text
 * @returns
 */
export default function ButtonForm({
  type,
  action,
  text,
  customClass,
  textFont,
  textSize,
  width,
}: Props) {
  return (
    <button
      className={classNames(
        customClass && customClass,
        textSize,
        width && width,
        ` bg-lh-primary cursor-pointer text-lh-light py-1.5 px-3  items-center rounded font-${textFont} hover:opacity-70`
      )}
      type={type}
      onClick={type === "button" ? () => action : undefined}
    >
      {text}
    </button>
  );
}

ButtonForm.defaultProps = {
  textFont: "text",
  textSize: "text-base",
  width: "w-fit",
};
