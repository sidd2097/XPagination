import React, { useState, useEffect } from 'react';
import './XPagination.css';

const Pagination = ()=> {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(()=> {
        fetchEmployeeData();
    },[]);

    const fetchEmployeeData = ()=> {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(response => {
            if(!response.ok) {
                throw new Error ('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            setEmployees(data);
            setTotalPages(Math.ceil(data.length/10));
        })
        .catch(error => alert('Failed to fetch data'));
    };

    const nextPage = ()=> {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = ()=> {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;

    const currentPageData = employees.slice(startIndex, endIndex);

    return (
        <div className="pagination">
            <h1>Employee Data Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="buttons">
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            <p>Page {currentPage} of {totalPages}</p>
        </div>
    )
};

export default Pagination;