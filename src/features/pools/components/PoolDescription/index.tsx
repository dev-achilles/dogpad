import { DescriptionImg } from "./DescriptionImg";

const Text = ({ children }) => <p>{children}</p>;

const H = ({ children }) => (
  <h3 className="text-lg leading-relaxed">{children}</h3>
);

export const Desc = {
  Img: DescriptionImg,
  H,
  Text,
};
