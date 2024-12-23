"use client";
import CustomCursor from "@/components/ui/CustomCursor";
import CursorClick from "@/components/ui/CursorClick";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function ClientWrapper({ children }) {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <CursorClick />
      {children}
    </>
  );
}
