import { PoolConfig } from "@trustpad/launchpad";
import * as React from "react";
import { SocialLinks } from "~common/components/SocialLinks";
import { blokImg } from "~config/images";

const social: PoolConfig["social"] = {
  twitter: "https://twitter.com/bloktopia",
  medium: "https://medium.com/@bloktopia",
  telegram: "https://t.me/BloktopiaChat",
};

export function ErrorScreen({ error }: { error: Error }) {
  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="text-center" style={{ paddingTop: "10vh" }}>
        <img src={blokImg.src} className="mb-6 p-6 max-h-60 mx-auto block" />
        <div className="space-y-3 mb-6">
          <p>An error has occurred. We are notified.</p>
          <p>Please send us the screenshot of this screen.</p>

          <SocialLinks
            social={social}
            className="text-2xl justify-center gap-6"
          />
        </div>

        <pre className="bg-gray-800 p-3 text-white rounded">
          {error?.toString() || "No error"}
        </pre>
      </div>
    </div>
  );
}
