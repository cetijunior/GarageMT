import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import {
    FaTrash,
    FaFilter,
    FaCalendar,
    FaCar,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ✅ Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filters, setFilters] = useState({
        garage: "",
        status: ""
    });

    const localizer = momentLocalizer(moment);

    // Fetch Bookings
    const fetchBookings = async () => {
        try {
            const response = await axios.get(
                "https://garage-booking-backend.onrender.com/api/bookings/all",
                { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
            );
            setBookings(response.data.bookings);
        } catch (error) {
            toast.error("Failed to fetch bookings");
        }
    };

    // Calendar Events
    const calendarEvents = useMemo(() =>
        bookings.map(b => ({
            title: `${b.name} - ${b.garage}`,
            start: new Date(b.date),
            end: moment(b.date).add(30, 'minutes').toDate(),
            allDay: false
        })),
        [bookings]);

    // Apply Filters
    useEffect(() => {
        let result = bookings.filter(b =>
            moment(b.date).isSame(selectedDate, 'day')
        );

        if (filters.garage) {
            result = result.filter(b => b.garage === filters.garage);
        }
        if (filters.status) {
            result = result.filter(b => b.status === filters.status);
        }

        setFilteredBookings(result);
    }, [bookings, filters, selectedDate]);

    // Booking Charts Data
    const bookingChartData = {
        labels: ["Garage MT Limited", "Garage MT"],
        datasets: [{
            label: "Bookings",
            data: [
                bookings.filter(b => b.garage === "Garage MT Limited").length,
                bookings.filter(b => b.garage === "Garage MT").length
            ],
            backgroundColor: ["#030202", "#c91212"]
        }]
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen mt-20 bg-zinc-950 text-zinc-100 p-6">
            <div className="container mx-auto">

                <div className="h-fit grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-3 bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold flex items-center">
                                <FaCar className="mr-3 text-indigo-500" />
                                Garage Hub
                            </h1>
                        </div>

                        {/* Filters */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <FaFilter className="mr-2 text-indigo-500" /> Filters
                            </h2>
                            <div className="space-y-4">
                                <select
                                    className="w-full p-3 bg-zinc-800 text-zinc-200 border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={filters.garage}
                                    onChange={(e) => setFilters(prev => ({ ...prev, garage: e.target.value }))}
                                >
                                    <option value="">All Garages</option>
                                    <option value="Garage MT Limited">Garage MT Limited</option>
                                    <option value="Garage MT">Garage MT</option>
                                </select>
                                <select
                                    className="w-full p-3 bg-zinc-800 text-zinc-200 border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={filters.status}
                                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Bookings List */}
                            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 ">
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <FaCalendar className="mr-3 text-indigo-500" />
                                    Bookings for {moment(selectedDate).format('MMMM D, YYYY')}
                                </h2>
                                <div className="max-h-[400px] scrollbar overflow-auto">
                                    {filteredBookings.length === 0 ? (
                                        <div className="text-center text-zinc-500 py-8">
                                            No bookings for this date
                                        </div>
                                    ) : (
                                        filteredBookings.map(booking => (
                                            <div
                                                key={booking.id}
                                                className="bg-zinc-800 rounded-lg p-4 mb-4 flex justify-between items-center hover:bg-zinc-700 transition-colors"
                                            >
                                                <div>
                                                    <div className="font-semibold text-zinc-100">{booking.name}</div>
                                                    <div className="text-sm text-zinc-400">
                                                        {moment(booking.date).format('hh:mm A')} - {booking.garage}
                                                    </div>
                                                    <div className={`inline-flex items-center mt-2 ${booking.status === 'confirmed'
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                        }`}>
                                                        {booking.status === 'confirmed'
                                                            ? <FaCheckCircle className="mr-2" />
                                                            : <FaTimesCircle className="mr-2" />
                                                        }
                                                        <span className="text-sm">{booking.status}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="text-red-500 hover:text-red-300 bg-red-900/30 p-2 rounded-full transition-colors"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Booking Statistics */}
                            <div className="bg-zinc-900 max-h-[400px] rounded-xl p-6 border border-zinc-800">
                                <h2 className="text-2xl font-bold mb-6 text-zinc-100">Booking Statistics</h2>
                                <Bar
                                    data={bookingChartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: 'white'
                                                }
                                            },
                                            title: {
                                                display: true,
                                                text: 'Bookings by Garage',
                                                color: 'white'
                                            }
                                        },
                                        scales: {
                                            x: {
                                                ticks: { color: 'white' },
                                                grid: { color: 'rgba(255,255,255,0.1)' }
                                            },
                                            y: {
                                                ticks: { color: 'white' },
                                                grid: { color: 'rgba(255,255,255,0.1)' }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-zinc-800">
                            <Calendar
                                localizer={localizer}
                                events={calendarEvents}
                                startAccessor="start"
                                endAccessor="end"
                                views={["month", "agenda"]}
                                defaultView="month"
                                style={{ height: 600 }}
                                onNavigate={(date) => setSelectedDate(date)}
                                onSelectEvent={(event) => setSelectedDate(event.start)}
                                className="text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;