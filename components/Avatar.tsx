declare module "@dicebear/core" {
  export function createAvatar(
    collection: any,
    options?: any
  ): {
    toDataUri: () => string;
  };
}

// types for "@dicebear/collection" are provided by the installed package; do not redeclare them here

import React from "react";
import { createAvatar } from "@dicebear/core";
import { funEmoji, initials } from "@dicebear/collection";
import Image from "next/image";

type AvatarProps = {
  seed: string;
  type?: "all" | "customer";
};

const Avatar: React.FC<AvatarProps> = ({ seed, type = "all" }) => {
  const avatar = createAvatar(funEmoji, {
    seed: seed,
  });
  const avatarTwo = createAvatar(initials, {
    seed: seed,
  });
  if (type === "all") {
    return (
      <div>
        {/* <Image src={avatar.toDataUri()} alt="Avatar" /> */}
        <Image src={avatar.toDataUri()} alt="Avatar" width={80} height={80} unoptimized style={{
          borderRadius:"50%"
        }} />
      </div>
    );
  }

  if (type === "customer") {
    return (
      <div>
        <Image src={avatarTwo.toDataUri()} alt="Avatar" width={80} height={80} unoptimized style={{
          borderRadius:"50%"
        }}/>
      </div>
    );
  }

  return null;
};

export default Avatar;
