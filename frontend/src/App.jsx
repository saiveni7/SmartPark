import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Home";
import Login from "./Login";

function App() {

  const [page, setPage] = useState("home");
  const [slots, setSlots] = useState([]);
  const [role, setRole] = useState("");

  // LOAD SLOTS
  const loadSlots = () => {
    fetch("http://localhost:8080/slots")
      .then(res => res.json())
      .then(data => setSlots(data))
      .catch(err => console.log("Load error:", err));
  };

  useEffect(() => {
    if (page === "dashboard" || page === "admin") {
      loadSlots();
    }
  }, [page]);

  // LOGIN
  const handleLogin = (userRole) => {
    setRole(userRole);

    if (userRole === "ADMIN") {
      setPage("admin");
    } else {
      setPage("dashboard");
    }
  };

  // LOGOUT
  const logout = () => {
    setRole("");
    setPage("login");
  };

  // BOOK SLOT
  const bookSlot = (slot) => {
    fetch(`http://localhost:8080/slots/${slot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...slot,
        status: "BOOKED",
        vehicleNumber: "AP09AB1234",
        userName: "Sai"
      })
    }).then(() => loadSlots());
  };

  // CANCEL SLOT
  const cancelSlot = (slot) => {
    fetch(`http://localhost:8080/slots/cancel/${slot.id}`, {
      method: "PUT"
    }).then(() => loadSlots());
  };

  // ADD SLOT
  const addSlot = () => {
    const slotNumber = prompt("Enter Slot Number:");

    if (!slotNumber) return;

    fetch("http://localhost:8080/slots/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotNumber })
    })
      .then(() => loadSlots());
  };

  // HOME
  if (page === "home") {
    return <Home onStart={() => setPage("login")} />;
  }

  // LOGIN
  if (page === "login") {
    return <Login onLogin={handleLogin} />;
  }

  // ADMIN PAGE
  if (page === "admin") {
    return (
      <div className="app-layout">

        <div className="sidebar">
          <h2>👨‍💼 Admin Panel</h2>
          <p>Welcome {role}</p>

          <button onClick={() => setPage("dashboard")}>⬅ Back</button>
          <button onClick={logout}>Logout</button>
        </div>

        <div className="main">

          <h1>Admin Dashboard</h1>

          <div className="stats">
            <div>🚗 Total <br /> {slots.length}</div>
            <div>🔴 Booked <br /> {slots.filter(s => s.status === "BOOKED").length}</div>
            <div>🟢 Available <br /> {slots.filter(s => s.status === "AVAILABLE").length}</div>
          </div>

          <div className="admin-box">
            <button onClick={addSlot}>➕ Add Slot</button>
          </div>

          <div className="slots">
            {slots.map(slot => (
              <div key={slot.id} className="card">
                <h3>{slot.slotNumber}</h3>
                <p>Status: {slot.status}</p>

                <button onClick={() => cancelSlot(slot)}>
                  Reset Slot
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="app-layout">

      <div className="sidebar">
        <h2>🚗 SmartPark</h2>
        <p>Welcome {role}</p>

        {role === "ADMIN" && (
          <button onClick={() => setPage("admin")}>
            👨‍💼 Admin Panel
          </button>
        )}

        <button onClick={logout}>Logout</button>
      </div>

      <div className="main">

        <h1>Parking Dashboard</h1>

        <div className="stats">
          <div>🚗 Total <br /> {slots.length}</div>
          <div>🔴 Booked <br /> {slots.filter(s => s.status === "BOOKED").length}</div>
          <div>🟢 Available <br /> {slots.filter(s => s.status === "AVAILABLE").length}</div>
        </div>

        <div className="slots">

          {slots.map(slot => (
            <div
              key={slot.id}
              className={`card ${slot.status === "AVAILABLE" ? "available" : "booked"}`}
            >
              <h3>{slot.slotNumber}</h3>
              <p>Status: {slot.status}</p>
              <p>Vehicle: {slot.vehicleNumber || "No Vehicle"}</p>

              {slot.status === "AVAILABLE" ? (
                <button onClick={() => bookSlot(slot)}>Book Slot</button>
              ) : (
                <button onClick={() => cancelSlot(slot)}>Cancel</button>
              )}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;