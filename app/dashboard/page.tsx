'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CustomNav from '../components/CustomNav';
import EditButton from '../components/Edit';
import dynamic from 'next/dynamic';
import Chat from '../components/chat';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

interface SidingData {
  Siding: string;
  Status: number;
  Latitude: string;
  Longitude: string;
  "Company Name": string;
  Train: string;
  Start_Time: string;
  End_Time: string;
}

const Dashboard = () => {
  const [data, setData] = useState<SidingData[]>([]);
  const [sidingFilter, setSidingFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const mockData: SidingData[] = [
      {
        Siding: "BAUDPUR",
        Status: 5000,
        Latitude: "21.0630° N",
        Longitude: "86.4627° E",
        "Company Name": "RINL",
        Train: "102350",
        Start_Time: "8:00",
        End_Time: "18:30",
      },
      {
        Siding: "BAGHUAPAL",
        Status: 3000,
        Latitude: "21.0442° N",
        Longitude: "86.0147° E",
        "Company Name": "NTPC",
        Train: "",
        Start_Time: "",
        End_Time: "",
      },
      {
        Siding: "CHATRAPUR",
        Status: 4000,
        Latitude: "19.3597° N",
        Longitude: "84.9887° E",
        "Company Name": "APEPDCL",
        Train: "395729",
        Start_Time: "48",
        End_Time: "14:00",
      },
      {
        Siding: "CHILIKIDARA",
        Status: 3000,
        Latitude: "21.2427° N",
        Longitude: "85.8269° E",
        "Company Name": "RSP",
        Train: "",
        Start_Time: "6:00",
        End_Time: "20:00",
      },
    ];

    setData(mockData);

    const uniqueSidings = Array.from(new Set(mockData.map((item) => item.Siding)));
    setUniqueOptions(uniqueSidings, setSidingFilter);

    const uniqueStatuses = Array.from(new Set(mockData.map((item) => item.Status)));
    setUniqueOptions(uniqueStatuses, setStatusFilter);
  }, []);

  const setUniqueOptions = (
    options: (string | number)[],
    setter: (value: string) => void
  ) => {
    setter('');
    options.sort();
    options.unshift('');
    setter(options[0]);
  };

  const filteredData = data.filter(
    (item) =>
      (!sidingFilter || item.Siding === sidingFilter) &&
      (!statusFilter || item.Status === Number(statusFilter))
  );

  const handleSidingFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSiding = e.target.value;
    setSidingFilter(selectedSiding);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
  };

  return (
    <div>
      <CustomNav />
      <div className="min-h-screen p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Coal Production Dashboard
        </h1>
        <div className="flex flex-col space-y-4 mb-4">
          <div>
            <select
              value={sidingFilter}
              onChange={handleSidingFilterChange}
              className="w-[200px] bg-blue-50 border border-gray-300 rounded p-2"
            >
              <option value="">Select Siding</option>
              {Array.from(new Set(data.map((item) => item.Siding))).map(
                (siding, index) => (
                  <option key={index} value={siding}>
                    {siding}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-full bg-blue-50 border border-gray-300 rounded p-2"
            >
              <option value="">Select Status</option>
              {Array.from(new Set(data.map((item) => item.Status))).map(
                (status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredData.length > 0 ? (
            <table className="w-full border border-rounded  text-center">
              <thead className="bg-blue-200">
                <tr>
                  <th className="p-2">Siding</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Latitude</th>
                  <th className="p-2">Longitude</th>
                  <th className="p-2">Company Name</th>
                  <th className="p-2">Train</th>
                  <th className="p-2">Start Time</th>
                  <th className="p-2">End Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-200 ">
                    <td className="p-2 border border-gray-200">
                      {item.Siding}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {item.Status}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {item.Latitude}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {item.Longitude}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {item["Company Name"]}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {item.Train}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {item.Start_Time}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {item.End_Time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-2xl text-gray-500 mt-4">
              No matching records found.
            </div>
          )}
        </div>
        <div className='container overflow-x-auto m-auto mt-[20px]'>
          <Map />
        </div>
      </div>
      <Chat />
      <div className='mb-[200px] w-[800px]'>
        <EditButton />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
