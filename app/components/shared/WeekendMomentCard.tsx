import { ContentBox, type ContentBoxProps } from "./ContentBox";

export type WeekendMomentCardProps = Omit<ContentBoxProps, "variant">;

/** Weekend trip moment — social-style card (avatar header, tall image, actions row). */
export function WeekendMomentCard(props: WeekendMomentCardProps) {
  return <ContentBox {...props} social />;
}
