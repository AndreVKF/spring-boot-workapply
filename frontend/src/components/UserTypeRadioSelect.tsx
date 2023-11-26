import * as RadioGroup from '@radix-ui/react-radio-group'
import styled from 'styled-components'

interface UserTypeRadioSelectProps {
  userType: string
  setUserType: (state: string) => void
}

export const UserTypeRadioSelect = ({
  userType,
  setUserType,
}: UserTypeRadioSelectProps) => {
  return (
    <StyledRoot
      defaultValue="candidate"
      value={userType}
      onValueChange={setUserType}
      aria-label="Select person type"
    >
      <StyledItem value="candidate" id="r1">
        <RadioGroup.Indicator />
        <label htmlFor="r1">Candidate</label>
      </StyledItem>

      <StyledItem value="company" id="r2">
        <RadioGroup.Indicator />
        <label htmlFor="r2">Company</label>
      </StyledItem>
    </StyledRoot>
  )
}

const StyledRoot = styled(RadioGroup.Root)`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 2.4rem;
`

const StyledItem = styled(RadioGroup.Item)`
  background-color: transparent;
  border: none;

  font-size: 1rem;

  padding: 0.4rem;
  cursor: pointer;

  &[data-state='checked'] {
    border-bottom: 2px solid ${(props) => props.theme.COLORS.PRIMARY_COLOR_700};
    font-weight: 700;
  }

  > label {
    cursor: pointer;
  }
`
