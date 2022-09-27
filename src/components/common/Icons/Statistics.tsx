import React from "react";
import { ISvgProps } from "../../../types/types";

export function Statistics(props:ISvgProps) {
  return (
    <svg   width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className={props.className} d="M6 16H10V0H6V16ZM0 16H4V8H0V16ZM12 5V16H16V5H12Z" fill="#DC3E22"/>
    </svg>

  );
}