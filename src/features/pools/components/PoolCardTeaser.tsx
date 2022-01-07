import { unknownTokenImg } from "assets";
import React from "react";
import { Card } from "react-bootstrap";
import { Chain } from "../../../types";
import { ChainIcon } from "./PoolCard/ChainIcon";

export function PoolCardTeaser({ network }: { network: Chain }) {
  return (
    <Card className="hover:shadow-xl hover:bg-opacity-20 hover:bg-gray-800 bg-dark2 border-mainDark h-full hover:-translate-y-2 transform transition relative">
      <Card.Body className="space-y-6 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="w-1/3">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-mainDark flex items-center justify-center">
                <img
                  className="w-full"
                  src={unknownTokenImg.src}
                  alt="Teaser"
                />
              </div>
            </div>

            <div className="text-xl font-PFD w-1/3 text-center">SOON</div>

            <div className="w-1/3 flex justify-end">
              <ChainIcon chain={network || "BSC"} />
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
