"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { supabase } from '../lib/supabaseClient';
import 'react-calendar/dist/Calendar.css';
import './CalendarioDoctor.module.css';
import { Value } from 'react-calendar/src/shared/types.js';

interface Citas {
    legajo: string;
    paciente_dni: string;
    hora: string;
    fecha: string;
}

const CalendarioDoctor = () => {
    const [date, setDate] = useState(new Date());
    const [citas, setCitas] = useState<Citas[]>([]);
    
    const handleDateChange = async (value: Value | null) => {
        if (value) {
            let selectedDate: Date;
            if (Array.isArray(value)) { 
              
                selectedDate = value[0] as Date;
            } else {
                selectedDate = value as Date; 
            }

            setDate(selectedDate);

            
            const formattedDate = selectedDate.toISOString().split('T')[0];
            console.log("formattedDate: ", formattedDate);
            
            const data = await getAppointmentsByDate(formattedDate);
            console.log("data: ", data);
            setCitas(data);
        }
    };

    const getAppointmentsByDate = async (date: string) => {
        const { data, error } = await supabase
            .from('citas')
            .select('*')
            .eq('fecha', date)
            .eq('medico_legajo', '12345'); //esto esta hardcodeado

        if (error) {
            console.error('Error fetching appointments:', error);
            return [];
        }

        return data as Citas[];
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
                        {citas.length > 0 ? (
                            citas.map((cita, index) => (
                                <li key={index}>
                                    <strong>DNI PACIENTE:</strong> {cita.paciente_dni} <br />
                                    <strong>Hora:</strong> {cita.hora}
                                </li>
                            ))
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
