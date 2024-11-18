import { Container } from "./styles"

export function Button({ title, $opacity, icon: Icon, className, ...rest }) {
  return (
    <Container $opacity={$opacity} className={className} {...rest}>
      {Icon && <Icon size="25px" />}

      {title && <p>{title}</p>}
    </Container>
  )
}