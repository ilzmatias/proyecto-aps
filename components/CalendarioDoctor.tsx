"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { supabase } from '../lib/supabaseClient';
import 'react-calendar/dist/Calendar.css';
import './CalendarioDoctor.module.css';
interface Appointment {
    legajo: string;
    paciente_dni: string;
    hora: string;
    fecha: string;
    // Agrega otros campos según sea necesario
}
const CalendarioDoctor = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [datesWithAppointments, setDatesWithAppointments] = useState<string[]>([]);

    useEffect(() => {
        const fetchAppointmentsForMonth = async () => {
            const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const formattedFirstDay = firstDayOfMonth.toISOString().split('T')[0];
            const formattedLastDay = lastDayOfMonth.toISOString().split('T')[0];

            const { data, error } = await supabase
                .from('citas')
                .select('*')
                .gte('fecha', formattedFirstDay)
                .lte('fecha', formattedLastDay)
                .eq('medico_legajo', '12345'); // Reemplaza con el legajo del médico

            if (error) {
                console.error('Error fetching appointments:', error);
                return;
            }

            //setAppointments(data as Appointment[]);
            const dates = data.map((appointment: Appointment) => appointment.fecha);
            setDatesWithAppointments(dates);
        };
        fetchAppointmentsForMonth();
    }, [date]);
    const handleDateChange = async (newDate) => {
        setDate(newDate);
        const formattedDate = newDate.toISOString().split('T')[0]; // Formatear la fecha a YYYY-MM-DD
        const data = await getAppointmentsByDate(formattedDate);
        setAppointments(data);
    };
    const getAppointmentsByDate = async (date) => {
        const { data, error } = await supabase
            .from('citas')
            .select('*')
            .eq('fecha', date)
            .eq('medico_legajo', '12345'); // Reemplaza con el legajo del médico

        if (error) {
            console.error('Error fetching appointments:', error);
            return [];
        }

        return data as Appointment[];
    };
    const tileClassName = ({ date }) => {
        
            const formattedDate = date.toISOString().split('T')[0];
            if (datesWithAppointments.includes(formattedDate)) {
                return 'highlight';
            }
    
        return null;
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-md w-full">
            <h2 className="text-2xl mb-6 text-center">Consultar Calendario de citas</h2>
            <div className="flex flex-col">
                
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="bg-gray text-black rounded-lg p-2"
                    tileClassName={tileClassName}
                />
                <div className="mt-4">
                    <h3 className="text-xl mb-2">Fecha seleccionada: {date.toDateString()}</h3>
                    <ul className="list-disc list-inside">
                    {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <li>
                                    <strong>DNI PACIENTE:</strong> {appointment.paciente_dni} <br />
                                    <strong>Hora:</strong> {appointment.hora}
                                </li>))
                        ) : (
                            <li>No hay citas para esta fecha</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CalendarioDoctor;