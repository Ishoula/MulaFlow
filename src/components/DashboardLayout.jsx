import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="dash-layout">
      <Navbar />
      <main className="dash-main">{children}</main>
    </div>
  );
}
