import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Импортируем useNavigate


export default function CustomerPage() {
  const { id } = useParams(); // Получаем ID клиента из URL
  const [customer, setCustomer] = useState(null);
  const [tires, setTires] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Используем хук useNavigate для навигации

  useEffect(() => {
    fetchCustomer(); // Загружаем данные клиента при первом рендере
    fetchTires(); // Загружаем данные шин
  }, [id]);

  // Функция для получения данных клиента
  const fetchCustomer = () => {
    fetch(`http://localhost:3000/customers/${id}`)
      .then(response => response.json())
      .then(data => {
        setCustomer(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customer:', error);
        setLoading(false);
      });
  };

  // Функция для получения данных шин
  const fetchTires = () => {
    fetch(`http://localhost:3000/customers/${id}/tires`)
      .then(response => response.json())
      .then(data => {
        setTires(data);
      })
      .catch(error => {
        console.error('Error fetching tires:', error);
      });
  };

  // Обработчик состояния загрузки
  if (loading) {
    return <div>Loading...</div>;
  }

  // Обработчик для перехода на форму добавления шин
  const handleAddTire = () => {
    navigate(`/customers/${id}/add-tire`); // Перенаправление на форму добавления шин
  };

  return (
    <div>
      <h1>Customer Details</h1>
      <p>Name: {customer.customer_name}</p>
      <p>Car Registration Number: {customer.car_registration_number}</p>
      <p>Car Model: {customer.car_model}</p>
      <p>Warehouse Name: {customer.warehouse_name}</p>
      <p>Number of Tires: {customer.number_of_tires}</p>

      <h2>Tires</h2>
      {tires.length > 0 ? (
        <ul>
          {tires.map(tire => (
            <li key={tire.id}>
              {tire.tire_size} - {tire.tire_manufacturer} ({tire.tire_position})
            </li>
          ))}
        </ul>
      ) : (
        <p>No tires found for this customer.</p>
      )}

      <button onClick={handleAddTire}>Add Tire</button> {/* Кнопка для перехода на форму добавления шин */}
    </div>
  );
}
