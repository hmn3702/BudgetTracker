import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', date: '', deadline: '', amount: '', currency:'' });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        date: editingTask.date,
        amount: editingTask.amount,
        currency: editingTask.currency, 
      });
    } else {
      setFormData({ title: '', description: '', date: '', amount: '', currency: '' });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required.');
      return;
    }
    if (formData.amount !== '' && Number(formData.amount) < 0) {
      alert('Amount must be ≥ 0.');
      return;
    }
    if (!formData.currency.trim()) {
      alert('Currency is required.');
      return;
    }
    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({ title: '', description: '', date: '' , amount: '', currency: '' });
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTask ? 'Your Form Name: Edit Operation' : 'Your Form Name: Create Operation'}</h1>
      <div className="mb-4">
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="title"
              value="Income"
              checked={formData.title === 'Income'}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mr-2"
            />
            Income
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="title"
              value="Spending"
              checked={formData.title === 'Spending'}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mr-2"
            />
            Spending
          </label>
        </div>
      </div>
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        min="0"
        step="0.01"
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        list="currencies"
        name="currency"
        placeholder="Select or type currency (e.g., AUD)"
        value={formData.currency}
        onChange={(e) => setFormData({ ...formData, currency: e.target.value.toUpperCase() })}
        className="w-full mb-4 p-2 border rounded"
      />
      <datalist id="currencies">
        <option value="AUD" />
        <option value="USD" />
        <option value="VND" />
        <option value="EUR" />
        <option value="JPY" />
        <option value="GBP" />
        <option value="SGD" />
        <option value="CAD" />
        <option value="NZD" />
      </datalist>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTask ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default TaskForm;
