"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarioDoctor = () => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-md w-full">
            <h2 className="text-2xl mb-6 text-center">Consultar Calendario de citas</h2>
            <div className="flex flex-col">
                
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="bg-gray text-black rounded-lg p-2"
                />
                <div className="mt-4">
                    <h3 className="text-xl mb-2">Fecha seleccionada: {date.toDateString()}</h3>
                    <ul className="list-disc list-inside">
                        <li>a</li>
                        <li>b</li>
                        <li>c</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CalendarioDoctor;