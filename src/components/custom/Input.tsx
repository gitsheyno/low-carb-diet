import React, { ReactNode } from "react";

export default function Input({ name }: { name: string }) {
  console.log(name);
  return <input type="text" />;
}
