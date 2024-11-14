import { Container } from "./styles"

export function ButtonText({ title, icon: Icon, $fontSizeIcon, ...rest }) {
  return (
    <Container {...rest}>
      {Icon && <Icon data-testid="button-icon" size={$fontSizeIcon} />}
      {title}
    </Container>
  )
}