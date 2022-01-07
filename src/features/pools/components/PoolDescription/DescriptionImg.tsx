// TODO: export as Description.Img / Description.Text
export function DescriptionImg({ src }: { src: string }) {
  return <img src={src} loading="lazy" alt="IDO Image" />;
}
