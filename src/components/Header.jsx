import logoImg from "../assets/logo.png";
import Button from "./UI/Button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Microsoft product" />
        <h1>Microsoft Product</h1>
      </div>
      <nav>
        <Button textOnly={true}>Cart (0)</Button>
      </nav>
    </header>
  );
}
