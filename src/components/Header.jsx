import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Restaurant img" />
        <h1>Reactfood</h1>
      </div>
      <nav>
        <button>Cart(3)</button>
      </nav>
    </header>
  );
}
