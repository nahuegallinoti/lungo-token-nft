import { MainTitle } from '../Navbar/NavbarElements';
import { DivCenter } from '../Shared/GlobalElements';

export default function Header(props) {
  return (
    <DivCenter>
      <MainTitle colorTitle={props.colorTitle}>{props.name}</MainTitle>
    </DivCenter>
  );
}