import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '@/Redex/Store';
import {  resetMemberState } from '@/Redex/All Tables slice/MemberLab';

export default function MemberRegistration() {
  const membershipCr = useSelector((state: RootState) => state.membership);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toastId = "studentToast";

  // Form state management
  const [formState, setFormState] = useState({
    name: "",
    membershipType: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const registerHandle = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, membershipType, email,  phoneNumber } = formState;

    if (!name || !membershipType || !email || !phoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // toast.loading("Submitting...", { id: toastId });
    // dispatch(createMember(formState));
  };

  useEffect(() => {
    if (membershipCr.isSuccess) {
      toast.success("Registered successfully!", { id: toastId });
      setFormState({ name: "", membershipType: "", email: "", address: "", phoneNumber: "" });
      dispatch(resetMemberState());
      navigate('/dashboard/MemberLab');
    }

    if (membershipCr.isError) {
      toast.error(membershipCr.errorMsg, { id: toastId });
    }
  }, [membershipCr.isError, membershipCr.isSuccess, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Register Member</h2>
        <form onSubmit={registerHandle} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700">
              Membership Type
            </label>
            <select
              name="membershipType"
              id="membershipType"
              value={formState.membershipType}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Type</option>
              <option value="REGULAR">Regular</option>
              <option value="PREMIUM">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formState.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formState.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
