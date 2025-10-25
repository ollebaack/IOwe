"use client";
import { Button } from "@/src/components/ui/button";
import { createSupabaseBrowser } from "@/src/lib/supabase/client";
import { useState } from "react";

export default function GuestLink({ params }: { params: { id: string } }) {
  const supabase = createSupabaseBrowser();
  const [url, setUrl] = useState("");
  const make = async () => {
    const token = crypto.randomUUID().replace(/-/g, "");
    const { error } = await supabase
      .from("links")
      .insert({ group_id: params.id, token, expires_at: null });
    if (error) return alert(error.message);
    setUrl(`${location.origin}/api/guest/${token}`);
  };
  return (
    <>
      <h1 className="text-2xl font-bold">Guest link</h1>
      <Button className="border px-3 py-2 mt-3" onClick={make}>
        Generate
      </Button>
      {url && (
        <p className="mt-3 break-all">
          <a className="underline" href={url} target="_blank">
            {url}
          </a>
        </p>
      )}
    </>
  );
}
