"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  Breadcrumb,
  BreadcrumbList,
} from "../ui/breadcrumb";

// Optional mapping for pretty labels per segment
const LABEL_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  groups: "Groups",
  settings: "Settings",
  profile: "Profile",
};

function toTitle(input: string) {
  // Convert slug or id-looking strings to nicer titles
  if (/^[0-9a-fA-F-]{6,}$/.test(input)) return "Details"; // treat long ids as generic label
  return decodeURIComponent(input)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  console.log("Breadcrumb segments:", segments);
  const items = segments.map((segment, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;
    const label = LABEL_MAP[segment] ?? toTitle(segment);

    return (
      <React.Fragment key={href}>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage className="truncate max-w-[18ch]" title={label}>
              {label}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href} className="truncate max-w-[18ch]" title={label}>
                {label}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link className="font-semibold" href="/">
              IOwe
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
