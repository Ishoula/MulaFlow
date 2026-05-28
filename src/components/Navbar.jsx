import { NavLink, useNavigate } from "react-router-dom";

const getStoredName = () => {
  const storedName = localStorage.getItem("name");

  return storedName && storedName !== "undefined" && storedName !== "null"
    ? storedName
    : "User";
};

const navItems = [
  { to: "/dashboard", icon: "▣", label: "Dashboard" },
  { to: "/expenses", icon: "$", label: "Expenses" },
  { to: "/expenses/new", icon: "+", label: "Add expense" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const name = getStoredName();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <aside className="dash-sidebar">
      <div className="dash-brand">
        <h2>MulaFlow</h2>
      </div>

      <nav className="dash-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `dash-nav-link${isActive ? " active" : ""}`
            }
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <button className="dash-nav-link" type="button" onClick={logout}>
          <span aria-hidden="true">←</span>
          Logout
        </button>
      </nav>

      <div className="dash-user">
        <span aria-hidden="true">◎</span>
        <span>{name}</span>
      </div>
    </aside>
  );
}

export { getStoredName };
