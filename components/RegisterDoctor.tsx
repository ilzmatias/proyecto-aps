'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const RegisterDoctor = () => {
    const [formData, setFormData] = useState({
        legajo: '',
        documento: '',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        email: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase
                .from('doctors')
                .insert([formData]);

            if (error) {
                console.error('Error registrando médico:', error);
                setErrorMessage('Error al registrar el médico. Intente nuevamente.');
            } else {
                console.log('Médico registrado:', data);
                setErrorMessage(null); 
                alert('Médico registrado con éxito');
                setFormData({
                    legajo: '',
                    documento: '',
                    nombre: '',
                    apellido: '',
                    telefono: '',
                    direccion: '',
                    email: '',
                });
            }
        } catch (err) {
            console.error('Error en la inserción:', err);
            setErrorMessage('Hubo un error al conectar con el servidor. Inténtelo de nuevo.');
        }
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-md w-full">
            <h1 className="text-2xl mb-6 text-center">Registrar Médico</h1>
            <form onSubmit={handleSubmit}>
                {['legajo', 'documento', 'nombre', 'apellido', 'telefono', 'direccion', 'email'].map((field) => (
                    <div key={field} className="flex items-center justify-between mb-4">
                        <label className="w-1/3">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type={field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={formData[field as keyof typeof formData]} 
                            onChange={handleChange}
                            className="bg-gray-100 text-black rounded-lg px-2 py-1 w-2/3"
                            required
                        />
                    </div>
                ))}
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterDoctor;
