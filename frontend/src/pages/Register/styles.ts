import styled from 'styled-components'

export const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  align-items: center;

  height: 100vh;

  padding: 0 0.4rem 4rem;
`

export const LogoContainer = styled.div`
  justify-self: end;
  padding-right: 6rem;

  display: flex;
  align-items: center;

  gap: 0.4rem;

  > img {
    width: 3.2rem;
    height: 3.2rem;
  }

  > h1 {
    font-size: 2.8rem;

    > span {
      color: ${(props) => props.theme.COLORS.PRIMARY_COLOR_500};
    }
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 32rem;
  width: 24rem;

  border: 4px solid ${(props) => props.theme.COLORS.PRIMARY_COLOR_500};
  border-radius: 8px;

  text-align: center;

  padding: 1.6rem 1rem;
  margin-left: 2rem;

  > h2 {
    font-size: 2rem;
  }

  > span {
    > a {
      color: ${(props) => props.theme.COLORS.PRIMARY_COLOR_600};
      font-weight: 700;
    }
  }
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;

  gap: 0.8rem;

  padding: 0 1.2rem;

  > button {
    min-width: 8rem;
    margin: 0 auto;

    margin-top: 1rem;
  }
`
