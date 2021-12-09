import { Container, Content, P } from "./styles"


export const Breadcrumb = ({ name }) => {

  return (
    <Container>
      <Content>
        Home
        <P> {name}</P>
      </Content>
    </Container>
  )
}