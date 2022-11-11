import { classNames } from "../common/Utils";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  action?: Function | undefined;
  text: string;
  customClass?: string | undefined;
  textFont?: "title" | "text";
  textSize?: "text-2xl" | "text-xl" | "text-lg" | "text-base" | "text-sm";
  width?: string | undefined;
  isDisabled?: boolean;
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
  isDisabled,
}: Props) {
  return (
    <button
      disabled={isDisabled}
      className={classNames(
        isDisabled
          ? "bg-lh-dark cursor-not-allowed"
          : " bg-lh-primary cursor-pointer hover:opacity-70",
        customClass,
        textSize,
        width && width,
        ` text-lh-light py-1.5 px-3  items-center rounded font-${textFont} `
      )}
      type={type}
      onClick={type === "button" ? () => action && action() : undefined}
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
