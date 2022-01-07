import { PoolConfig } from "@trustpad/launchpad";
import * as React from "react";
import {
  FaBullhorn,
  FaFileWord,
  FaGithub,
  FaGlobe,
  FaMedium,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

export function SocialLinks({
  social,
  className = "text-2xl",
  itemClassName,
  linkClassName,
}: {
  social: PoolConfig["social"];
  className?: string;
  itemClassName?: string;
  linkClassName?: string;
}) {
  if (!social) {
    return null;
  }
  return (
    <ul
      className={`flex flex-wrap items-center text-white z-20 relative ${className}`}
    >
      {social.telegram && (
        <li className={itemClassName}>
          <a
            href={social.telegram}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className={`text-white ${linkClassName}`}
            rel="noreferrer"
          >
            <FaTelegramPlane />
          </a>
        </li>
      )}
      {social.telegramAnno && (
        <li className={itemClassName}>
          <a
            href={social.telegramAnno}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className={`text-white ${linkClassName}`}
            rel="noreferrer"
          >
            <FaBullhorn />
          </a>
        </li>
      )}
      {social.twitter && (
        <li className={itemClassName}>
          <a
            href={social.twitter}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className={`text-white ${linkClassName}`}
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
        </li>
      )}
      {social.medium && (
        <li className={itemClassName}>
          <a
            href={social.medium}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className={`text-white ${linkClassName}`}
            rel="noreferrer"
          >
            <FaMedium />
          </a>
        </li>
      )}
      {social.website && (
        <li className={itemClassName}>
          <a
            href={social.website}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className={`text-white ${linkClassName}`}
            rel="noreferrer"
          >
            <FaGlobe />
          </a>
        </li>
      )}
      {social.github && (
        <li className={itemClassName}>
          <a
            href={social.github}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className={`text-white ${linkClassName}`}
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </li>
      )}
      {social.whitepaper && (
        <li className={itemClassName}>
          <a
            href={social.whitepaper}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className={`text-white ${linkClassName}`}
            rel="noreferrer"
          >
            <FaFileWord />
          </a>
        </li>
      )}
    </ul>
  );
}
