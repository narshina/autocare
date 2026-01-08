import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminGetUsers,
  adminDeleteUser,
  adminGetUserVehicles
} from "../../API/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehicleCount, setVehicleCount] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await adminGetUsers();

      const normalUsers = (res.users || []).filter(
        (u) => u.role !== "admin"
      );

      setUsers(normalUsers);

      normalUsers.forEach(async (u) => {
        try {
          const v = await adminGetUserVehicles(u._id);
          setVehicleCount((prev) => ({
            ...prev,
            [u._id]: v.vehicles.length
          }));
        } catch {
          setVehicleCount((prev) => ({
            ...prev,
            [u._id]: 0
          }));
        }
      });
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await adminDeleteUser(id);
      toast.success("User deleted");
      loadUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="pt-24 px-4 sm:px-6 min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-extrabold text-red-500 mb-6"
      >
        Manage Users
      </motion.h1>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">
          Loading users…
        </p>
      )}

      {/* EMPTY */}
      {!loading && users.length === 0 && (
        <p className="text-center text-gray-400">
          No users found
        </p>
      )}

      {/* USER LIST */}
      <div className="space-y-4">
        {users.map((u) => (
          <motion.div
            key={u._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="
              rounded-2xl
              bg-white/5 backdrop-blur-xl
              border border-red-500/40
              p-4 sm:p-5
              shadow-xl shadow-red-900/20
              flex flex-col sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            "
          >
            {/* USER INFO */}
            <div className="space-y-1">
              <p className="font-bold text-base sm:text-lg">
                {u.name}
              </p>

              <p className="text-gray-400 text-sm break-all">
                {u.email}
              </p>

              <p className="text-xs">
                Vehicles:
                <span className="text-green-400 font-semibold ml-1">
                  {vehicleCount[u._id] ?? "--"}
                </span>
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="
              flex flex-col sm:flex-row
              gap-3
              w-full sm:w-auto
            ">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  navigate(`/admin/manage-users/${u._id}`)
                }
                className="
                  w-full sm:w-auto
                  px-4 py-2
                  bg-gradient-to-r from-blue-600 to-blue-700
                  hover:shadow-blue-600/40
                  rounded-xl
                  font-semibold
                  shadow-lg
                "
              >
                View Vehicles
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => deleteUser(u._id)}
                className="
                  w-full sm:w-auto
                  px-4 py-2
                  bg-gradient-to-r from-red-600 to-red-700
                  hover:shadow-red-600/40
                  rounded-xl
                  font-semibold
                  shadow-lg
                "
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
