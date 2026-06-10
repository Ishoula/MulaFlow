import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  DollarSign,
  Plus,
  Clock,
  Bell,
  LogOut,
  User,
} from "lucide-react";

const getStoredName = () => {
  const storedName = localStorage.getItem("name");

  return storedName && storedName !== "undefined" && storedName !== "null"
    ? storedName
    : "User";
};

const navItems = [
  { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { to: "/expenses", icon: <DollarSign size={20} />, label: "Expenses" },
  { to: "/expenses/new", icon: <Plus size={20} />, label: "Add expense" },
  { to:"/reminders/new", icon: <Clock size={20} />, label: "Reminders" },
  { to:"/alerts", icon: <Bell size={20} />, label: "Alerts" }
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
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        <button className="dash-nav-link" type="button" onClick={logout}>
          <LogOut size={20} />
          Logout
        </button>
      </nav>

      <div className="dash-user">
        <User size={20} />
        <span>{name}</span>
      </div>
    </aside>
  );
}

export { getStoredName };
