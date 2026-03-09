import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu, Home, Users, Package, Settings, Search, Trash2, Edit2, Plus, Bell, Eye, EyeOff } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Raj Kumar', email: 'raj.kumar@example.com', role: 'Admin', status: 'Active', image: 'R' },
  { id: 2, name: 'Priya Singh', email: 'priya.singh@example.com', role: 'Manager', status: 'Active', image: 'P' },
  { id: 3, name: 'Arjun Patel', email: 'arjun.patel@example.com', role: 'User', status: 'Inactive', image: 'A' },
  { id: 4, name: 'Ananya Sharma', email: 'ananya.sharma@example.com', role: 'Manager', status: 'Active', image: 'A' },
];

const mockProducts = [
  { id: 1, name: 'Laptop', price: '65000', stock: 12, status: 'In Stock' },
  { id: 2, name: 'Mouse', price: '1500', stock: 0, status: 'Out of Stock' },
  { id: 3, name: 'Keyboard', price: '5000', stock: 3, status: 'Low Stock' },
  { id: 4, name: 'Monitor', price: '20000', stock: 5, status: 'In Stock' },
];

const revenueData = [
  { month: 'Jan', revenue: 400000 },
  { month: 'Feb', revenue: 300000 },
  { month: 'Mar', revenue: 200000 },
  { month: 'Apr', revenue: 278000 },
  { month: 'May', revenue: 189000 },
];

const categoryData = [
  { name: 'Electronics', sales: 400000 },
  { name: 'Accessories', sales: 300000 },
  { name: 'Software', sales: 200000 },
  { name: 'Services', sales: 278000 },
];

const recentActivities = [
  { id: 1, user: 'Raj Kumar', action: 'Added new product', time: '2 hours ago' },
  { id: 2, user: 'Priya Singh', action: 'Updated user role', time: '4 hours ago' },
  { id: 3, user: 'Arjun Patel', action: 'Made a purchase', time: '6 hours ago' },
  { id: 4, user: 'Ananya Sharma', action: 'Changed settings', time: '8 hours ago' },
];

function StatCard({ title, number, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 hover:shadow-lg transition" style={{ borderColor: color }}>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-4xl font-bold text-gray-900 mt-3">{number}</p>
    </div>
  );
}

function ActivityList({ activities }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={activity.id} className={`flex items-start gap-4 pb-4 ${idx !== activities.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-700 flex-shrink-0">
              {activity.user.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{activity.user}</p>
              <p className="text-gray-600 text-sm">{activity.action}</p>
              <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserTable({ users, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Profile</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.image}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => onDelete(user.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductCard({ product, onDelete }) {
  const getStatusColor = (status) => {
    if (status === 'In Stock') return 'bg-green-100 text-green-800';
    if (status === 'Low Stock') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-pink-200 hover:shadow-lg transition">
      <h3 className="font-semibold text-gray-900 mb-2 text-lg">{product.name}</h3>
      <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">Rs {product.price}</p>
      <p className="text-sm text-gray-600 mb-3">Stock: {product.stock} units</p>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${getStatusColor(product.status)}`}>
        {product.status}
      </span>
      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 font-medium flex items-center justify-center gap-1 transition">
          <Edit2 size={16} /> Edit
        </button>
        <button onClick={() => onDelete(product.id)} className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 font-medium transition">
          Delete
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" number="1234" color="#ec4899" />
        <StatCard title="Total Sales" number="2547" color="#a855f7" />
        <StatCard title="Revenue" number="Rs 45,28,000" color="#ec4899" />
        <StatCard title="Growth" number="23%" color="#a855f7" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
              <Bar dataKey="sales" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ActivityList activities={recentActivities} />
    </div>
  );
}

function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white" />
      </div>
      <UserTable users={filtered} onDelete={(id) => setUsers(users.filter(u => u.id !== id))} />
      <p className="text-sm text-gray-500">Showing {filtered.length} of {users.length} users</p>
    </div>
  );
}

function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button className="px-5 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2">
          <Plus size={20} /> Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onDelete={(id) => setProducts(products.filter(p => p.id !== id))} />
        ))}
      </div>
      <p className="text-sm text-gray-500">Total: {products.length} products</p>
    </div>
  );
}

function SettingsPage() {
  const [formData, setFormData] = useState({ name: 'Raj Kumar', email: 'raj.kumar@example.com' });
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Profile</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition">Save Profile</button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Password</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 text-gray-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
          <input type="password" placeholder="Enter new password" className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition">Update Password</button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
        <div className="flex items-center justify-between py-3 border-b">
          <span className="font-semibold text-gray-700">Dark Mode</span>
          <button onClick={() => setDarkMode(!darkMode)} className={`w-14 h-7 rounded-full transition flex items-center ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}>
            <div className={`w-6 h-6 bg-white rounded-full transition transform ${darkMode ? 'translate-x-7' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="font-semibold text-gray-700">Notifications</span>
          <button onClick={() => setNotifications(!notifications)} className={`w-14 h-7 rounded-full transition flex items-center ${notifications ? 'bg-purple-600' : 'bg-gray-300'}`}>
            <div className={`w-6 h-6 bg-white rounded-full transition transform ${notifications ? 'translate-x-7' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  function renderPage() {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <UsersPage />;
      case 'products': return <ProductsPage />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-xl z-40 transform transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Admin</h1>
        </div>
        <nav className="mt-8 space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button key={item.id} onClick={() => { setCurrentPage(item.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold ${isActive ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-600 hover:text-gray-900 p-2">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Bell size={20} className="text-gray-600 cursor-pointer hover:text-gray-900" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                R
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}