import { ReactNode } from "react";

interface IButton {
  children?: ReactNode;
  onClick: () => void;
  text?: string;
}

const Button = (props: IButton) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
      {props.children}
    </button>
  );
};

export default Button;
