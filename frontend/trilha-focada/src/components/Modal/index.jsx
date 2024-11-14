import { AiOutlineClose } from "react-icons/ai"

import { Container, Close } from "./styles"

export function Modal({ title, closeModal, children }) {
  return (
    <Container>
      <div>
        <Close onClick={() => closeModal(false)}>
          <AiOutlineClose />
        </Close>

        <p>{title}</p>

        <div>{children}</div>
      </div>
    </Container>
  )
}
