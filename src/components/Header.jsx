import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header>
      <div>
        <img src={logoImg} alt="Restaurant img" />
        <h1>Reactfood</h1>
      </div>
      <nav>
        <button>Cart(3)</button>
      </nav>
    </header>
  );
}
